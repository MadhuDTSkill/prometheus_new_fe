import React, { useContext, useState } from 'react';
import Modal from './Modal';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for showing/hiding password
import AuthContext from '../../Contexts/AuthContext';
import APICallContext from '../../Contexts/APICallContext';
import { getData } from '../../Functions/localStorage';

const SignUpModal = ({ showModal, setShowModal, openSignInModal }) => {

    const { setIsAuthenticated } = useContext(AuthContext)
    const { apiCall, setErrorMessage } = useContext(APICallContext)

    // State to manage name, email, password, confirm password, and visibility
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        let url = 'users/register/'
        let body = {
            name: name,
            email: email,
            password: password,
        };
        let method = 'post';
        let loadingState = setIsLoading
        const onSuccess = (data) => {
            getData('accessToken', data.token)
            setIsAuthenticated(true)
            window.location.reload()
        }
        const onError = (error) => {
            console.log(error)
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        apiCall(url, body, method, loadingState, onSuccess, onError)
    };

    return (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} canClose={false} isLoading={isLoading}>
            <div className="flex flex-col md:flex-row w-full">
                {/* Left Side: Website Name and Description */}
                <div className="flex-1 p-6 flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold text-main mb-2">Prometheus</h1>
                    <p className="text-lg text-main">
                        Welcome to Prometheus - Your AI Chat Platform for personalized, AI-powered conversations!
                    </p>
                </div>

                {/* Right Side: Sign-Up Form */}
                <div className="flex-1 p-8 flex flex-col justify-center items-center">
                    <h2 className="text-xl font-bold text-main mb-4">Sign Up</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
                        {/* Name Input */}
                        <div className='cc-2'>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                className="cc-2-target px-4 py-2 bg-transparent border border-main outline-main focus:ring-main rounded-md text-main"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className='cc-2'>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="cc-2-target px-4 py-2 bg-transparent border border-main outline-main focus:ring-main rounded-md text-main"
                                required
                            />
                        </div>

                        {/* Password Input with Icon */}
                        <div className="relative">
                            <div className='cc-2'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="cc-2-target px-4 py-2 bg-transparent w-full border border-main outline-main focus:ring-main rounded-md text-main pr-10" // Add padding to the right for the icon
                                    required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                >
                                    {showPassword ? <FaEyeSlash className="text-main" /> : <FaEye className="text-main" />}
                                </span>
                            </div>
                        </div>

                        {/* Confirm Password Input with Icon */}
                        <div className="relative">
                            <div className='cc-2'>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    className="cc-2-target px-4 py-2 w-full bg-transparent border border-main outline-main focus:ring-main rounded-md text-main pr-10"
                                    required
                                />
                                <span
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                >
                                    {showConfirmPassword ? <FaEyeSlash className="text-main" /> : <FaEye className="text-main" />}
                                </span>
                            </div>
                        </div>

                        {/* "Sign Up" Button */}
                        <span
                            onClick={handleSubmit}
                            className="text-main font-semibold cursor-pointer text-center mt-2"
                        >
                            {
                                isLoading ?
                                    'Loading...'
                                    :
                                    'Sign Up'
                            }
                        </span>
                    </form>

                    {/* Sign-In Link */}
                    <p className="text-main mt-4">
                        I already have an account.{' '}
                        <span onClick={openSignInModal} className="font-semibold cursor-pointer">
                            Please sign in
                        </span>
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default SignUpModal;
