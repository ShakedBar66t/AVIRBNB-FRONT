import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service"
import { FaBeer } from 'react-icons/fa'

export function StayDetails() {
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
        <section className="stay-details">
            <div className="stay-header">
                <h1>Name :{stay.name}</h1>
                <div className="stay-header-links">
                    <div className="review-totals">
                        <h2>⭐️4.9·<span>20 reviews</span></h2>
                    </div>
                    <span>·</span>
                    <h2><span>New York, United States</span></h2>
                </div>
                <div className="shave-save-action">
                    <span className="share-stay">
                        <h2> <span>Share</span></h2>
                    </span>
                </div>
            </div>
            <div className="img-container">
                {stay.imgUrls.map((img, index) => {
                    return <div className={`img-details${index}`} key={index}>
                        <img src={img} className={`img-details${index}`} />
                    </div>
                })}
            </div>
        </section>


}