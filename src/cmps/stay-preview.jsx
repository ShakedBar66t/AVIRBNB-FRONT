import { useNavigate } from "react-router-dom"

export function StayPreview({stay}){

    const navigate = useNavigate()

    return <article className="stay-preview" onClick={()=>{navigate(`/stay/${stay._id}`)}}>
        {stay.name}
    </article>
}