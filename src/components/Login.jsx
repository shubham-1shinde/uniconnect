import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { studentlogin, studentlogout, logout } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import appwriteService from '../appwrite/config'
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const [selected, setSelected] = useState("")
    const [posts, setPosts] = useState([])
    

    const handelchange = (e) => {
        setSelected(e.target.value)
    }

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser();
               if (userData) {
                    if (selected === "student") {
                        localStorage.setItem("userRole", true);
                        dispatch(studentlogin(userData));
                        try {
                            const response = await appwriteService.getRolesofstudent([]);
                            if (response && response.documents) {

                                const filteredresponse = response.documents.filter((doc) => {
                                    return doc.role === "student"
                                });
                                const userDoc = filteredresponse.find((doc) => {
                                    return userData.$id === doc.userid;
                                });

                                if (userDoc) {
                                    console.log("Yes, user is a student and he chose student, hence logged in.");
                                    navigate("/")
                                } else {
                                    alert("You already signed up as faculty")
                                    authService.logout().then(() => {
                                        dispatch(studentlogout());
                                        localStorage.removeItem("userRole");
                                        navigate("/login");
                                    })
                                    console.log("User not found in the student role documents.");
                                }
                            }
                        } catch (error) {
                            console.error("Error fetching roles:", error);
                        }
                    }
                    else if(selected === "faculty"){
                        dispatch(authLogin(userData))
                        localStorage.setItem("userRole", false);
                       try {
                            const response = await appwriteService.getRolesoffaculty([]);
                            if (response && response.documents) {

                                const filteredresponse = response.documents.filter((doc) => {
                                    return doc.role === "faculty"
                                });
                                const userDoc = filteredresponse.find((doc) => {
                                    return userData.$id === doc.userid;
                                });

                                if (userDoc) {
                                    console.log("Yes, user is a faculty and he chose faculty, hence logged in.");
                                    navigate("/")
                                } else {
                                    alert("You already signed up as student")
                                    authService.logout().then(() => {
                                        dispatch(logout());
                                        localStorage.removeItem("userRole");
                                        navigate("/login");
                                    })
                                    console.log("User not found in the faculty role documents.");
                                }
                            }
                        } catch (error) {
                            console.error("Error fetching roles:", error);
                        }
                    } 
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full  bg-linear-to-t from-purple-800 to-white'>
        <div className={`mx-auto w-full max-w-lg bg-purple-200 mt-4 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
            </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <div className='flex justify-evenly w-full'>
                    <lable>
                    Student Login: 
                        <input
                        type='radio'
                        className='ml-1'
                        value='student'
                        checked= {selected === 'student'}
                        onChange={handelchange}
                        /> 
                    </lable>
                    <lable>
                    Faculty Login: 
                        <input 
                        type='radio'
                        value='faculty'
                        className='ml-1'
                        checked= {selected === 'faculty'}
                        onChange={handelchange}
                        />
                    </lable>
                </div>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password "
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login