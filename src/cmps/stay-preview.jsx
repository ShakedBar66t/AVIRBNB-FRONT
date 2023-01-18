import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { FaBeer } from "@react-icons/all-files/fa/FaBeer";
// import { FaHeart } from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaAccessibleIcon } from "react-icons/fa";

// import { FaHeart } from "react-icons/fa";

export function StayPreview({ stay }) {
    const [isHover,setIsHover] = useState(false)
    const navigate = useNavigate()

    return <article className="stay-preview"
     onClick={() => { navigate(`/stay/${stay._id}`) }}
    //  onMouseOver={()=>setIsHover(true)} onMouseLeave={}
     >

        <img className="stay-preview-img" src={stay.imgUrls[0]} alt="" />
        <button className="like-btn"><FaHeart className="heart-fa" /></button>
        <button className="like-btn"><FaRegHeart className="reg-heart-fa" /></button>
        {stay.name}
    </article>
}