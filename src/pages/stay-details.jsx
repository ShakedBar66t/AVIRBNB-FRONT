import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service"
import { IoShareOutline } from 'react-icons/io5'
import { BsHeart, BsTrophy } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'
import { SlLocationPin } from 'react-icons/sl'
import { HiOutlineKey } from 'react-icons/hi'
import { MdOutlineCleaningServices } from 'react-icons/md'
import { Example } from "../cmps/date-picker"
import GoogleMap from "../cmps/google-map"
import { AppFooter } from "../cmps/app-footer"
import { GrDown, GrUp } from 'react-icons/gr'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'
import { fontWeight } from "@mui/system"
import { orderService } from "../services/order.service"
// import "antd/dist/antd"
import { DatePicker } from "antd";
import { moment } from "moment"
import { toggleLoginModal } from '../store/user.actions.js'
import createCssVarsProvider from "@mui/system/cssVars/createCssVarsProvider"
import { addOrder } from "../store/actions/order.actions"
import { useSelector } from "react-redux"
import { AppHeader } from "../cmps/app-header"
const { RangePicker } = DatePicker


export function StayDetails() {

    const stayAmenities = [ 'Cleaning products', 'Shampoo', 'Body soap', 'Hot water',
        'Shower gel', 'Hangers', 'Bed linens', 'Extra pillows and blankets', 'Room-darkening shades',
        'Ethernet connection', 'TV with standard cable', 'Crib', 'High chair', 'AC - split type ductless system',
        'Heating', 'Fire extinguisher', 'First aid kit', 'Refrigerator', 'Microwave', 'Kitchen', 'Mini fridge',
        'Freezer', 'Stove', 'Oven', 'Hot water kettle', 'Coffee maker: pour-over coffee', 'Wine glasses', 'Dining table']

        const guestsTypes = [{type:'adults',txt:'Ages 13 or above'},{type:'children',txt:'Ages 2-12'}
        ,{type:'infants',txt:'Under 2'},{type:'pets',txt:'Service animals?'}]
    const params = useParams()
    const { stayId } = params
    const [stay, setStay] = useState(null)
    const [isGuestModal, ToggleGuestModal] = useState(false)
    const [guests, setguests] = useState({ adults: 1, children: 0, infants: 0, pets: 0, total: 1 })
    const [dates, setDates] = useState([])
    const [order,setOrder] = useState(orderService.getEmptyOrder())
    const user = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        loadStay()
        
    }, [])

    async function loadStay() {
        const stay = await stayService.getById(stayId)
        setStay(stay)
    }

    console.log('datesssssss!!!!!', dates)
    console.log(stay)
    // console.log(stay.reviews[0].by.imgUrl)

    function handleGuestsInput(type, diff) {
        setguests({ ...guests, [type]: guests[type] + diff, total: guests.total + diff })
        
        
        console.log(guests)
    }

    function  ReserveOrder(){
        if(!user){
            toggleLoginModal()
            return
        }
        else{
            const newOrder = {...order,guests:guests,hostId:stay.host._id,stay:{_id:stay._id,name:stay.name,price:stay.price},buyer:{_id:user._id,fullname:user.fullname}}
            console.log('new order!!!!!!!!',newOrder)

            addOrder(newOrder).then(res=>prompt('great'))
        }
    }


    return (stay) &&
        <section className="stay-details full secondary-container">
            <AppHeader/>
            <div className="stay-header">
                <h1>Name :{stay.name}</h1>
                <div className="stay-header-links">
                    <div className="review-totals">
                        <h2><FaStar />4.9·<span>20 reviews</span></h2>
                    </div>
                    <span>·</span>
                    <h2><span>New York, United States</span></h2>
                    <div className="share-save-action">
                        <span className="share-stay">
                            <h2> <IoShareOutline /> <span>Share</span></h2>
                        </span>
                        <span className="save-stay">
                            <h2> <BsHeart /> <span>Save</span></h2>
                        </span>
                    </div>
                </div>
            </div>
            <div className="img-container">
                {stay.imgUrls.map((img, index) => {
                    return <div className={`img-details${index}`} key={index}>
                        <img src={img} className={`img-details${index}`} />
                    </div>
                })}
            </div>
            <div className="full">
                <header className="details-header full secondary-container">
                    <section className="secondary-container">
                        <nav className="details-nav">
                            <a href="#photos">Photos</a>
                            <a href="#amenities">Amenities</a>
                            <a href="#reviews">Reviews</a>
                            <a href="#map">Map</a>
                        </nav>
                        <div className="reserve-container">
                            <div className="reserve-info-container">
                                <p>${stay.price} <span>night</span></p>
                                <div className="review-totals">
                                    <FaStar />
                                    <span>{stayService.getAvrStayRating(stay.reviews)} ·</span>
                                    <a href="#reviews">{stay.reviews.length} reviews</a>
                                </div>
                            </div>
                            <button className="btn-reserve">Reserve</button>
                        </div>
                    </section>
                </header>
            </div>
            <div className="stay-info">
                <section className="content">
                    <div className="subtitle">
                        <div className="">
                            <h2> <span>{stay.type}</span> hosted by {stay.host.fullname}</h2>
                            <span>{stay.capacity} guests · 1 bathroom · 2 bedrooms </span>
                        </div>
                        <img className="host-image" src={stay.host.imgUrl} />
                    </div>
                    <div className="user-stay-info">
                        <BsTrophy />
                        <div>
                            <p>{stay.host.fullname} is a Superhost</p>
                            <p className="subtext">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore, blanditiis!</p>
                        </div>
                        <SlLocationPin />
                        <div>
                            <p>Great location</p>
                            <p className="subtext">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, asperiores!</p>
                        </div>
                        <HiOutlineKey />
                        <div>
                            <p>Great check-in experience</p>
                            <p className="subtext">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero, cum!</p>
                        </div>
                    </div>
                    <div className="air-cover">
                        <h3>
                            <span style={{ color: 'red' }}>avir</span>cover
                        </h3>
                        <p>
                            Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                        </p>
                    </div>
                    <div className="summary">
                        If the dates you wish are not available, we have other options in the same location. You can find them on my profile. My goal is for you to have your days with the most comfort i can propose. I want you to taste all the feelings in Porto, as our food, as our best places, our best pointviews. I just love to help you enjoying this beautiful city :
                    </div>
                    <div className="amenities-container">
                        <h2>What this place offers </h2>
                        <div className="stay-amenities">
                            {stay.amenities.map((amenity, index) => {
                                return <div className="amenities-list" key={index}>
                                    <div>{amenity}</div>
                                </div>
                            })}
                        </div>
                    </div>
                </section>
                <section className="reserve-modal">
                    <form >
                        <header>
                            <h4><span>{stay.price + '$ '} </span> night</h4>
                            <div className="review-totals">
                                <FaStar />
                                {/* <h2><FaStar />4.9·<span>20 reviews</span></h2> */}
                                <span>4.8 ·</span>
                                <a href="">20 reviews</a>
                            </div>
                        </header>
                        <div className="order-input">
                            <div className="date-input">
                                {/* <input type="text" /> */}
                                <RangePicker
                                    onChange={(values) => {

                                    // const value1 = moment(values[0]).format('DD-MM-YYYY')
                                  const  time1 = values[0].$d
                                   const date = new Date(time1)
                                   const day = 1000*60*60*24

                                //    const dateStart = date.getTime()
                                   const dateStart = values[0].$d.getTime()
                                   const dateEnd = values[1].$d.getTime()
                                    const daysCount = Math.round((dateEnd-dateStart)/(day))
                                    const totalPrice = daysCount*stay.price
                                    console.log('valuesss!!!!',totalPrice)
                                    setOrder({...order,totalPrice:totalPrice,startDate:values[0].$d,endDate:values[1].$d,totalNights:daysCount}) }}/>
                                    

                                   
                                
                              
                            </div>
                            <div className="guests-input">
                                <small>Guests max capacity of {stay.capacity}</small>
                                <p style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                    {(guests.adults) ? <span>{guests.adults + ' Adults'}</span> : ''}
                                    {(guests.children) ? <span>{" " + guests.children + ' Children'}</span> : ''}
                                    {(guests.infants) ? <span>{" " + guests.infants + ' Infants'}</span> : ''}
                                    {(guests.pets) ? <span>{" " + guests.pets + ' Pets'}</span> : ''}


                                </p>
                                <button className="clear-btn" type="button" onClick={() => ToggleGuestModal(prev => !prev)}>
                                    {(isGuestModal) ? <GrUp /> : <GrDown />}</button>
                            </div>

                        </div>
                        {(isGuestModal) && <div className="guests-modal">

                        {guestsTypes.map(type=>{
                                return <div className="guests-type-input" key={type.type}>
                                    <div>
                                    <p>{type.type}</p>
                                    <small>{type.txt}</small>
                                    </div>
                                    <div className="guests-type-input-value">
                                    <button type="button" className="clear-btn" disabled={!guests[type.type]} onClick={() => { handleGuestsInput(type.type, -1) }}><IoRemoveCircleOutline /></button>
                                    <span>{guests[type.type]}</span>
                                    <button type="button" className="clear-btn" disabled={guests.total === stay.capacity} onClick={() => { handleGuestsInput(type.type, 1) }}><IoAddCircleOutline /></button>
                                    </div>
                                    
                                </div>
                               })}
                    
                        </div>}

                        <button className="action-btn" type="button" onClick={()=>{
                            ReserveOrder()
                        }}>
                             Reserve 
                        </button>

                        <div style={{ display: 'flex', gap: '25px', flexDirection: 'column' }}>
                            <p style={{ textAlign: 'center' }}>You won't be charged yet</p>
                            <div className="prices">
                                <p>${stay.price} x {order.totalNights} nights</p>
                                <p>0$</p>
                                <p>Cleaning fee</p>
                                <p>0$</p>
                                <p>Service fee</p>
                                <p>0$</p>
                            </div>
                            <div className="total">
                                <p>Total</p>
                                <p>{order.totalPrice}$</p>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
            <section className="reviews">
                <header>
                    <div className="review-totals">
                        <FaStar />
                        <span>{stayService.getAvrStayRating(stay.reviews)} ·</span>
                        <a href="">{stay.reviews.length} reviews </a>
                    </div>
                </header>
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
                            <p className="review-text text0">
                                {review.txt}
                            </p>
                        </div>
                    })}
                </main>
            </section>
            <section className="map">
                <h2>Where you'll be</h2>
                <h3>{stay.loc.city}, {stay.loc.country}</h3>
                <GoogleMap />


            </section>
            <AppFooter />
        </section >

}