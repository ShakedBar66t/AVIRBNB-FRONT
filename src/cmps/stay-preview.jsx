import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { useSelector } from "react-redux";
import { stayService } from "../services/stay.service";
import { utilService } from "../services/util.service";

export function StayPreview({ stay, onToggleLike }) {
    const navigate = useNavigate()
    const [heartColor, setHeartColor] = useState('rgba($color: $clr7, $alpha: 0.7)')
    const [isLikedByUser, setIsLikedByUser] = useState(false)
    const [currImgUrlIdx, setCurrImgUrlIdx] = useState(0)
    const user = useSelector(storeState => storeState.userModule.user)

    function PrevDateStr() {
        const day = 1000 * 60 * 60 * 24
        const startingDate = Date.now() + (utilService.getRandomIntInclusive(0, 14) * day)
        const startingMonth = utilService.getMonthName(new Date(startingDate))
        const startingDay = new Date(startingDate).getDate()
        const endDate = startingDate + day * 5
        const endingMonth = utilService.getMonthName(new Date(endDate))
        const endingDay = new Date(endDate).getDate()
        return <p className="prev-date">{`${startingMonth} ${startingDay}- ${(startingMonth === endingMonth) ? '' : endingMonth} ${endingDay} `}</p>
    }

    function checkIfLikedByUser() {
        const indexOfuser = stay.likedByUsers.findIndex(currUser => currUser._id === user?._id)
        if (indexOfuser > -1) {
            return 'liked'
        }
        else {
            return 'unliked'
        }
    }

    return <article className="stay-preview"
        onClick={() => { navigate(`/explore/${stay._id}`) }}>

        <div className="prev-carousel" >
            {stay.imgUrls.map(imgUrl => {
                return <img className="stay-preview-img" src={imgUrl} alt="" style={{ transform: `translateX(-${currImgUrlIdx * 100}%)` }} />
            })}
        </div>

        <button className={`like-btn clear-btn ${checkIfLikedByUser()}`}> <FaHeart /></button>
        <button className="like-btn clear-btn" onClick={(ev) => { onToggleLike(ev, stay).then((ans) => setIsLikedByUser(prev => !prev)) }}
        ><FaRegHeart className="reg-heart-fa" /></button>


        {(currImgUrlIdx > 0) && <button className="img-preview-paging-btns prev-img-preview-btn clear-btn" onClick={(ev) => {
            ev.stopPropagation()
            setCurrImgUrlIdx(prev => prev - 1)
        }}>
            <AiOutlineLeft /></button>}

        {(currImgUrlIdx < stay.imgUrls.length - 1) &&
            <button className="img-preview-paging-btns next-img-preview-btn clear-btn" onClick={(ev) => {
                ev.stopPropagation()
                setCurrImgUrlIdx(prev => prev + 1)
            }}><AiOutlineRight /></button>}

        <div className="curr-img-indication flex">
            {stay.imgUrls.map((imgurl, idx) => {
                const dotClr = (currImgUrlIdx === idx) ? "white" : "rgba(255, 255, 255,0.7)"
                return <div key={imgurl + idx} style={{ color: dotClr }}>.</div>
            })}
        </div>

        <div onClick={() => { navigate(`/explore/${stay._id}`) }} >
            <div className="prev-loc-rate">
                <p className="prev-loc">{stay.loc.city + ', ' + stay.loc.country}</p>
                <p className="stay-prev-rating">
                    <span className="fa-solid star" style={{ fontSize: "12px" }}>
                    </span>{" " + stayService.getAvrStayRating(stay.reviews)}
                </p>
            </div >
            <p className="prev-host-name">{"Hosted by " + (stay.host.fullname.slice(0, stay.host.fullname.indexOf(' ')))}</p>
            <PrevDateStr />
            <p className="prev-price">{'$' + stay.price + ' night'}</p>
        </div>
    </article>
}


