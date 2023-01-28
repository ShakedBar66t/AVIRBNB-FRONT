import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service"
import { IoShareOutline, IoShieldCheckmarkSharp } from 'react-icons/io5'
import { BsHeart, BsTrophy } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'
import { SlLocationPin } from 'react-icons/sl'
import { HiOutlineKey } from 'react-icons/hi'
import { GoDash, GoPlus } from "react-icons/go"
import { GrDown, GrUp } from 'react-icons/gr'
import GoogleMap from "../cmps/google-map"
import { AppFooter } from "../cmps/app-footer"
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'
import { orderService } from "../services/order.service"
import { DatePicker } from "antd"
import { toggleLoginModal } from '../store/user.actions.js'
import { addOrder } from "../store/actions/order.actions"
import { useSelector } from "react-redux"
import { AppHeader } from "../cmps/app-header"
import { AiFillFlag } from "react-icons/ai"
import { ColorForButton } from "../cmps/btn-color"
import { LongTxt } from "../cmps/long-txt"
const { RangePicker } = DatePicker


export function StayDetails() {


    const params = useParams()
    const { stayId } = params
    const [stay, setStay] = useState(null)
    const [isGuestModal, ToggleGuestModal] = useState(false)
    const [guests, setGuests] = useState({ Adults: 1, Children: 0, Infants: 0, Pets: 0, total: 1 })
    const [dates, setDates] = useState([])
    const [order, setOrder] = useState(orderService.getEmptyOrder())
    const user = useSelector(storeState => storeState.userModule.user)
    const [lowerGuestsText, setLowerGuestsText] = useState('Add guests')

    useEffect(() => {
        loadStay()

    }, [])

    async function loadStay() {
        const stay = await stayService.getById(stayId)
        setStay(stay)
    }

    const guestsTypes = [
        { type: 'Adults', txt: 'Ages 13 or above' }, { type: 'Children', txt: 'Ages 2-12' }
        , { type: 'Infants', txt: 'Under 2' }, { type: 'Pets', txt: 'Bringing a service animal?' }]

    const achievements = [
        {
            icon: <BsTrophy />,
            title: "Superhost",
            description: "Our property has been designated as a Superhost, which is a recognition given to hosts who provide exceptional service and experience to their guests."
        },
        {
            icon: <SlLocationPin />,
            title: "Great location",
            description: "Our guests can expect a great location, with easy access to local amenities and attractions."
        },
        {
            icon: <HiOutlineKey />,
            title: "Great check-in experience",
            description: "We pride ourselves on providing a seamless check-in experience, ensuring that our guests have everything they need to feel at home during their stay."
        }
    ]

    const stayAmenitiesImages = [
        { name: 'TV', image: require('../assets/amenities-logos/TV.png') },
        { name: 'Internet', image: require('../assets/amenities-logos/Internet.png') },
        { name: 'Wifi', image: require('../assets/amenities-logos/Wifi.png') },
        { name: 'Air conditioning', image: require('../assets/amenities-logos/Air conditioning.png') },
        { name: 'Pool', image: require('../assets/amenities-logos/Pool.png') },
        { name: 'Kitchen', image: require('../assets/amenities-logos/Kitchen.png') },
        { name: 'Doorman', image: require('../assets/amenities-logos/Doorman.png') },
        { name: 'Gym', image: require('../assets/amenities-logos/Gym.png') },
        { name: 'Elevator', image: require('../assets/amenities-logos/Elevator.png') },
        { name: 'Heating', image: require('../assets/amenities-logos/Heating.png') },
        { name: 'Washer', image: require('../assets/amenities-logos/Washer.png') },
        { name: 'Dryer', image: require('../assets/amenities-logos/Dryer.png') },
        { name: 'Smoke detector', image: require('../assets/amenities-logos/Smoke detector.png') },
        { name: 'First aid kit', image: require('../assets/amenities-logos/First aid kit.png') },
        { name: 'Fire extinguisher', image: require('../assets/amenities-logos/Fire extinguisher.png') },
        { name: 'Essentials', image: require('../assets/amenities-logos/Essentials.png') },
        { name: 'Shampoo', image: require('../assets/amenities-logos/Shampoo.png') },
        { name: '24-hour check-in', image: require('../assets/amenities-logos/24-hour check-in.png') },
        { name: 'Hangers', image: require('../assets/amenities-logos/Hangers.png') },
        { name: 'Hair dryer', image: require('../assets/amenities-logos/Hair dryer.png') },
        { name: 'Iron', image: require('../assets/amenities-logos/Iron.png') },
        { name: 'Laptop friendly workspace', image: require('../assets/amenities-logos/Laptop friendly workspace.png') },
        { name: 'Self check-in', image: require('../assets/amenities-logos/Self check-in.png') },
        { name: 'Hot water', image: require('../assets/amenities-logos/Hot water.png') },
        { name: 'Bed linens', image: require('../assets/amenities-logos/Bed linens.png') },
        { name: 'Beachfront', image: require('../assets/amenities-logos/Beachfront.png') },
        { name: 'Microwave', image: require('../assets/amenities-logos/Microwave.png') },
        { name: 'Coffee maker', image: require('../assets/amenities-logos/Coffee maker.png') },
        { name: 'Refrigerator', image: require('../assets/amenities-logos/Refrigerator.png') },
        { name: 'Dishes and silverware', image: require('../assets/amenities-logos/Dishes and silverware.png') },
        { name: 'Cooking basics', image: require('../assets/amenities-logos/Cooking basics.png') },
        { name: 'Stove', image: require('../assets/amenities-logos/Stove.png') },
        { name: 'Babysitter recommendations', image: require('../assets/amenities-logos/Babysitter recommendations.png') },
        { name: 'Step-free access', image: require('../assets/amenities-logos/Step-free access.png') },
        { name: 'Luggage dropoff allowed', image: require('../assets/amenities-logos/Luggage dropoff allowed.png') },
        { name: 'Indoor fireplace', image: require('../assets/amenities-logos/Indoor fireplace.png') },
        { name: 'Extra pillows and blankets', image: require('../assets/amenities-logos/Extra pillows and blankets.png') },
        { name: 'Wide entryway', image: require('../assets/amenities-logos/Wide entryway.png') },
        { name: 'Keypad', image: require('../assets/amenities-logos/Keypad.png') },
        { name: 'Pocket wifi', image: require('../assets/amenities-logos/Pocket wifi.png') },
        { name: 'Ethernet connection', image: require('../assets/amenities-logos/Ethernet connection.png') },
        { name: 'Private bathroom', image: require('../assets/amenities-logos/Private bathroom.png') },
        { name: 'How water kettle', image: require('../assets/amenities-logos/How water kettle.png') },
        { name: 'Fireplace guards', image: require('../assets/amenities-logos/Fireplace guards.png') },
        { name: 'Building staff', image: require('../assets/amenities-logos/Building staff.png') },
        { name: 'Accessible-height toilet', image: require('../assets/amenities-logos/Accessible-height toilet.png') },
        { name: 'Room-darkening shades', image: require('../assets/amenities-logos/Room-darkening shades.png') },
    ]


    function getStayAmenitiesWithImages(stayAmenitiesList, stayAmenitiesWithImages) {
        const amenitiesWithImages = []
        stayAmenitiesList.forEach(amenity => {
            const amenityWithImage = stayAmenitiesWithImages.find(a => a.name === amenity)
            if (amenityWithImage) {
                amenitiesWithImages.push(amenityWithImage)
            }
        })
        return amenitiesWithImages
    }

    function handleGuestsInput(type, value) {
        let newGuests = { ...guests }
        let addedText = false
        let text = ''
        newGuests[type] += value
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
        setLowerGuestsText(text)
    }

    if (stay) {
        var avgRate = stayService.getAvrStayRating(stay.reviews)
        var amenitiesWithImages = getStayAmenitiesWithImages(stay.amenities, stayAmenitiesImages)
    }

    function reserveOrder() {
        if (!user) {
            toggleLoginModal()
            return
        }
        else {
            const newOrder = {
                ...order, guests: guests, reservedAt: Date.now(),
                host: { _id: stay.host._id, fullname: stay.host.fullname },
                stay: { _id: stay._id, name: stay.name, price: stay.price, imgUrl: stay.imgUrls[0], loc: stay.loc, avrRate: stay.avrRate },
                buyer: { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
            }
            console.log('new order!!!!!!!!', newOrder)
            addOrder(newOrder).then(res => prompt('great'))
        }
    }


    return (stay) && <div className="details">
        <AppHeader />
        <section className="stay-details full secondary-container">
            <div className="stay-header">
                <h1>{stay.name}</h1>
                <div className="stay-header-links">
                    <div className="stay-summary">
                        <div className="review-totals">
                            <h2><FaStar />  {avgRate} ·  <span>{stay.reviews.length} reviews  </span></h2>
                        </div>
                        <span>    </span>
                        <h2><span className="loc">  ·  {stay.loc.city}, {stay.loc.country}</span></h2>
                    </div>
                    <div className="share-save-action">
                        <span className="share-stay">
                            <h2 className="share-btn">
                                <div className="share-icon"><IoShareOutline /></div>
                                <span className="share-txt">Share</span>
                            </h2>
                        </span>
                        <span className="save-stay">
                            <h2 className="save-btn">
                                <div className="save-icon"><BsHeart /></div>
                                <span className="save-txt">Save</span>
                            </h2>
                        </span>
                    </div>
                </div>
            </div>
            <div className="img-container">
                {stay.imgUrls.map((img, index) => {
                    return <img src={img} key={index} />
                })}
            </div>
            <div className="stay-info">
                <section className="avir-content">
                    <div className="subtitle">
                        <div>
                            <h2 className="subtitle-title"> <span>{stay.type}</span> hosted by {stay.host.fullname}</h2>
                            <span>{stay.capacity} guests · {stay.bathrooms} bathrooms · {stay.bedrooms} bedrooms </span>
                        </div>
                        <img className="host-image" src={stay.host.pictureUrl} />
                    </div>
                    <div className="user-stay-info">
                        {achievements.map((achievement) => (
                            <div className="user-achievement">
                                <div className="achievement-icon">
                                    {achievement.icon}
                                </div>
                                <div>
                                    <h1>{achievement.title}</h1>
                                    <p className="subtext">{achievement.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="air-cover">
                        <h3>
                            <span style={{ color: '#ff385c' }}>avir</span>cover
                        </h3>
                        <p style={{ marginBottom: '8px', lineHeight: '20px' }}>
                            Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                        </p>
                    </div>
                    <div className="summary">
                        <span className={'long-text-details'}>

                            <LongTxt txt={stay.summary} length={200} />
                        </span>
                    </div>
                    <div className="amenities-container">
                        <h2>What this place offers </h2>
                        <div className="stay-amenities">
                            {amenitiesWithImages.map((amenity, index) => {
                                return <div className="amenities-list" key={index}>
                                    <img src={amenity.image} />
                                    <h1 className="amenity-name">{amenity.name}</h1>
                                </div>
                            })}
                        </div>
                    </div>
                </section>
                <section className="reserve-modal">
                    <div className="sticky-modal">
                        <form >
                            <header className='sticky-modal-header'>
                                <h4><span>{'$ ' + stay.price} </span> night</h4>
                                <div className="review-totals">
                                    <FaStar />
                                    {/* <h2><FaStar />4.9·<span>20 reviews</span></h2> */}
                                    <span>{avgRate} ·</span>
                                    {/* <span>{stayService.getAvrStayRating(stay.reviews) === NaN ? stayService.getAvrStayRating(stay.reviews) : 'No reviews yet'} ·</span> */}
                                    <a href="">{stay.reviews.length} reviews</a>
                                </div>
                            </header>
                            <div className="order-input">
                                <div className="date-input-header"><span>CHECK-IN</span><span>CHECKOUT</span></div>
                                <div className="date-input">
                                    {/* <input type="text" /> */}
                                    <RangePicker popupClassName='details-range-picker'
                                        onChange={(values) => {

                                            // const value1 = moment(values[0]).format('DD-MM-YYYY')
                                            const time1 = values[0].$d
                                            const date = new Date(time1)
                                            const day = 1000 * 60 * 60 * 24

                                            //    const dateStart = date.getTime()
                                            const dateStart = values[0].$d.getTime()
                                            const dateEnd = values[1].$d.getTime()
                                            const daysCount = Math.round((dateEnd - dateStart) / (day))
                                            const totalPrice = daysCount * stay.price
                                            console.log('valuesss!!!!', totalPrice)
                                            setOrder({ ...order, totalPrice: totalPrice, startDate: values[0].$d, endDate: values[1].$d, totalNights: daysCount })
                                        }} />
                                </div>
                                <div className="guests-input">
                                    <small>GUESTS</small>
                                    <p>
                                        {lowerGuestsText}

                                    </p>
                                    <button className="guests-btn " type="button" onClick={() => ToggleGuestModal(prev => !prev)}>
                                        {(isGuestModal) ? <GrUp /> : <GrDown />}</button>
                                </div>

                            </div>
                            {(isGuestModal) && <div className="guests-modal">

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

                            </div>}
                            <ColorForButton txt={'Reserve'}
                                reserveOrder={reserveOrder} />

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <p style={{ textAlign: 'center', fontWeight: 300, marginBottom: 12 }}>You won't be charged yet</p>
                                <div className="prices">
                                    <p>${stay.price} x {order.totalNights} nights</p>
                                    <p>${stay.price * order.totalNights}</p>
                                    <p>Taxes</p>
                                    <p>${4 * order.totalNights}</p>
                                </div>
                                <div className="total">
                                    <p>Total</p>
                                    <p>{order.totalPrice}$</p>
                                </div>
                            </div>
                        </form >
                        <div className="stay-report">
                            <h2>
                                <div className="report-icon">
                                    <AiFillFlag />
                                </div>
                                Report this listing
                            </h2>
                        </div>
                    </div >
                </section >
            </div >
            <section className="reviews">
                <header>
                    <div className="review-totals">
                        <FaStar />
                        <span>{avgRate === 0 ? 'No reviews yet' : avgRate } ·</span>
                        <a href="">{stay.reviews.length} reviews </a>
                    </div >
                </header >
                <div className="rating">


                    <p>Cleanliness</p>
                    <span className="progress-container">
                        <progress max="5" value="4.966666666666667">
                        </progress>
                        5.0
                    </span>
                    <p>Check-in</p>
                    <span className="progress-container">
                        <progress max="5" value="4.466666666666667">
                        </progress>
                        4.5
                    </span>
                    <p>Location</p>
                    <span className="progress-container">
                        <progress max="5" value="4.333333333333333">
                        </progress>
                        4.3
                    </span>
                    <p>Communication</p>
                    <span className="progress-container">
                        <progress max="5" value="3.6666666666666665">
                        </progress>
                        3.7
                    </span>
                    <p>Accuracy</p>
                    <span className="progress-container">
                        <progress max="5" value="4.266666666666667">
                        </progress>
                        4.3
                    </span>
                    <p>Value</p>
                    <span className="progress-container">
                        <progress max="5" value="3.9333333333333336">
                        </progress>
                        3.9
                    </span>
                </div>
                <main className="review-container">
                    {stay.reviews.map((review, index) => {
                        return <div className="review-preview" key={index}>
                            <div className="mini-user-details">
                                <img src={review.by.imgUrl} />
                                <p>{review.by.fullname}</p>
                                <span>Rated: {review.rate} <FaStar /></span>
                            </div>
                            <section className="review-text">
                                <LongTxt txt={review.txt} length={100} />
                            </section>
                        </div>
                    })}
                </main>
            </section >
            <section className="map">
                <h2>Where you'll be</h2>
                <GoogleMap />
                <h3>{stay.loc.city}, {stay.loc.country}</h3>
            </section>
            <div className="host-info" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
                <div className="host-details">
                    <div>
                        {stay.host.imgUrl ?
                            <img className="host-image" src={stay.host.imgUrl} /> : ''
                        }
                    </div>
                    <div>
                        <h1>Hosted by {stay.host.fullname}</h1>
                        <h2>{stay.host.location}</h2>
                    </div>
                </div>
                <div className="host-rating">
                    <div className="host-reviews">
                        <div>
                            <FaStar />
                        </div>
                        <div style={{ marginLeft: '8px' }}>
                            {stay.reviews.length} reviews
                        </div>
                    </div>
                    <div className="host-verified" >
                        {stay.host.isSuperhost ? <div ><IoShieldCheckmarkSharp /><span style={{ marginLeft: '8px' }}>Identity verified</span></div> : ""}
                    </div>
                </div>
                <div className="host-about">
                    <h3>{stay.host.about}</h3>
                </div>
            </div >
            <AppFooter />
        </section >

    </div >
}