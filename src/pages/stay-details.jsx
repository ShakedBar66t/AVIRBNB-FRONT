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
            <div className="stay-info">
                <h1>Name :{stay.name}</h1>
                <h2>⭐️4.9·<span>20 reviews</span>·<span>New York, United States</span></h2>
            </div>
            <div className="img-container">
                {stay.imgUrls.map((img, index) => {
                    return <div className={`img-details${index}`} key={index}>
                        {console.log(img)}
                        {console.log(index)}
                        <img src={img} />
                    </div>
                })}
            </div>
        </section>


}