import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom' // ✅ Import this
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate() // ✅ Get navigate function

    const logoutHandler = async () => {
        try {
            await authService.logout()
            dispatch(logout())
            navigate('/login')
        } catch (error) {
            console.error("Error While Logout:", error)
        }
    }

    return (
        <button
            onClick={logoutHandler}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-500 text-white font-semibold shadow-md hover:bg-red-600 transition duration-200"
        >
            Logout
        </button>
    )
}

export default LogoutBtn
