import React, { useContext } from 'react'
import ToastContext from '../Contexts/ToastContext'
import Toast from '../components/ui/Toast'

const Toasts = () => {

    const { toastMessage, setToastMessage } = useContext(ToastContext)


    return (
        <Toast
            message={toastMessage}
            onClose={() => setToastMessage('')}
        />
    )
}

export default Toasts