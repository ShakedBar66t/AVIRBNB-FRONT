import { useSelector } from "react-redux"
import { useState } from "react"
import { IoCloseSharp } from "react-icons/io5";
import { SignUpForm } from "./signup-form";
import { SignInForm } from "./login-form";
import { TOGGLE_IS_SIGNUP_MODAL, TOGGLE_LOGIN_MODAL, TOGGLE_IS_SHADOW } from '../store/reducers/user.reducer';
import { useDispatch } from "react-redux";


export function LoginModal() {
    const dispatch = useDispatch()
    const isLoginModalOpen = useSelector(storeState => storeState.userModule.isLoginModalOpen)
    const isSignUpModal = useSelector(storeState => storeState.userModule.isSignUpModal)

    function onCloseLoginModal() {
        if (isSignUpModal) {
            console.log(isSignUpModal, 'signup')
            console.log(isLoginModalOpen, 'signup')
            dispatch({ type: TOGGLE_IS_SHADOW })
            dispatch({ type: TOGGLE_IS_SIGNUP_MODAL })
            dispatch({ type: TOGGLE_LOGIN_MODAL })
        }
        else {
            dispatch({ type: TOGGLE_LOGIN_MODAL })
            dispatch({ type: TOGGLE_IS_SHADOW })
        }
    }

    return <div className={`login-modal ${(isLoginModalOpen) ? 'open' : 'closed'}`}>
        <header className="login-modal-header">
            <button className="clear-btn" style={{ fontSize: '21px' }} onClick={onCloseLoginModal}><IoCloseSharp /></button>
            <h2>{(isSignUpModal) ? 'Sign Up' : 'Sign In'}</h2>
        </header>
        <hr className="full" />
        <main className="main-login-cont" action="">
            <h3 >Welcome to Avirbnb</h3>
            {/* {(!isSignUpModal) && <SignInForm />}
           {(isSignUpModal) && < SignUpForm/>} */}
            < SignInForm />
            
            <p className='or-p'>OR</p> 
            <hr /> 
         

        </main>
    </div>
}