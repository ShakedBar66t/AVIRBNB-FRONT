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


export function StayDetails() {

    const stayAmenities = [{ name: 'Cleaning products', icon: <MdOutlineCleaningServices /> }, 'Shampoo', 'Body soap', 'Hot water',
        'Shower gel', 'Hangers', 'Bed linens', 'Extra pillows and blankets', 'Room-darkening shades',
        'Ethernet connection', 'TV with standard cable', 'Crib', 'High chair', 'AC - split type ductless system',
        'Heating', 'Fire extinguisher', 'First aid kit', 'Refrigerator', 'Microwave', 'Kitchen', 'Mini fridge',
        'Freezer', 'Stove', 'Oven', 'Hot water kettle', 'Coffee maker: pour-over coffee', 'Wine glasses', 'Dining table']


    const params = useParams()
    const { stayId } = params
    const [stay, setStay] = useState(null)

    useEffect(() => {
        loadStay()
    }, [])

    async function loadStay() {
        const stay = await stayService.getById(stayId)
        setStay(stay)
    }

    console.log(stay)
    // console.log(stay.reviews[0].by.imgUrl)


    return (stay) &&
        <section className="stay-details secondary-container">
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
                <header className="sticky details-header full secondary-container">
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
                            <span>4 guests · 1 bathroom · 2 bedrooms </span>
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
                    <form>
                        <header>
                            <h4><span>{stay.price}$</span> night</h4>
                            <div className="review-totals">
                                <FaStar />
                                {/* <h2><FaStar />4.9·<span>20 reviews</span></h2> */}
                                <span>4.8 ·</span>
                                <a href="">20 reviews</a>
                            </div>
                        </header>
                        <div className="picker-container">
                            <div className="check-in picker">
                                <label htmlFor="check-in">CHECK-IN</label>
                                <input type="text" placeholder="MM/DD/YYYY" />
                            </div>
                            <section className="date-picker-container">
                                <div className="el-date-editor">
                                    <Example />
                                </div>
                            </section>
                        </div>
                        <div className="btn-container">
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="cell"></div>
                            <div className="content">
                                <button className="action-btn">
                                    <span>Reserve</span>
                                </button>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '25px', flexDirection: 'column' }}>
                            <p style={{ textAlign: 'center' }}>You won't be charged yet</p>
                            <div className="prices">
                                <p>${stay.price} x 0 nights</p>
                                <p>0$</p>
                                <p>Cleaning fee</p>
                                <p>0$</p>
                                <p>Service fee</p>
                                <p>0$</p>
                            </div>
                            <div className="total">
                                <p>Total</p>
                                <p>0$</p>
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
        </section >


}