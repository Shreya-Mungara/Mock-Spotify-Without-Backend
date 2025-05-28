import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarThick from './navbar_thick.jsx';
import Footer from './Footer.jsx';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate('/signup');
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/login', { email, password });
            
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            navigate('/dashboard');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Login failed');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-[#141414] text-white">
            <NavbarThick />
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="p-8 rounded-lg w-full max-w-md bg-black shadow-md transition-shadow duration-300 hover:shadow-teal-500/50 flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                    <p className="text-gray-400 text-sm mb-6 text-center">
                        Don't have an account?{' '}
                        <a
                            onClick={handleSignup}
                            className="text-teal-400 hover:underline cursor-pointer"
                        >
                            Create an account
                        </a>
                    </p>
                    {errorMessage && (
                        <div className="text-red-500 text-sm mb-4 text-center">{errorMessage}</div>
                    )}
                    <form onSubmit={handleSignIn} className="w-4/5">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full mb-4 p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-teal-700 transition duration-300"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full mb-4 p-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-teal-700 transition duration-300"
                        />
                        <button
                            type="submit"
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded transition duration-300"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;