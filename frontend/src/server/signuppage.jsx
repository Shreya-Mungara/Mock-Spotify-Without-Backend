import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarThick from './navbar_thick.jsx';
import Footer from './Footer.jsx';

const SignUpPage = () => {
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [serverStatus, setServerStatus] = useState('checking');
    const navigate = useNavigate();
    
    // Create an axios instance with specific config
    const api = axios.create({
        baseURL: 'http://localhost:5000',
        timeout: 5000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    // Check server connection on component mount
    useEffect(() => {
        const checkServer = async () => {
            try {
                const response = await api.get('/api/health');
                console.log('Server health check response:', response);
                setServerStatus('connected');
            } catch (error) {
                console.error('Server health check error:', error);
                setServerStatus('disconnected');
                setErrorMessage('Unable to connect to server. Please check if the backend is running.');
            }
        };

        checkServer();
    }, []);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        if (serverStatus === 'disconnected') {
            setErrorMessage('Server is not available. Please try again later.');
            setIsLoading(false);
            return;
        }

        // Log request attempt
        console.log('Attempting signup with data:', {
            company,
            email,
            dob,
            passwordLength: password.length
        });

        try {
            // Try with fetch first to see if we get a different result
            const fetchResponse = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    company,
                    email,
                    password,
                    dob
                })
            });

            if (!fetchResponse.ok) {
                const errorData = await fetchResponse.json();
                throw new Error(errorData.message || 'Signup failed');
            }

            const data = await fetchResponse.json();
            console.log('Signup successful:', data);

            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');

        } catch (fetchError) {
            console.error('Fetch attempt failed:', fetchError);
            
            // If fetch fails, try with axios as backup
            try {
                const axiosResponse = await api.post('/api/auth/signup', {
                    company,
                    email,
                    password,
                    dob
                });

                console.log('Axios signup response:', axiosResponse);

                localStorage.setItem('authToken', axiosResponse.data.token);
                localStorage.setItem('user', JSON.stringify(axiosResponse.data.user));
                navigate('/dashboard');

            } catch (error) {
                console.error('Full error object:', error);

                if (error.code === 'ECONNABORTED') {
                    setErrorMessage('Request timed out. Please try again.');
                } else if (error.response) {
                    // Server responded with error
                    console.error('Server error response:', error.response);
                    setErrorMessage(error.response.data.message || 'Signup failed');
                } else if (error.request) {
                    // Request made but no response
                    console.error('No response received:', error.request);
                    setErrorMessage('No response from server. Please check your network connection.');
                } else {
                    console.error('Error setting up request:', error.message);
                    setErrorMessage('Failed to connect to server. Please try again.');
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-[#141414] text-white">
            <NavbarThick />
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="p-8 rounded-lg w-full max-w-md bg-black shadow-md transition-shadow duration-300 hover:shadow-teal-500/50 flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>
                    
                    {/* Server Status Indicator */}
                    {serverStatus === 'checking' && (
                        <div className="mb-4 text-yellow-500 text-sm">
                            Checking server connection...
                        </div>
                    )}
                    {serverStatus === 'disconnected' && (
                        <div className="mb-4 text-red-500 text-sm">
                            Server is currently unavailable
                        </div>
                    )}
                    
                    <p className="text-gray-400 text-sm mb-6 text-center">
                        Already have an account?{' '}
                        <a
                            onClick={handleLogin}
                            className="text-teal-400 hover:underline cursor-pointer"
                        >
                            Log in
                        </a>
                    </p>
                    
                    {errorMessage && (
                        <div className="w-4/5 p-3 mb-4 bg-red-500/20 border border-red-500 text-red-500 rounded text-sm text-center">
                            {errorMessage}
                        </div>
                    )}
                    
                    <form onSubmit={handleSignUp} className="w-4/5">
                        {/* Form inputs remain the same */}
                        <input
                            type="text"
                            placeholder="Name"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                            disabled={isLoading || serverStatus === 'disconnected'}
                            className="w-full mb-4 p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-teal-700 transition duration-300"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading || serverStatus === 'disconnected'}
                            className="w-full mb-4 p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-teal-700 transition duration-300"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading || serverStatus === 'disconnected'}
                            className="w-full mb-4 p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-teal-700 transition duration-300"
                        />
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                            disabled={isLoading || serverStatus === 'disconnected'}
                            className="w-full mb-4 p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-teal-700 transition duration-300"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || serverStatus === 'disconnected'}
                            className={`w-full ${
                                isLoading || serverStatus === 'disconnected' 
                                    ? 'bg-teal-700' 
                                    : 'bg-teal-500 hover:bg-teal-600'
                            } text-white font-semibold py-2 rounded transition duration-300`}
                        >
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignUpPage;