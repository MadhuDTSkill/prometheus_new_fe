import React, { useContext } from 'react'
import { TbLogout2 } from 'react-icons/tb'
import AuthContext from '../Contexts/AuthContext'

const Logout = () => {

    const { setIsAuthenticated } = useContext(AuthContext)

    const handleLogout = () => {
        localStorage.removeItem('accessToken')
        setIsAuthenticated(false)
    }

    return (
        <div onClick={handleLogout} className="flex items-center gap-2 cp">
            <TbLogout2 className='text-lg mt-1' />
            <span className="font-semibold mt-1">Logout</span>
        </div>
    )
}

export default Logout