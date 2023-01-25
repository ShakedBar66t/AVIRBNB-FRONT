import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { login, logout, signup } from '../store/user.actions.js'
import { useEffect, useRef, useState } from 'react'
import { GoDash, GoPlus } from "react-icons/go"
import { FaUserCircle, FaBars, FaSearch } from 'react-icons/fa'
import { BiGlobe } from 'react-icons/bi'
import { LabelsFilter } from './labels-filter'
import { useDispatch } from 'react-redux'
import { TOGGLE_LOGIN_MODAL, TOGGLE_IS_SHADOW, TOGGLE_IS_SIGNUP_MODAL, REFRESH_LOGIN_MODAL } from '../store/reducers/user.reducer'
import { toggleLoginModal } from '../store/user.actions.js'
import { TOGGLE_FILTER_MODAL } from '../store/reducers/stay.reducer'
import { DatePicker } from "antd"
import { stayService } from '../services/stay.service.js'
const { RangePicker } = DatePicker


export function AppHeader() {

    const params = useParams()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const isShadow = useSelector(storeState => storeState.userModule.isShadow)
    const isFilterModalOpen = useSelector(storeState => storeState.stayModule.isFilterModalOpen)
    const user = useSelector(storeState => storeState.userModule.user)
    const inputRef = useRef()
    const [userModal, setUserModal] = useState(false)
    const [searchModal, setSearchModal] = useState(false)
    const [searchModalExpended, setSearchModalExpended] = useState(false)
    //expended location modal states
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
    const [inputValue, setInputValue] = useState('')
    //expended date modal states
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)
    const [isCheckedInSelected, setIsCheckedInSelected] = useState(3)
    const [checkInOutDates, setCheckInOutDates] = useState({ checkIn: "", checkOut: "" })
    const [flexibleDates, setFlexibleDates] = useState(false)
    // expended guests modal states
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
    const [isCalenderOpen, setIsCalenderOpen] = useState(false)
    const [lowerGuestsText, setLowerGuestsText] = useState('Add guests')
    const [guests, setguests] = useState({ Adults: 1, Children: 0, Infants: 0, Pets: 0, Total: 1 })

    // final filterBy
    const [filterBy, setFilterBy] = useState(stayService.getDefaultFilterForHeader)
    const { stayId } = params
    const { id } = params
    const isTripPage = (location.pathname === '/user/trip') ? true : false
    const isHostDashboardPage = (location.pathname === '/host/dashboard') ? true : false

    console.log(isHostDashboardPage)
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


    //         function initAutocomplete(input) {
    //             const autocomplete = new window.google.maps.places.Autocomplete(input)
    //         }
    // useEffect(() => {
    //     if (!window.google) {
    //         // load the google maps API
    //     } else {
    //         initAutocomplete(inputRef.current)
    //     }
    // }, [])

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
        setInputValue('')
        setIsCalenderOpen(false)
        setIsLocationModalOpen(false)
        setIsDateModalOpen(false)
        setIsGuestsModalOpen(false)
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

    function handleGuestsInput(type, value) {
        let newGuests = { ...guests }
        let addedText = false
        let text = ''
        newGuests[type] += value
        setguests(newGuests)

        if (newGuests.Adults + newGuests.Children + newGuests.Infants + newGuests.Pets === 0) {
            text = 'Add guests'
        } else {
            if (newGuests.Adults + newGuests.Children > 0) {
                text += `${newGuests.Adults + newGuests.Children} guests`
                addedText = true
            }
            if (newGuests.Pets > 0) {
                if (addedText) {
                    text += ', '
                }
                text += ` ${newGuests.Pets} pets`
                addedText = true
            }
            if (newGuests.Infants > 0) {
                if (addedText) {
                    text += ', '
                }
                text += ` ${newGuests.Infants} infants`
            }
        }
        setLowerGuestsText(text)
    }

    function handleExpendedModalClick({ target }) {
        const name = target.name
        if (!searchModalExpended) setSearchModalExpended(!searchModalExpended)
        switch (name) {
            case 'guests':
                setIsCheckedInSelected(3)
                setIsCalenderOpen(false)
                setIsLocationModalOpen(false)
                setIsDateModalOpen(false)
                setIsGuestsModalOpen(!isGuestsModalOpen)
                break
            case 'location':
                setIsCheckedInSelected(3)
                setIsCalenderOpen(false)
                setIsDateModalOpen(false)
                setIsGuestsModalOpen(false)
                setIsLocationModalOpen(!isLocationModalOpen)
                break
            case 'checkIn':
                setIsCheckedInSelected(1)
                setIsCalenderOpen(!isCalenderOpen)
                setIsLocationModalOpen(false)
                setIsGuestsModalOpen(false)
                setIsDateModalOpen(!isDateModalOpen)
                break
            case 'checkOut':
                setIsCheckedInSelected(2)
                setIsCalenderOpen(!isCalenderOpen)
                setIsLocationModalOpen(false)
                setIsGuestsModalOpen(false)
                setIsDateModalOpen(!isDateModalOpen)
                break
            default:
                break
        }
    }

    function handleInputChange({ target }, location) {

        if (location) setInputValue(location)
        else setInputValue(target.value)
    }

    function handleDateChange(values) {
        const checkIn = new Date(values[0].$d)
        const checkOut = new Date(values[1].$d)
        const checkInMonth = checkIn.toLocaleString('en-US', { month: 'short' })
        const checkInDay = checkIn.getDate()
        const checkOutMonth = checkOut.toLocaleString('en-US', { month: 'short' })
        const checkOutDay = checkOut.getDate()
        const formattedCheckIn = `${checkInMonth} ${checkInDay}`
        const formattedCheckOut = `${checkOutMonth} ${checkOutDay}`
        setCheckInOutDates({ checkIn: formattedCheckIn, checkOut: formattedCheckOut })
        const dayInMilliseconds = 1000 * 60 * 60 * 24
        const dateStart = values[0].$d.getTime()
        const dateEnd = values[1].$d.getTime()
        const daysCount = Math.round((dateEnd - dateStart) / (dayInMilliseconds))
    }

    function handleClearValue(ev) {
        console.log('clear active')
        ev.stopPropagation();
        ev.preventDefault();
        const name = ev.target.name;

        switch (name) {
            case 'location':
                setInputValue('');
                break;
            case 'checkIn':
                setCheckInOutDates({ checkIn: '', checkOut: checkInOutDates.checkOut });
                break;
            case 'checkOut':
                setCheckInOutDates({ checkIn: checkInOutDates.checkIn, checkOut: '' });
                break;
            case 'guests':
                setLowerGuestsText('');
                break;
            default:
                break;
        }
    }
    return (
        <header className={(stayId || isTripPage || id || isHostDashboardPage) ? 'app-header full secondary-container' : 'app-header full main-layout'}>
            <nav className='app-header-nav '>
                <div className='logo-container' onClick={() => { navigate('/explore') }}>
                    <img className='header-logo' src={require(`../assets/img/air-bnb-logo.png`)} alt='' onClick={() => navigate('/stay')} />
                    <span className='header-logo-text'>avirbnb</span>
                </div>

                {(!isTripPage && !id && !isHostDashboardPage) && <div className={`filter-container ${searchModal ? 'closed' : ''}`}>
                    {stayId && <div className='filter-btns-details' onClick={toggleFilterModal}><span> Start your search </span>
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
                        <button className='host-btn' onClick={() => navigate('/host/dashboard')}>Avirbnb your home</button>
                        <button className='lang-btn '><BiGlobe className='bi-globe' /></button>
                    </div>

                    <button onClick={toggleUserModal} className='user-info-btn ' ><span><FaBars /></span><span >{(user) ? <img style={{ width: '30px', height: '30px' }} src={user.imgUrl} /> : <FaUserCircle className='fa-user-circle ' />}</span></button>
                </div>
            </nav>
            <div className={`header-opened full  ${searchModal ? 'open' : ''}`}></div>
            <div className={`user-modal ${userModal ? 'open' : ''} ${(stayId || isTripPage || isHostDashboardPage) ? 'on-details-layout' : 'stay-index-layout'}`}>
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
                    <button name='location' onClick={(ev) => handleExpendedModalClick(ev)} className={`inner-btns-container left ${isLocationModalOpen ? 'selected' : ''}`} ><span className='upper-text'>Where
                        <span name='location' onClick={(ev) => handleClearValue(ev)} className={`clear-value-btn input ${isLocationModalOpen ? 'shown' : ''}`}>x</span> </span>
                        <input
                            ref={inputRef}
                            name='location'
                            type='text'
                            placeholder="Search destinations"
                            value={inputValue}
                            className='lower-text input'
                            onChange={(ev) => handleInputChange(ev)}>
                        </input>
                    </button>
                    <div className={`location-modal-extended ${isLocationModalOpen ? 'open' : ''}`}>
                        <div className='location-modal-inner'>
                            <span className='location-modal-inner-title'>Search by region</span>
                            <div className='cards-container'>
                                {countries.map((place, index) => {
                                    return <div key={index} className='place-card' onClick={(ev) => handleInputChange(ev, place.label)}>
                                        <div className='place-card-inner'>
                                            <img src={place.image} />
                                            <span>{place.label}</span>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>

                    </div>
                    <div className={`date-modal-extended ${isDateModalOpen ? 'open' : ''}`}>
                        <div className='date-modal-inner'>
                            <div className='calender-type-btns'>
                                <div className='btns-wrapper'>
                                    <button onClick={() => setFlexibleDates(false)} className={` ${!flexibleDates ? 'selected' : ''}`}>Choose dates</button>
                                    <button onClick={() => setFlexibleDates(true)} className={` ${flexibleDates ? 'selected' : ''}`}>Flexible dates</button>
                                </div>
                            </div>
                            <div className='calenders-container'>
                                <div className='left-calender'>
                                    <RangePicker format="MMM D" open={isCalenderOpen} popupClassName='header-calender-dropdown' className='header-calender'
                                        onChange={(values) => handleDateChange(values)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='filter-modal-middle-btns '  >
                    <div className={`inner-btns-container middle `}>
                        <div className='inner-btn-wrapper middle'>
                            <button className={`date-btn right ${isCheckedInSelected === 1 ? 'selected' : ''}`} name='checkIn' onClick={(ev) => handleExpendedModalClick(ev)} >
                                <span name='date' className='upper-text'>
                                    Check in
                                    <span name={'checkIn'} className={`clear-value-btn date ${isCheckedInSelected === 1 ? 'shown' : ''}`}
                                        onClick={(ev) => handleClearValue(ev)} >x</span>
                                </span>
                                <span name='date' className='lower-text'>{`${checkInOutDates.checkIn ? checkInOutDates.checkIn : 'Add dates'}`}</span> </button>
                            <span>
                                <span className='border-between-middle'></span>
                            </span>
                            <button className={`date-btn left ${isCheckedInSelected === 2 ? 'selected' : ''}`} name='checkOut' onClick={(ev) => handleExpendedModalClick(ev)}>
                                <span className='upper-text'>
                                    Check out
                                    <span name={'checkOut'} className={`clear-value-btn date ${isCheckedInSelected === 2 ? 'shown' : ''}`}
                                        onClick={(ev) => handleClearValue(ev)} >x</span>
                                </span>
                                <span className='lower-text'>{`${checkInOutDates.checkOut ? checkInOutDates.checkOut : 'Add dates'}`}</span> </button>
                            <span className='border-between-right'></span>
                        </div>
                    </div>
                </div>
                <div className='filter-modal-right-btns'>
                    <div className={`inner-btn-wrapper ${isGuestsModalOpen ? 'selected' : ''}`}>
                        <button className={`inner-btns-container right`} name='guests' onClick={(ev) => handleExpendedModalClick(ev)}>
                            <span className='upper-text'>
                                Who
                                <span name='guests' onClick={(ev) => handleClearValue(ev)} className={`clear-value-btn ' ${isGuestsModalOpen ? 'shown' : ''}`}>
                                    x
                                </span></span>
                            <span className='lower-text'>{lowerGuestsText}</span></button>
                        <button className={`search-btn ${searchModalExpended ? 'expended' : ''}`}><FaSearch className='fa-search' color='white' /> {searchModalExpended ? <span>Search </span> : ''}</button>
                    </div>
                    <div className={`guests-modal-extended ${isGuestsModalOpen ? 'open' : ''}`}>
                        {guestsTypes.map((type, index) => {
                            return <div className="guests-type-input" key={type.type}>
                                <div className='guest-type-text-containter'>
                                    <span className='upper-text'>{type.type}</span>
                                    <span className={`lower-text ${(index === 3) ? 'last' : ''}`} >{type.txt}</span >
                                </div>
                                <div className="guests-type-input-value">
                                    <button type="button" className={`guests-btn ${guests[type.type] === 0 ? 'denied' : 'allowed'} `} disabled={!guests[type.type]} onClick={() => { handleGuestsInput(type.type, -1) }}><GoDash className={`btn-icon `} /></button>
                                    <span className='type-count'>{guests[type.type]}</span>
                                    <button type="button" className={`guests-btn allowed`} name={type.type === 'Pets' ? 'pets' : ''} onClick={() => { handleGuestsInput(type.type, 1) }}><GoPlus className={`btn-icon `} /></button>
                                </div>

                            </div>
                        })}
                    </div>
                </div>
            </div>
            <div onClick={handelShadowClick} className={`background-shadow full ${searchModal ? 'open' : ''} ${isShadow ? 'login' : ''}`} ></div>
            {((!isTripPage && !id)) && <div className={`labels-container ${(isHostDashboardPage) ? 'hidden' : ''}`}>
                {/* {(!stayId) && <LabelsFilter />} */}
            </div>}
        </header >
    )
}