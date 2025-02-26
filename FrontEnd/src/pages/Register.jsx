import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
    const validationSchema = Yup.object({
        email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
        password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must match')
        .required('Confirm Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm, setSubmitting, setFieldError }) => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/register/', {
                    email: values.email,
                    password: values.password,
                    confirm_password: values.confirmPassword,
                });
                alert(response.data.message);
                resetForm();
            } catch (error) {
                setFieldError('email', error.response?.data?.detail || 'Registration failed. Please try again');
                console.log(error.response);
                
            } finally {
                setSubmitting(false);
            }
        }
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Register</h2>
                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 
                            ${formik.touched.email && formik.errors.email
                                ? 'border-red-500 focus:ring-red-400'
                                :'focus:ring-blue-400' }`}
                            placeholder="Enter your email"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className='text-sm text-red-500'> {formik.errors.email} </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                                formik.touched.password && formik.errors.password
                                ? 'border-red-500 focus:ring-red-400'
                                : 'focus:ring-blue-400'
                            }`}
                            placeholder="Enter your password"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className='text-sm text-red-500'>{formik.errors.password}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
                                formik.touched.confirmPassword && formik.errors.confirmPassword 
                                ? 'border-red-500 focus:ring-red-400'
                                : 'focus:ring-blue-400' }`
                            }
                            placeholder="Confirm your password"
                        />
                    </div>
                    { formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <p className="text-sm text-red-500"> {formik.errors.confirmPassword} </p>
                    )}
                    <button
                        type="submit"
                        disabled= {formik.isSubmitting}
                        className="w-full py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    >
                        {formik.isSubmitting ? 'Registering...': 'Register'}
                    </button>
                </form>
                <p className="text-sm text-gray-600 text-center">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
