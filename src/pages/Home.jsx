import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth"
import { Link } from 'react-router-dom'
import mitdome from "../components/logos/mitdome.jpg"
import {Container, PostCard} from '../components'
import {useSelector} from 'react-redux'
import "../components/CSS/homes.css"

function Home() {
    const authStatus = useSelector((state) => state.auth.status)
    const student = useSelector((state) => state.auth.studentloginstatus)
    const userData = useSelector((state) => state.auth.userData);

    console.log("current user is: ",userData);

    return (
        <div className=''>
            <Container>
                <div className='bg-white h-20 flex justify-center items-center '>
                    <div className='flex'>
                        <input className='bg-purple-200 h-8 min-w-2xl rounded-l-xl pl-4' placeholder='Search' />
                        <button className='bg-purple-200 h-8 w-10 rounded-r-xl'></button>
                    </div>
                </div>
                <div className='h-auto w-full'>
                    <div className='maindiv bg-white  bg-linear-to-t from-purple-800 to-white w-full flex '>
                        <div className='sub1 flex flex-col items-center justify-evenly '>
                            <div className='box1 bg-purple-200 flex justify-center items-center'><p className='box1text'>Where Ideas Meet Insight – <br/>
                                Your Campus, Your Voice</p>
                            </div>
                            <div className='box2 bg-purple-200 flex justify-center items-center'><p className='box2text'>Welcome to MIT ADT’s Central Platform – 
                                your one-stop destination for student blogs, 
                                academic insights, and official announcements. 
                                Stay informed, stay inspired.</p>
                            </div>
                            {!authStatus ? (
                               <div className='box3 bg-purple-200 flex justify-center items-center'>
                                <Link to='/login'>
                                    <div className='flex justify-center items-center'><p className='box3text'>Login</p></div>
                                </Link>
                                </div>
                                ) : null
                            }
                            
                        </div>
                        <div className='mitdome flex justify-center mr-12 '>
                            <img className='mitdomeimg' src={mitdome }/>
                        </div>
                    </div>
                    
                </div>
            </Container>
        </div>
    )
}

export default Home