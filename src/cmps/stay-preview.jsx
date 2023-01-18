import { useNavigate } from "react-router-dom"
import { useState } from "react";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";




export function StayPreview({ stay }) {
    const navigate = useNavigate()
    const [isHover, setIsHover] = useState(false)
    const [currImgUrlIdx, setCurrImgUrlIdx] = useState(0)

    return <article className="stay-preview"
        onClick={() => { navigate(`/stay/${stay._id}`) }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
    >
        <img className="stay-preview-img" src={stay.imgUrls[currImgUrlIdx]} alt="" />
        <button className="like-btn clear-btn"><FaHeart className="heart-fa" /></button>
        <button className="like-btn clear-btn"><FaRegHeart className="reg-heart-fa" /></button>

        {(isHover && currImgUrlIdx > 0) && <button className="img-preview-paging-btns prev-img-preview-btn clear-btn" onClick={(ev) => {
            ev.stopPropagation()
            setCurrImgUrlIdx(prev => prev - 1)
        }}>
            <FaAngleLeft /></button>}

        {(isHover && currImgUrlIdx < stay.imgUrls.length - 1) &&
            <button className="img-preview-paging-btns next-img-preview-btn clear-btn" onClick={(ev) => {
                ev.stopPropagation()
                setCurrImgUrlIdx(prev => prev + 1)
            }}><FaAngleRight /></button>}

        <div className="curr-img-indication flex">
            {stay.imgUrls.map((imgurl, idx) => {
                const dotClr = (currImgUrlIdx === idx) ? "white" : "rgba(255, 255, 255,0.7)"
                return <div key={imgurl + idx} style={{ fontSize: "60px", color: dotClr }}>.</div>
            })}
        </div>
        <div>
            <div>
                <p className="prev-loc">{stay.loc.city + ', ' + stay.loc.country}</p>
                <p> <span className="fa-regular envelope"></span></p>
                <p> <span className="fa-solid house"></span></p>

            </div>
        </div>
        {stay.name}
    </article>
}
//       "loc": {
//         "country": "Portugal",
//         "countryCode": "PT",
//         "city": "Porto",
//         "address": "17 Kombo st",
//         "lat": -8.61308,
//         "lng": 41.1413
//       },