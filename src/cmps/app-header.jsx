import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { useState } from 'react'

import { FaUserCircle, FaBars, FaSearch } from 'react-icons/fa'
import { BiGlobe } from 'react-icons/bi'
import { LabelsFilter } from './labels-filter'
import { useDispatch } from 'react-redux'
import { TOGGLE_LOGIN_MODAL, TOGGLE_IS_SHADOW, TOGGLE_IS_SIGNUP_MODAL } from '../store/reducers/user.reducer'
import { toggleLoginModal } from '../store/user.actions.js'
import { TOGGLE_FILTER_MODAL } from '../store/reducers/stay.reducer'



export function AppHeader() {

    const dispatch = useDispatch()
    const [userModal, setUserModal] = useState(false)
    const [searchModal, setSearchModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)
    const navigate = useNavigate()

    const isShadow = useSelector(storeState => storeState.userModule.isShadow)
    const isFilterModalOpen = useSelector(storeState => storeState.stayModule.isFilterModalOpen)

    const user = useSelector(storeState => storeState.userModule.user)
    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function toggleUserModal() {
        setUserModal(!userModal)
    }

    function toggleFilterModal() {
        setSearchModal(!searchModal)
    }

    // function toggleLoginModal(signup) {
    //     if(signup==='signup'){
    //         dispatch({ type: TOGGLE_IS_SIGNUP_MODAL })
    //     }
    //     toggleUserModal()
    //     setLoginModal(!loginModal)
    //     dispatch({ type: TOGGLE_LOGIN_MODAL })
    //     dispatch({ type: TOGGLE_IS_SHADOW })
    // }

    function handelShadowClick() {
        if (searchModal) {
            setSearchModal(!searchModal)
            return
        }
        else if (isFilterModalOpen) {
            dispatch({ type: TOGGLE_FILTER_MODAL })
            dispatch({ type: TOGGLE_IS_SHADOW })
            return
        }
        dispatch({ type: TOGGLE_LOGIN_MODAL })
        dispatch({ type: TOGGLE_IS_SHADOW })
    }


    return (
        <header className="app-header full stay-index-layout">
            <nav >
                <div className='logo-container' onClick={() => { navigate('/explore') }}>
                    <img className='header-logo' src={require(`../assets/img/air-bnb-logo.png`)} alt='' onClick={() => navigate('/stay')} />
                    <span className='header-logo-text'>virbnb</span>
                </div>
                <div className={`filter-container ${searchModal ? 'closed' : ''}`}>
                    <div className='filter-btns' onClick={toggleFilterModal}>
                        <button className='location-filter '>Anywhere <span className='seperator-span'></span></button>
                        <button className='time-filter'>Any week <span className='seperator-span'></span></button>
                        <button className='guest-filter '>Add guests </button>
                        <button className='search-btn'><FaSearch className='fa-search' /></button>
                    </div>
                </div>
                <div className='user-nav-container'>
                    <div className='host-lng-container'>
                        <button className='host-btn'>Avirbnb your home</button>
                        <button className='lang-btn '><BiGlobe className='bi-globe' /></button>
                    </div>

                    <button onClick={toggleUserModal} className='user-info-btn ' ><span><FaBars /></span><span >{(user) ? <img style={{ width: '30px', height: '30px' }} src={user.imgUrl} /> : <FaUserCircle className='fa-user-circle ' />}</span></button>
                </div>
            </nav>
            <div className={`user-modal stay-index-layout ${userModal ? 'open' : ''}`}>
                { (!user) &&<button onClick={()=>{

                    toggleUserModal()
                    toggleLoginModal()
                } }>Log in </button>}
                {(!user) && <button onClick={()=>{
                    toggleUserModal()
                    toggleLoginModal('signup')
                    }}>Sign up </button>}
                {(user) && <button >Notifications </button>}
                {(user) && <button >Trips </button>}
                {(user) && <button >Wishlists </button>}
                <hr />
                {(user)&&< button onClick={()=>{navigate(`/user/${user._id}`)}}>Account </button>}
                <button onClick={()=>{
                    if(!user){

                        toggleLoginModal()
                        toggleUserModal()

                        
                        return
                    }
                    navigate('/host/home')
                }}>Host an experience </button>
                <button>Help </button>
                {(user) && <button onClick={() => { logout() }}>Log out</button>}
            </div>
            <div className={`filter-modal ${searchModal ? 'open' : ''}`}>
                <button>where </button>
                <button>Check in </button>
                <button>Check out </button>
                <button>Who </button>
                <button className='search-btn'><FaSearch color='white' /></button>
            </div>
            <div onClick={handelShadowClick} className={`background-shadow full ${searchModal ? 'open' : ''} ${isShadow ? 'login' : ''}`} ></div>
            <div className='labels-container'>

            </div>
            <LabelsFilter />
        </header>
    )
}