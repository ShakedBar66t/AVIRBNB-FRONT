import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { useEffect, useState } from 'react'

import { FaUserCircle, FaBars, FaSearch } from 'react-icons/fa'
import { BiGlobe } from 'react-icons/bi'
import { LabelsFilter } from './labels-filter'
import { useDispatch } from 'react-redux'
import { TOGGLE_LOGIN_MODAL, TOGGLE_IS_SHADOW, TOGGLE_IS_SIGNUP_MODAL, REFRESH_LOGIN_MODAL } from '../store/reducers/user.reducer'
import { toggleLoginModal } from '../store/user.actions.js'
import { TOGGLE_FILTER_MODAL } from '../store/reducers/stay.reducer'



export function AppHeader() {

    const params = useParams()
    const { stayId } = params
    const location = useLocation()
    const isTripPage = (location.pathname === '/user/trip') ? true : false
    // console.log(isTripPage)
    // console.log(!stayId)

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
        dispatch({ type: REFRESH_LOGIN_MODAL })
        setTimeout(() => {
            dispatch({ type: REFRESH_LOGIN_MODAL })
        }, 500)
    }


    return (
        <header className={(stayId || isTripPage) ? 'app-header full secondary-container' : 'app-header full stay-index-layout'}>
            <nav className='app-header-nav '>
                <div className='logo-container' onClick={() => { navigate('/explore') }}>
                    <img className='header-logo' src={require(`../assets/img/air-bnb-logo.png`)} alt='' onClick={() => navigate('/stay')} />
                    <span className='header-logo-text'>avirbnb</span>
                </div>

                {!isTripPage && <div className={`filter-container ${searchModal ? 'closed' : ''}`}>
                    {stayId && <div className='filter-btns-details'><span> Start your search </span>
                        <button className='search-btn'><FaSearch className='fa-search' /></button>
                    </div>}
                    {!stayId && <div className='filter-btns' onClick={toggleFilterModal}>
                        <button className='location-filter '>Anywhere <span className='seperator-span'></span></button>
                        <button className='time-filter'>Any week <span className='seperator-span'></span></button>
                        <button className='guest-filter '>Add guests </button>
                        <button className='search-btn'><FaSearch className='fa-search' /></button>
                    </div>}
                </div>
                }
                <div className='user-nav-container'>
                    <div className='host-lng-container'>
                        <button className='host-btn'>Avirbnb your home</button>
                        <button className='lang-btn '><BiGlobe className='bi-globe' /></button>
                    </div>

                    <button onClick={toggleUserModal} className='user-info-btn ' ><span><FaBars /></span><span >{(user) ? <img style={{ width: '30px', height: '30px' }} src={user.imgUrl} /> : <FaUserCircle className='fa-user-circle ' />}</span></button>
                </div>
            </nav>
            <div className={`header-opened full  ${searchModal ? 'open' : ''}`}></div>
            <div className={`user-modal ${userModal ? 'open' : ''} ${stayId || isTripPage ? 'on-details-layout' : 'stay-index-layout'}`}>
                {(!user) && <button onClick={() => {

                    toggleUserModal()
                    toggleLoginModal()
                }}>Log in </button>}
                {(!user) && <button onClick={() => {
                    toggleUserModal()
                    toggleLoginModal('signup')
                }}>Sign up </button>}
                {(user) && <button >Notifications </button>}
                {(user) && <button onClick={() => navigate('/user/trip')} >Trips </button>}
                {(user) && <button >Wishlists </button>}
                <hr />
                {(user) && < button onClick={() => { navigate(`/user/${user._id}`) }}>Account </button>}
                <button onClick={() => {
                    if (!user) {
                        toggleLoginModal()
                        toggleUserModal()
                        return
                    }
                    navigate('/host/home')
                }}>Host an experience </button>
                <button>About</button>
                <button>Help </button>
                {(user) && <button onClick={() => { logout() }}>Log out</button>}
            </div>
            <div className={`filter-modal ${searchModal ? 'open' : ''}`}>
                <div className='filter-modal-left-btns'>
                    <button className='inner-btns-container left'><span className='inner-button-top'>Where</span><input type='text' placeholder="Search destinations" className='inner-button-bottom'></input></button>
                </div>
                <div className='filter-modal-middle-btns'>
                    <div className='inner-btns-container middle'>
                        <div className='inner-btn-wrapper'>
                            <button className='inner-btns-container middle'><span className='inner-button-top'>Check in</span><span className='inner-button-bottom'>Add dates</span> </button>
                            <button className='inner-btns-container middle'><span className='inner-button-top'>Check out</span><span className='inner-button-bottom'>Add dates</span> </button>
                        </div>
                    </div>
                </div>
                <div className='filter-modal-right-btns'>
                    <div className='inner-btn-wrapper'>
                        <button className='inner-btns-container right'><span className='inner-button-top'>Who</span><span className='inner-button-bottom'>Add guests</span></button>
                        <button className='search-btn'><FaSearch color='white' /></button>
                    </div>
                </div>
            </div>
            <div onClick={handelShadowClick} className={`background-shadow full ${searchModal ? 'open' : ''} ${isShadow ? 'login' : ''}`} ></div>
            {(!isTripPage) && <div className='labels-container'>
                {(!stayId) && <LabelsFilter />}
            </div>}
        </header >
    )
}