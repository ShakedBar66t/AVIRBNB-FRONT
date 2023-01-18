import { useNavigate } from "react-router-dom"

export function StayPreview({stay}){

    const navigate = useNavigate()

    return <article className="stay-preview" onClick={()=>{navigate(`/stay/${stay._id}`)}}>
        <img className="stay-preview-img" src={stay.imgUrls[0]} alt="" />
        <button className="like-btn"></button>
        {stay.name}
    </article>
}