import React, { useContext, useState } from 'react';
import Modal from './Modal';
import AuthContext from '../../Contexts/AuthContext';
import { setData } from '../../Functions/localStorage';
import APICallContext from '../../Contexts/APICallContext';

const SignInModal = ({ showModal, setShowModal, openSignUpModal }) => {
    const { setIsAuthenticated } = useContext(AuthContext)
    const { apiCall } = useContext(APICallContext)

    // State to manage email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        let url = 'users/login/'
        let body = {
            email: email,
            password: password,
        };
        let method = 'post';
        let loadingState = setIsLoading
        const onSuccess = (data) => {
            setData('accessToken', data.token)
            setTimeout(() => {
                setIsAuthenticated(true)
            }, 1000)
        }
        const onError = (error) => {
        }
        apiCall(url, body, method, loadingState, onSuccess, onError)
    };

    return (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} canClose={false} isLoading={isLoading}>
            <div className="flex flex-col md:flex-row w-full">
                {/* Left Side: Welcome Message */}
                <div className="flex-1 p-6 flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-bold text-main mb-2">Prometheus</h1>
                    <p className="text-main text-center">
                        Prometheus is an innovative AI chat platform offering an immersive experience
                        with advanced, open-source AI models. Connect, interact, and explore the
                        capabilities of AI in a whole new way.
                    </p>
                </div>

                {/* Right Side: Sign-In Form */}
                <div className="flex-1 p-8 flex flex-col justify-center items-center">
                    <h2 className="text-xl font-bold text-main mb-4">Sign In</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs">
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

                        {/* Password Input */}
                        <div className='cc-2'>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="cc-2-target px-4 py-2 bg-transparent border border-main outline-main focus:ring-main rounded-md text-main"
                                required
                            />
                        </div>

                        {/* "Sign In" Text Link */}
                        <span
                            onClick={handleSubmit}
                            className="text-main font-semibold cursor-pointer text-center mt-2"
                        >
                            {
                                isLoading ?
                                    'Loading...'
                                    :
                                    'Sign In'
                            }
                        </span>
                    </form>

                    {/* Sign-Up Link */}
                    <p className="text-main mt-4">
                        I don't have an account.{' '}
                        <span onClick={openSignUpModal} className="font-semibold cursor-pointer">
                            Please sign up
                        </span>
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default SignInModal;
