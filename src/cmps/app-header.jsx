import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { useEffect, useState } from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'
import { GoDash, GoPlus } from "react-icons/go"
import { BiMinus } from "react-icons/bi"
import { FaUserCircle, FaBars, FaSearch } from 'react-icons/fa'
import { BiGlobe } from 'react-icons/bi'
import { LabelsFilter } from './labels-filter'
import { useDispatch } from 'react-redux'
import { TOGGLE_LOGIN_MODAL, TOGGLE_IS_SHADOW, TOGGLE_IS_SIGNUP_MODAL, REFRESH_LOGIN_MODAL } from '../store/reducers/user.reducer'
import { toggleLoginModal } from '../store/user.actions.js'
import { TOGGLE_FILTER_MODAL } from '../store/reducers/stay.reducer'
import { DatePicker } from "antd"
const { RangePicker } = DatePicker


export function AppHeader() {

    const params = useParams()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const isShadow = useSelector(storeState => storeState.userModule.isShadow)
    const isFilterModalOpen = useSelector(storeState => storeState.stayModule.isFilterModalOpen)
    const user = useSelector(storeState => storeState.userModule.user)

    const [userModal, setUserModal] = useState(false)
    const [searchModal, setSearchModal] = useState(false)
    const [searchModalExpended, setSearchModalExpended] = useState(false)
    const [locationModal, setLocationModal] = useState(false)
    const [dateModal, setDateModal] = useState(false)
    const [isCheckedInSelected, setIsCheckedInSelected] = useState(3)
    const [flexibleDates, setFlexibleDates] = useState(false)
    const [guestsModal, setGuestsModal] = useState(false)
    const [calenderOpen, setCalenderOpen] = useState(false)
    const [guests, setguests] = useState({ Adults: 1, Children: 0, Infants: 0, Pets: 0, Total: 1 })

    const { stayId } = params
    const isTripPage = (location.pathname === '/user/trip') ? true : false
    const countries = [
        { country: 'Flexible', label: `I'm flexible`, image: require('../assets/img/flexible.jpg') },
        { country: 'Middle East', label: 'Middle East', image: require('../assets/img/middleEast.jpg') },
        { country: 'Italy', label: 'Italy', image: require('../assets/img/italy.jpg') },
        { country: 'United Stated', label: 'United Stated', image: require('../assets/img/usa.jpg') },
        { country: 'France', label: 'France', image: require('../assets/img/france.jpg') },
        { country: 'South America', label: 'South America', image: require('../assets/img/southAmerica.jpg') },
    ]

    const guestsTypes = [
        { type: 'Adults', txt: 'Ages 13 or above' }, { type: 'Children', txt: 'Ages 2-12' }
        , { type: 'Infants', txt: 'Under 2' }, { type: 'Pets', txt: 'Bringing a service animal?' }]


    useEffect(() => {
        const handleWheel = (event) => {
            if (searchModal) {
                event.preventDefault()
                handelShadowClick()

            }
        }
        window.addEventListener('wheel', handleWheel, { passive: false })
        return () => {
            window.removeEventListener('wheel', handleWheel)
        }
    }, [searchModal])


    function toggleUserModal() {
        setUserModal(!userModal)
    }

    function toggleFilterModal() {
        setSearchModal(!searchModal)
    }

    function handelShadowClick() {
        setCalenderOpen(false)
        setLocationModal(false)
        setDateModal(false)
        setGuestsModal(false)
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


    function handleExpendedModalClick({ target }) {
        const name = target.name
        if (!searchModalExpended) setSearchModalExpended(!searchModalExpended)
        console.log(name)
        console.log(isCheckedInSelected)
        switch (name) {
            case 'guests':
                setIsCheckedInSelected(3)
                setCalenderOpen(false)
                setLocationModal(false)
                setDateModal(false)
                setGuestsModal(!guestsModal)
                break
            case 'location':
                setIsCheckedInSelected(3)
                setCalenderOpen(false)
                setDateModal(false)
                setGuestsModal(false)
                setLocationModal(!locationModal)
                break
            case 'date-1':
                setIsCheckedInSelected(1)
                setCalenderOpen(!calenderOpen)
                setLocationModal(false)
                setGuestsModal(false)
                setDateModal(!dateModal)
                break
            case 'date-2':
                setIsCheckedInSelected(2)
                setCalenderOpen(!calenderOpen)
                setLocationModal(false)
                setGuestsModal(false)
                setDateModal(!dateModal)
                break
            default:
                break
        }
    }

    function handleGuestsInput(type, diff) {
        setguests({ ...guests, [type]: guests[type] + diff, total: guests.total + diff })


        console.log(guests)
    }

    return (
        <header className={(stayId || isTripPage) ? 'app-header full secondary-container' : 'app-header full main-layout'}>
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
            <div className={`filter-modal ${searchModal ? 'open' : ''} ${searchModalExpended ? 'expended' : ''}`}>
                <div className='filter-modal-left-btns' >
                    <button name='location' onClick={(ev) => handleExpendedModalClick(ev)} className={`inner-btns-container left ${locationModal ? 'selected' : ''}`} ><span className='upper-text'>Where</span>
                        <input name='location' type='text' placeholder="Search destinations" className='lower-text input'></input></button>
                    <div className={`location-modal-extended ${locationModal ? 'open' : ''}`}>
                        <div className='location-modal-inner'>
                            <span className='location-modal-inner-title'>Search by region</span>
                            <div className='cards-container'>
                                {countries.map((place, index) => {
                                    return <div key={index} className='place-card'>
                                        <div className='place-card-inner'>
                                            <img src={place.image} />
                                            <span>{place.label}</span>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>

                    </div>
                    <div className={`date-modal-extended ${dateModal ? 'open' : ''}`}>
                        <div className='date-modal-inner'>
                            <div className='calender-type-btns'>
                                <div className='btns-wrapper'>
                                    <button onClick={() => setFlexibleDates(false)} className={` ${!flexibleDates ? 'selected' : ''}`}>Choose dates</button>
                                    <button onClick={() => setFlexibleDates(true)} className={` ${flexibleDates ? 'selected' : ''}`}>Flexible dates</button>
                                </div>
                            </div>
                            <div className='calenders-container'>
                                <div className='left-calender'>
                                    <RangePicker format="MMMM D, YYYY" open={calenderOpen} popupClassName='header-calender-dropdown' className='header-calender'
                                        onChange={(values) => {

                                            // const value1 = moment(values[0]).format('DD-MM-YYYY')
                                            const time1 = values[0].$d
                                            const date = new Date(time1)
                                            const day = 1000 * 60 * 60 * 24

                                            //    const dateStart = date.getTime()
                                            const dateStart = values[0].$d.getTime()
                                            const dateEnd = values[1].$d.getTime()

                                            const daysCount = Math.round((dateEnd - dateStart) / (day))
                                            if (daysCount) console.log('daysCount')
                                            // setOrder({ ...order, totalPrice: totalPrice, startDate: values[0].$d, endDate: values[1].$d, totalNights: daysCount })
                                        }} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='filter-modal-middle-btns '  >
                    <div className={`inner-btns-container middle `}>
                        <div className='inner-btn-wrapper middle'>
                            <button className={`date-btn right ${isCheckedInSelected === 1 ? 'selected' : ''}`} name='date-1' onClick={(ev) => handleExpendedModalClick(ev)} >
                                <span name='date' className='upper-text'>Check in</span><span name='date' className='lower-text'>Add dates</span> </button>
                            <span>
                                <span className='border-between-middle'></span>
                            </span>
                            <button className={`date-btn left ${isCheckedInSelected === 2 ? 'selected' : ''}`} name='date-2' onClick={(ev) => handleExpendedModalClick(ev)}><span className='upper-text'>Check out</span><span className='lower-text'>Add dates</span> </button>
                            <span className='border-between-right'></span>
                        </div>
                    </div>
                </div>
                <div className='filter-modal-right-btns'>
                    <div className='inner-btn-wrapper'>
                        <button className={`inner-btns-container right ${guestsModal ? 'selected' : ''}`} name='guests' onClick={(ev) => handleExpendedModalClick(ev)}><span className='upper-text'>Who</span><span className='lower-text'>Add guests</span></button>
                        <button className={`search-btn ${searchModalExpended ? 'expended' : ''}`}><FaSearch className='fa-search' color='white' /> {searchModalExpended ? <span>Search </span> : ''}</button>
                    </div>
                    <div className={`guests-modal-extended ${guestsModal ? 'open' : ''}`}>
                        {guestsTypes.map((type, index) => {
                            return <div className="guests-type-input" key={type.type}>
                                <div className='guest-type-text-containter'>
                                    <span className='upper-text'>{type.type}</span>
                                    <span className={`lower-text ${(index === 3) ? 'last' : ''}`} >{type.txt}</span >
                                </div>
                                <div className="guests-type-input-value">
                                    <button type="button" className={`guests-btn ${guests[type.type] === 0 ? 'denied' : 'allowed'} `} disabled={!guests[type.type]} onClick={() => { handleGuestsInput(type.type, -1) }}><GoDash className={`btn-icon `} /></button>
                                    <span className='type-count'>{guests[type.type]}</span>
                                    <button type="button" className={`guests-btn allowed`} onClick={() => { handleGuestsInput(type.type, 1) }}><GoPlus className={`btn-icon `} /></button>
                                </div>

                            </div>
                        })}                    </div>
                </div>
            </div>
            <div onClick={handelShadowClick} className={`background-shadow full ${searchModal ? 'open' : ''} ${isShadow ? 'login' : ''}`} ></div>
            {(!isTripPage) && <div className='labels-container'>
                {(!stayId) && <LabelsFilter />}
            </div>}
        </header >
    )
}