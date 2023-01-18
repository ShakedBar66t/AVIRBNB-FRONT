import { useNavigate } from "react-router-dom"
import { useState } from "react";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaAccessibleIcon } from "react-icons/fa";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/fa";


import { FavoriteBorderTwoTone } from '@mui/icons-material';


export function StayPreview({ stay }) {
    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(false)
    const [currImgUrlIdx, setCurrImgUrlIdx] = useState(0)

    return <article className="stay-preview"
        onClick={() => { navigate(`/stay/${stay._id}`) }}
        onMouseLeave={() => setIsHover(false)}
    >
        <button className="like-btn clear-btn"><FaRegHeart className="reg-heart-fa" /></button>
        {(isHover && currImgUrlIdx > 0) && <button className="img-preview-paging-btns prev-img-preview-btn clear-btn" onClick={(ev)=>{
            ev.stopPropagation()
            setCurrImgUrlIdx(prev=>prev-1)
        }}>
            <FaAngleLeft /></button>}
        {(isHover  && currImgUrlIdx < stay.imgUrls.length-1) &&
         <button className="img-preview-paging-btns next-img-preview-btn clear-btn" onClick={(ev)=>{
            ev.stopPropagation()
            setCurrImgUrlIdx(prev=>prev+1)}}><FaAngleRight /></button>}
        <div className="curr-img-indication flex">
            {stay.imgUrls.map((imgurl,idx)=>{
                const dotClr = (currImgUrlIdx===idx)? "white": "rgba(255, 255, 255,0.7)"
                return <div style={{ fontSize:"60px",color:dotClr}}>.</div>
            })}
        </div>
        {stay.name}
    </article>
}