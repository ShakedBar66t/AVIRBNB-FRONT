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
import { TOGGLE_LOGIN_MODAL } from '../store/reducers/user.reducer'
export function AppHeader() {

    const dispatch = useDispatch()
    const [userModal, setUserModal] = useState(false)
    const [filterModal, setFilterModal] = useState(false)
    const [loginModal, setLoginModal] = useState(false)
    const navigate = useNavigate()


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
        setFilterModal(!filterModal)
    }

    function toggleLoginModal() {
        toggleUserModal()
        setLoginModal(!loginModal)
        dispatch({ type: TOGGLE_LOGIN_MODAL, diff: 1 })
    }

    function handelShadowClick() {
        if (filterModal) setFilterModal(!filterModal)
        if (loginModal) {
            setLoginModal(!loginModal)
            dispatch({ type: TOGGLE_LOGIN_MODAL, diff: 1 })
        }
    }


    return (
        <header className="app-header full stay-index-layout">
            <nav >
                <div className='logo-container'>
                    <img className='header-logo' src={require(`../assets/img/air-bnb-logo.png`)} alt='' onClick={() => navigate('/stay')} />
                    <span className='header-logo-text'>virbnb</span>
                </div>
                <div className={`filter-container ${filterModal ? 'closed' : ''}`}>
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

                    <button onClick={toggleUserModal} className='user-info-btn ' ><span><FaBars /></span><span ><FaUserCircle className='fa-user-circle ' /></span></button>
                </div>
            </nav>
            <div className={`user-modal stay-index-layout ${userModal ? 'open' : ''}`}>
                <button onClick={toggleLoginModal}>Log in </button>
                <button>Sign up </button>
                <hr />
                <button>Avirbnb your home </button>
                <button>Host an experience </button>
                <button>Help </button>
            </div>
            <div className={`filter-modal ${filterModal ? 'open' : ''}`}>
                <button>where </button>
                <button>Check in </button>
                <button>Check out </button>
                <button>Who </button>
                <button className='search-btn'><FaSearch color='white' /></button>
            </div>
            <div onClick={handelShadowClick} className={`background-shadow full ${filterModal ? 'open' : ''} ${loginModal ? 'login' : ''}`} ></div>
            <div className='labels-container'>

            </div>
            <LabelsFilter />
        </header>
    )
}