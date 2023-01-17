import { useParams } from "react-router-dom"

export function StayDetails(){
    const params = useParams()
    const {stayId} = params

    return <section className="stay-details">
        {stayId} hello
        </section>
}