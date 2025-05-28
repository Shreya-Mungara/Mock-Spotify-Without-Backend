
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const morgan = require("morgan");
const helmet = require("helmet");
const nodemailer = require('nodemailer');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const axios = require('axios');
const bcrypt = require('bcryptjs'); // Add bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Add jwt for token generation

const app = express();
const port = 3001;
let loggedInUserEmail = null; // Global variable to store the email of the logged-in user

// Update the MongoDB connection string to your local instance
const connectionString = 'mongodb://localhost:27017/vulnscanusers'; // Local MongoDB connection string

// Use the connection string for Mongoose
async function connectToDB() {
    try {
        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit if connection fails
    }
}

// Middleware setup
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(helmet());

// Use the connection string for MongoDB client
let db, usersCollection, devicesCollection, userQueriesCollection;

MongoClient.connect(connectionString)
    .then((client) => {
        db = client.db();
        usersCollection = db.collection('users');
        userQueriesCollection = db.collection('userquery');
        devicesCollection = db.collection('devices');
        console.log('Connected to database');

        // Initial inserts to ensure collections exist
        return Promise.all([ 
            usersCollection.insertOne({ testUser: 'initialInsert' }).catch(() => {
                console.log(`Collection 'users' already exists or was created.`);
            }),
            devicesCollection.insertOne({ testDevice: 'initialInsert' }).catch(() => {
                console.log(`Collection 'devices' already exists or was created.`);
            })
        ]);
    })
    .then(() => {
        app.listen(port, 'localhost', () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
    });

// Nodemailer setup for automated emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider
    auth: {
        user: 'emptyskulls13@gmail.com', // Replace with your email
        pass: 'gbee eqhx kmjo aybr' // Replace with your password
    }
});

// Updated Signup route with validation and security
app.post('/signup', async (req, res) => {
    const { company, email, password, dob } = req.body;

    // Validate input
    if (!email || !password || !company || !dob) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Password length validation
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    try {
        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const userDetails = {
            company,
            email,
            password: hashedPassword,
            dob,
            createdAt: new Date()
        };

        const result = await usersCollection.insertOne(userDetails);

        // Create device entry
        await devicesCollection.insertOne({
            email,
            devices: [],
            createdAt: new Date()
        });

        // Generate JWT token
        const token = jwt.sign(
            { id: result.insertedId, email }, 
            process.env.JWT_SECRET || 'fallback_secret', 
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Signup successful',
            token,
            user: { 
                id: result.insertedId, 
                email, 
                company 
            }
        });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ message: 'Signup failed', error: err.message });
    }
});

module.exports = app;

// Route to add a device for a user (using email to identify the user)
app.post('/addDevice', async (req, res) => {
    const { email, deviceName, deviceType } = req.body;

    // Check if the email exists in the devices collection
    const userDeviceEntry = await devicesCollection.findOne({ email });

    if (!userDeviceEntry) {
        return res.status(400).send('User not found in devices collection');
    }

    const deviceDetails = {
        deviceName,
        deviceType,
        createdAt: new Date()
    };

    try {
        // Update the existing user device entry by adding the new device
        const result = await devicesCollection.updateOne(
            { email },
            { $push: { devices: deviceDetails } } // Push new device to devices array
        );

        console.log('Device added:', result);
        res.status(200).send('Device added successfully');
    } catch (err) {
        console.error('Error adding device:', err);
        res.status(500).send('Failed to add device');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email and password
        const user = await usersCollection.findOne({ email, password });

        if (user) {
            // Store the logged-in user's email in the global variable
            loggedInUserEmail = email;

            res.status(200).json({
                success: true,
                message: 'Login successful',
                userId: user._id,
                userData: user // Or send any specific user data if needed
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Server error during login');
    }
});

// Contact form route to save data and send email
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    const query = { name, email, message };

    try {
        console.log('Attempting to insert into userquery collection:', query);
        await userQueriesCollection.insertOne(query);

        // Configure and send automated email
        const mailOptions = {
            from: 'emptyskulls13@gmail.com', // Replace with your email
            to: email,
            subject: 'Thank you for contacting us',
            text: `Hello ${name},\n\nThank you for reaching out! We have received your message:\n"${message}"\n\nOur team will get back to you soon.\n\nBest regards,\nEmpty Skulls`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).send('Failed to send email');
            } else {
                console.log('Email sent:', info.response);
                res.status(200).send('Data saved and email sent successfully');
            }
        });
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).send('Failed to save data');
    }
});

// API route to get user data
app.get('/api/user', async (req, res) => {
    await connectToDB();

    try {
        // Use the globally stored email if the user is logged in
        if (!loggedInUserEmail) {
            return res.status(401).json({ error: 'User not logged in' });
        }

        const user = await usersCollection.findOne({ email: loggedInUserEmail });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            name: user.company,
            email: user.email,
            dob: user.dob,
            // Add other fields you want to include here
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });m 
    }
});

// Root route for server status
app.get('/', (req, res) => {
    res.send('Server is running');
});

module.exports = app;
