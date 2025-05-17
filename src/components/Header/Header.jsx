import React from 'react'
import {Container, LogoutBtn} from '../index'
import mitadtlogo from "../logos/mitadtlogo.jpg"
import { Link, NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  //const student = useSelector((state) => state.auth.studentloginstatus)
  const navigate = useNavigate();
  const student = localStorage.getItem("userRole");
  console.log("localstoreage: ", student);

  /*const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "About Us",
      slug: "/about-us",
      active: !authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
      status: student,
  },
  ]
  */


  return (
    <header className='bg-white'>
      <Container>
        <nav className=''>
          <div className='pt-4 pl-4'>
            <Link to='/'>
              <div className='h-24 w-56'>
                <img src={mitadtlogo }/>
              </div>
            </Link>
          </div>
          <ul className='flex justify-evenly ml-auto bg-purple-200'>
            {/*navItems.map((item) => 
            item.active ? (
              <li key={item.name} className=''>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}
                </button>
              </li>
            ) : null
            )*/}
            <li className=''>
              <NavLink
                to="/"
                className={({isActive}) =>
                ` py-2 pr-4 pl-3 h-8 w-32 mt-1 flex justify-center items-center duration-200 ${isActive ? "text-white bg-purple-800 rounded-3xl" : "text-black"}
                 border-b border-gray-100  lg:hover:bg-transparent 
                 lg:border-0 hover:bg-purple-500 lg:p-0`}>
                    Home
               </NavLink>
            </li>
            {authStatus === true && student === 'false' ? (<li>
              <NavLink
                to="/add-post"
                className={({isActive}) =>
                ` py-2 pr-4 pl-3 h-8 w-32 mt-1 flex justify-center items-center duration-200 ${isActive ? "text-white bg-purple-800 rounded-3xl" : "text-black"}
                 border-b border-gray-100  lg:hover:bg-transparent 
                 lg:border-0 hover:bg-purple-500 lg:p-0`}>
                    Add post
               </NavLink>
            </li>) : null}
            {authStatus === true ? (<li>
              <NavLink
                to="/all-posts"
                className={({isActive}) =>
                ` py-2 pr-4 pl-3 h-8 w-32 mt-1 flex justify-center items-center duration-200 ${isActive ? "text-white bg-purple-800 rounded-3xl" : "text-black"}
                 border-b border-gray-100  lg:hover:bg-transparent 
                 lg:border-0 hover:bg-purple-500 lg:p-0`}>
                    All Post
               </NavLink>
            </li>) : null}
            <li>
              <NavLink
              to="/about-us"
              className={({isActive}) =>
                ` py-2 pr-4 pl-3 h-8 w-32 mt-1 flex justify-center items-center duration-200 ${isActive ? "text-white bg-purple-800 rounded-3xl" : "text-black"}
                 border-b border-gray-100  lg:hover:bg-transparent 
                 lg:border-0 hover:bg-purple-500 lg:p-0`}>
                About Us
              </NavLink>
            </li>
            {authStatus === false ? (<li>
              <NavLink
                to="/login"
                className={({isActive}) =>
                ` py-2 pr-4 pl-3 h-8 w-32 mt-1 flex justify-center items-center duration-200 ${isActive ? "text-white bg-purple-800 rounded-3xl" : "text-black"}
                 border-b border-gray-100  lg:hover:bg-transparent 
                 lg:border-0 hover:bg-purple-500 lg:p-0`}>
                    Sign In
               </NavLink>
            </li>) : null}
            {authStatus === false ? (<li>
              <NavLink
                to="/signup"
                className={({isActive}) =>
                ` py-2 pr-4 pl-3 h-8 w-32 mt-1 flex justify-center items-center duration-200 ${isActive ? "text-white bg-purple-800 rounded-3xl" : "text-black"}
                 border-b border-gray-100  lg:hover:bg-transparent 
                 lg:border-0 hover:bg-purple-500 lg:p-0`}>
                    Sign Up
               </NavLink>
            </li>) : null}
            
            {authStatus && (
              <li className=''>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header