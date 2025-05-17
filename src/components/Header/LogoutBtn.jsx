import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import {studentlogout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
            dispatch(studentlogout());
            localStorage.removeItem("userRole");
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:text-purple-800 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn