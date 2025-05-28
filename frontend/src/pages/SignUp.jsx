import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    company: '',
    dob: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password, company, dob } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
    if (error) setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', 
        {
          email,
          password,
          company,
          dob
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 5000 // 5 second timeout
        }
      );
  
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
  
      navigate('/home');
    } catch (err) {
      console.error('Full error:', err);
      
      if (err.code === 'ECONNABORTED') {
        setError('Server not responding. Check if backend is running.');
      } else if (err.response) {
        setError(err.response.data.message || 'Signup failed');
      } else {
        setError('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md px-6 py-8">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
          
          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500 text-red-500 rounded-md text-center text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition duration-200"
                placeholder="Enter your name"
                disabled={loading}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition duration-200"
                placeholder="Enter your email"
                disabled={loading}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition duration-200"
                placeholder="Create a password (min. 6 characters)"
                disabled={loading}
                required
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-medium mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition duration-200"
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md font-medium text-white transition duration-200
                       ${loading 
                         ? 'bg-blue-400 cursor-not-allowed' 
                         : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                       }`}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-400">Already have an account? </span>
              <Link 
                to="/login" 
                className="text-blue-400 hover:text-blue-300 font-medium transition duration-200"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;