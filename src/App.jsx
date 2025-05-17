import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true);
  const student = useSelector((state) => state.auth.studentloginstatus)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        if(student === true){
          dispatch(studentlogin({userData}));
        }
        else{
          dispatch(login({userData}));
        }
      } else {
        if(student === true){
           dispatch(studentlogout());
        }
        else{
          dispatch(logout());
        }
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between '>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) :
    (<div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-4 border-purple-800 border-t-transparent rounded-full animate-spin"></div>
    </div>)
}

export default App