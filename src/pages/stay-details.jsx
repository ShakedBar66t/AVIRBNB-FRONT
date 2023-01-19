import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service"
import { IoShareOutline } from 'react-icons/io5'
import { BsHeart, BsTrophy } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'
import { SlLocationPin } from 'react-icons/sl'
import { HiOutlineKey } from 'react-icons/hi'
import { MdOutlineCleaningServices } from 'react-icons/md'


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
                    <div className="amenities-container" id="amenities">
                        <h2>What this place offers </h2>
                        <div className="stay-amenities">
                        </div>
                    </div>
                    <section className="reverse-modal">
                        <form>
                            <header>
                                <h4><span>{stay.price}$</span> night</h4>
                                <div className="review-totals">
                                    <FaStar/>
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
                                        
                                    </div>
                                </section>
                            </div>
                        </form>
                    </section>
                </section>
            </div>
        </section >


}