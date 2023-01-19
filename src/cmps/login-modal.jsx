import { useSelector } from "react-redux"
import { useState } from "react"
import { IoCloseSharp } from "react-icons/io5";

import { SignInForm } from "./login-form";
import { useDispatch } from 'react-redux'
import { TOGGLE_LOGIN_MODAL } from '../store/reducers/user.reducer'

export function LoginModal(){

    const [isSignup,setIsSignup] = useState(false)
    const isLoginModalOpen = useSelector(storeState => storeState.userModule.isLoginModalOpen)
    

    return <div className={`login-modal ${(isLoginModalOpen)? 'open':'closed'}`}>
        <header className="login-modal-header">
            <button className="clear-btn" style={{fontSize:'21px'}}><IoCloseSharp /></button>
        <h2>{(isSignup)? 'Sign up' : 'Log in'}</h2>
        </header> 
        <hr className="full"/>
        <main className="main-login-cont" action="">
            <h3 >Welcome to Avirbnb</h3>
            <SignInForm/>
        </main>
    </div>
}