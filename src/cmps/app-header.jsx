import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { DatePicker } from "antd"
import { GoDash, GoPlus } from "react-icons/go"
import { FaUserCircle, FaBars, FaSearch } from 'react-icons/fa'
import { BiGlobe } from 'react-icons/bi'
import { CgOptions } from "react-icons/cg"
import { IoCloseSharp } from 'react-icons/io5'
import { TOGGLE_LOGIN_MODAL, TOGGLE_IS_SHADOW, REFRESH_LOGIN_MODAL, TOGGLE_CHECKOUT_MODAL } from '../store/reducers/user.reducer'
import { logout } from '../store/user.actions.js'
import { toggleLoginModal } from '../store/user.actions.js'
import { TOGGLE_FILTER_MODAL } from '../store/reducers/stay.reducer'
import { stayService } from '../services/stay.service.js'
import { SiAirbnb } from 'react-icons/si'
const { RangePicker } = DatePicker


export function AppHeader() {

    const params = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isShadow = useSelector(storeState => storeState.userModule.isShadow)
    const isFilterModalOpen = useSelector(storeState => storeState.stayModule.isFilterModalOpen)
    const isLoginModalOpen = useSelector(storeState => storeState.userModule.isLoginModalOpen)
    const isCheckoutModal = useSelector(storeState => storeState.userModule.isCheckoutModal)
    const user = useSelector(storeState => storeState.userModule.user)
    const inputRef = useRef()
    const [userModal, setUserModal] = useState(false)
    const [searchModal, setSearchModal] = useState(false)
    const [searchModalExpended, setSearchModalExpended] = useState(false)
    //expended location modal states
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
    const [locationInput, setLocationInput] = useState('')
    //expended date modal states
    const [isDateModalOpen, setIsDateModalOpen] = useState(false)
    const [isCheckedInSelected, setIsCheckedInSelected] = useState(3)
    const [isCalenderOpen, setIsCalenderOpen] = useState(false)
    const [checkInOutDates, setCheckInOutDates] = useState({ checkIn: 'flexible', checkOut: 'flexible' })
    const [flexibleDates, setFlexibleDates] = useState(false)
    // expended guests modal states
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
    const [lowerGuestsText, setLowerGuestsText] = useState('Add guests')
    const [guests, setGuests] = useState({ Adults: 1, Children: 0, Infants: 0, Pets: 0, Total: 1 })

    // final filterBy
    const [filterBy, setFilterBy] = useState(stayService.getDefaultFilterForHeader)
    // pages locations for classNames
    const { stayId } = params
    const { id } = params
    const isTripPage = (location.pathname === '/user/trip') ? true : false
    const isHostDashboardPage = (location.pathname === '/host/dashboard') ? true : false

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
        setLocationInput('')
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
        if (isLoginModalOpen) {

            dispatch({ type: TOGGLE_LOGIN_MODAL })
            dispatch({ type: REFRESH_LOGIN_MODAL })
            setTimeout(() => {
                dispatch({ type: REFRESH_LOGIN_MODAL })
            }, 500)
        }
        if (isCheckoutModal) {

            dispatch({ type: TOGGLE_CHECKOUT_MODAL })
        }
        dispatch({ type: TOGGLE_IS_SHADOW })
    }

    function handleGuestsInput(type, value) {
        let newGuests = { ...guests }
        let addedText = false
        let text = ''
        newGuests[type] += value
        newGuests.Total += value
        setGuests(newGuests)

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
        setFilterBy({ ...filterBy, guests })
        setLowerGuestsText(text)
    }

    function handleExpendedModalClick({ target }) {
        const name = target.name
        if (!searchModalExpended) setSearchModalExpended(!searchModalExpended)
        switch (name) {
            case 'search':
                setIsCalenderOpen(false)
                setIsCheckedInSelected(3)
                setIsLocationModalOpen(false)
                setIsDateModalOpen(false)
                setIsGuestsModalOpen(false)
                setSearchModal(!searchModal)
                break
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
        if (location) {
            setLocationInput(location)
            setFilterBy({ ...filterBy, location })
        }
        else {
            setLocationInput(target.value)
            setFilterBy({ ...filterBy, location: target.value })
        }
    }

    function handleDateChange(values) {
        const checkIn = new Date(values[0].$d)
        const checkOut = new Date(values[1].$d)
        const checkInMonth = checkIn.toLocaleString('en-US', { month: 'short' })
        const checkInDay = checkIn.getDate()
        console.log(checkInDay)
        const checkOutMonth = checkOut.toLocaleString('en-US', { month: 'short' })
        const checkOutDay = checkOut.getDate()
        const formattedCheckIn = `${checkInMonth} ${checkInDay}`
        const formattedCheckOut = `${checkOutMonth} ${checkOutDay}`
        setFilterBy({ ...filterBy, checkIn: checkIn, checkOut: checkOut })
        setCheckInOutDates({ checkIn: formattedCheckIn, checkOut: formattedCheckOut })
        const dayInMilliseconds = 1000 * 60 * 60 * 24
        const dateStart = values[0].$d.getTime()
        const dateEnd = values[1].$d.getTime()
        const daysCount = Math.round((dateEnd - dateStart) / (dayInMilliseconds))
    }

    function onSearch(ev) {
        ev.preventDefault()
        const { location, checkIn, checkOut, guests } = filterBy
        const queryParams = `isParams=true&location=${location}&checkIn=${checkIn}&checkOut=${checkOut}
        &adults=${guests.Adults}&infants=${guests.Infants}&children=${guests.Children}&pets=${guests.Pets}
        &total=${guests.Total}&minPrice='&maxPrice='&bedrooms='&beds='&type='&amenities=''`
        navigate(`/explore?${queryParams}`)
        handleExpendedModalClick(ev)
    }

    return (
        <header className={(stayId || isTripPage || id || isHostDashboardPage) ? 'app-header full secondary-container' : 'app-header full main-layout'}>
            <nav className='app-header-nav '>
                <div className='logo-container' onClick={() => { navigate('/explore') }}>
                    <div className='header-logo'><SiAirbnb /></div>
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
                        <button className='host-btn' onClick={() => navigate('/host/dashboard')}>{`${user ? 'Switch to hosting' : 'Avirbnb your home'}`}</button>
                        <button className='lang-btn '><BiGlobe className='bi-globe' /></button>
                    </div>

                    <button onClick={toggleUserModal} className='user-info-btn ' ><span><FaBars /></span><span >{(user) ? <img style={{ width: '33px', height: '33px', borderRadius: '50%' }} src={user.imgUrl} /> : <FaUserCircle className='fa-user-circle ' />}</span>
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
                            {(user) && <button onClick={() => navigate(`/user/${user._id}/wishlist`)} >Wishlists </button>}
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
                            {(user) && <button onClick={() => { logout().then(currUser => { navigate('/explore') }) }}>Log out</button>}
                        </div>
                    </button>
                </div>
            </nav>
            <nav className='mobile-nav'>
                <div className='search-btn-container-mobile'>
                    <FaSearch />
                </div>
                <div className={`filter-container-mobile `}>
                    <div className='location-text'>Anywhere</div>
                    <div className='lower-text-container'>
                        <span className='check-in-out-date'>
                            Anytime    *
                        </span>
                        <span className='guest-text'>
                            Add a guest
                        </span>
                    </div>
                </div>

                <div className='setting-mobile-container'>
                    <div className='setting-btn-container'>
                        <CgOptions />
                    </div>
                </div>
            </nav>
            <div className={`header-opened full  ${searchModal ? 'open' : ''}`}></div>
            <div className='mobile-filter-modal-wrapper'>
                <div className='mobile-filter-modal'>
                    <header className='mobile-filter-modal-header'>
                        <div className='exit-btn'>

                        </div>
                        {/* <div className='header-btns'>
                            <span> Stays</span>
                            <span> Experiences</span>
                        </div> */}
                    </header>
                    <div className='mobile-filters-container'>
                        <div className='mobile-locataion-filter'>

                        </div>
                        <div className='mobile-dates-filter'>

                        </div>
                        <div className='mobile-guests-filter'>

                        </div>
                    </div>
                </div>
            </div>
            <div className={`filter-modal ${searchModal ? 'open' : ''} ${searchModalExpended ? 'expended' : ''}`}>
                <div className='filter-modal-left-btns' >
                    <span name='location' onClick={() => { setLocationInput('') }} className={`clear-value-btn input ${locationInput ? 'shown' : ''}`}><IoCloseSharp /></span>
                    <button name='location' onClick={(ev) => handleExpendedModalClick(ev)} className={`inner-btns-container left ${isLocationModalOpen ? 'selected' : ''}`} ><span className='upper-text'>Where
                    </span>
                        <input
                            ref={inputRef}
                            name='location'
                            type='text'
                            placeholder="Search destinations"
                            value={locationInput}
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
                                    <RangePicker format="MMM D" open={isCalenderOpen}
                                        popupClassName='header-calender-dropdown' className='header-calender'
                                        onChange={(values) => handleDateChange(values)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='filter-modal-middle-btns '  >
                    <div className={`inner-btns-container middle `}>
                        <div className='inner-btn-wrapper middle'>
                            <span name={'checkIn'} className={`clear-value-btn checkIn ${checkInOutDates.checkIn && isCheckedInSelected === 1 ? 'shown' : ''}`}
                                onClick={() => setCheckInOutDates({ checkIn: 'flexible', checkOut: 'flexible' })} ><IoCloseSharp /></span>
                            <button className={`date-btn right ${isCheckedInSelected === 1 ? 'selected' : ''}`} name='checkIn' onClick={(ev) => handleExpendedModalClick(ev)} >
                                <span name='date' className='upper-text'>
                                    Check in
                                </span>
                                <span name='date' className='lower-text'>{`${checkInOutDates.checkIn !== 'flexible' ? checkInOutDates.checkIn : 'Add dates'}`}</span> </button>
                            <span>
                                <span className='border-between-middle'></span>
                            </span>
                            <span name={'checkOut'} className={`clear-value-btn checkOut ${checkInOutDates.checkOut && isCheckedInSelected === 2 ? 'shown' : ''}`}
                                onClick={() => setCheckInOutDates({ checkIn: 'flexible', checkOut: 'flexible' })} ><IoCloseSharp /></span>
                            <button className={`date-btn left ${isCheckedInSelected === 2 ? 'selected' : ''}`} name='checkOut' onClick={(ev) => handleExpendedModalClick(ev)}>
                                <span className='upper-text'>
                                    Check out
                                </span>
                                <span className='lower-text'>{`${checkInOutDates.checkOut !== 'flexible' ? checkInOutDates.checkOut : 'Add dates'}`}</span> </button>
                            <span className='border-between-right'></span>
                        </div>
                    </div>
                </div>
                <div className='filter-modal-right-btns'>
                    <span name='guests' onClick={() => setLowerGuestsText('Add guests')} className={`clear-value-btn guests ${lowerGuestsText === 'Add guests' ? '' : 'shown'}`}>
                        <IoCloseSharp />
                    </span>
                    <div className={`inner-btn-wrapper ${isGuestsModalOpen ? 'selected' : ''}`}>
                        <button className={`inner-btns-container right`} name='guests' onClick={(ev) => handleExpendedModalClick(ev)}>
                            <span className='upper-text'>
                                Who
                            </span>
                            <span className='lower-text'>{lowerGuestsText}</span></button>
                        <button name='search' className={`search-btn ${searchModalExpended ? 'expended' : ''}`} onClick={(ev) => onSearch(ev)} >
                            <FaSearch className='fa-search' color='white' /> {searchModalExpended ? <span>Search </span> : ''}</button>
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
            {(!isTripPage && !id) && <div className={`labels-container ${(isHostDashboardPage) ? 'hidden' : ''}`}>
            </div>}
        </header >
    )
}
