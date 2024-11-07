import React from 'react'
import { ImSpinner5 } from "react-icons/im";

const LoadingIcon = ({
    ...props
}) => {
    return (
        <ImSpinner5 {...props} className='animate-spin text-4xl' />
    )
}

export default LoadingIcon