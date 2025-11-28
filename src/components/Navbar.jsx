import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Navbar() {

    const {isAuthenticated, logout,user} = useContext(AuthContext)
    const navigate = useNavigate()

    const onLogout = () => {
        logout()
        navigate('/login')
    } 

    const authLinks = (
        <div className='flex items-center space-x-4'>
            {user && (
                <Link to={`/${user.username}`} className="text-white hover:text-blue-400 transition-colors">Profile</Link>
            )}
            <button 
                onClick={onLogout} 
                className="bg-red-500 px-4 py-2 rounded text-white font-bold hover:text-red-600 transition-colors"
            >
                Logout
            </button>
        </div>
    )
    const guesthLinks = (
        <div className='flex space-x-4'>
            <Link to="/login" className="text-white hover:text-blue-400 transition-colors">Login</Link>
            <Link to="/register" className="text-white hover:text-blue-400 transition-colors">register</Link>
        </div>
    )
  return (
    <nav className='bg-gray-800 shadow-md'>
        <div className='container mx-auto px-6 py-3 flex justify-between items-center'>
            <Link to="/" className='text-2xl font-bold text-white hover:text-blue-400 transition-colors'>
                DevSocial
            </Link>
            <div>
                {isAuthenticated ? authLinks : guesthLinks}
            </div>

        </div>
      
    </nav>
  )
}

export default Navbar
