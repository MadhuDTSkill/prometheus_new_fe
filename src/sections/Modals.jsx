import React, { useContext, useEffect } from 'react';
import SignInModal from '../components/Modals/SignInModal';
import SignUpModal from '../components/Modals/SignUpModal';
import AuthContext from '../Contexts/AuthContext';

const Modals = () => {
    // context states
    const { isAuthenticated } = useContext(AuthContext);

    const [showSignInModal, setShowSignInModal] = React.useState(false);
    const [showSignUpModal, setShowSignUpModal] = React.useState(false);

    const openSignInModal = () => {
        setShowSignInModal(true);
        setShowSignUpModal(false);
    };

    const openSignUpModal = () => {
        setShowSignUpModal(true);
        setShowSignInModal(false);
    };

    const closeAuthModals = () => {
        setShowSignInModal(false);
        setShowSignUpModal(false);
    };

    useEffect(() => {
        if (isAuthenticated) {
            closeAuthModals();
        } else {
            openSignInModal();
        }
    }, [isAuthenticated]);

    return (
        <div>
            <div className='font-main'>
                <SignInModal
                    showModal={showSignInModal}
                    setShowModal={setShowSignInModal}
                    openSignUpModal={openSignUpModal}
                />
                <SignUpModal
                    showModal={showSignUpModal}
                    setShowModal={setShowSignUpModal}
                    openSignInModal={openSignInModal}
                />
            </div>
        </div>
    );
};

export default Modals;
