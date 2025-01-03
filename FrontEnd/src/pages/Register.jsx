import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (FormData.password !== formData.confirmPassword) {
            setError('Password do not match');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/register/', {
                email: formData.email,
                password: formData.password,
                confirm_password: formData.confirmPassword,
            });
            setMessage(response.data.message);
            setFormData({ email: '', password: '', confirmPassword: '' });
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.email || err.response.data.password || 'Something went wrong.');
            }
        }
    }
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
        <div className="big-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            {message && <p className='text-green-500 text-center mb-4'>{message}</p>}
            {error && <p className='text-red-500'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className='block text-sm font-medium text-gray-700 '> Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={formData.email} 
                    onChange={handleChange}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 sm:text-sm'
                    required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className='block text-sm font-medium text-gray-700 '> Password</label>
                    <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={formData.password} 
                    onChange={handleChange}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 sm:text-sm'
                    required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className='block text-sm font-medium text-gray-700 '> Confirm Password</label>
                    <input 
                    type="password" 
                    name="confirmPassword" 
                    id="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 sm:text-sm'
                    required
                    />
                </div>
            </form>
        </div>
      
    </div>
  )
}

export default Register
