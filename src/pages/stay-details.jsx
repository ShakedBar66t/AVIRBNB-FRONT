import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { stayService } from "../services/stay.service"

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
            <h1>Name :{stay.name}</h1>
            <h2>⭐️4.9·<span>20 reviews</span>·#ADD LOCATION#</h2>
            <div className="img-container">
                <img className="stay-details-img" src={stay.imgUrls[0]} />
                <img className="stay-details-img" src={stay.imgUrls[1]} />
                <img className="stay-details-img" src={stay.imgUrls[2]} />
                <img className="stay-details-img" src={stay.imgUrls[3]} />
                <img className="stay-details-img" src={stay.imgUrls[4]} />
                <img className="stay-details-img" src={stay.imgUrls[5]} />
            </div>
        </section>


}