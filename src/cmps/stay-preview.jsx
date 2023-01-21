// import { useNavigate } from "react-router-dom"
// import { useState } from "react";

// import { FaRegHeart, FaHeart } from "react-icons/fa";
// import { FaAngleLeft } from "react-icons/fa";
// import { FaAngleRight } from "react-icons/fa";

// import { stayService } from "../services/stay.service";
// import { utilService } from "../services/util.service";




// export function StayPreview({ stay }) {
//     const navigate = useNavigate()
  
//     const [currImgUrlIdx, setCurrImgUrlIdx] = useState(0)

//     function getDateString(){

//     }

  
//     function PrevDateStr(){
//         const day = 1000*60*60*24
//       const startingDate =  Date.now() + (utilService.getRandomIntInclusive(0,14) * day)
//       const startingMonth = utilService.getMonthName(new Date(startingDate))
//       const startingDay = new Date(startingDate).getDate()
//     //   new Date(sentAt).getDate()

//     const endDate = startingDate + day*5
//     const endingMonth = utilService.getMonthName(new Date(endDate))
//     const endingDay = new Date(endDate).getDate()


//         return <p className="prev-date">{`${startingMonth} ${startingDay}- ${(startingMonth===endingMonth)? '': endingMonth} ${endingDay} `}</p>
//       console.log(startingDay)
//     //   const strDate = 
//     }

//     return <article className="stay-preview"
//         onClick={() => { navigate(`/explore/${stay._id}`) }}  >
//             <div className="img-carousel" style={{ transform: `translateX(-${currImgUrlIdx * 100}%)` }}>
//                 {stay.imgUrls.map(imgUrl=>{
//                     console.log('imgurl',imgUrl)
//                     return <img className="stay-preview-img" src={imgUrl} alt="" />
//                 })}
//             </div>
//         {/* <img className="stay-preview-img" src={stay.imgUrls[currImgUrlIdx]} alt="" /> */}
//         <button className="like-btn clear-btn"><FaHeart className="heart-fa" /></button>
//         <button className="like-btn clear-btn"><FaRegHeart className="reg-heart-fa" /></button>

//         {( currImgUrlIdx > 0) && <button className="img-preview-paging-btns prev-img-preview-btn clear-btn" onClick={(ev) => {
//             ev.stopPropagation()
//             setCurrImgUrlIdx(prev => prev - 1)
//         }}>
//             <FaAngleLeft /></button>}

//         {( currImgUrlIdx < stay.imgUrls.length - 1) &&
//             <button className="img-preview-paging-btns next-img-preview-btn clear-btn" onClick={(ev) => {
//                 ev.stopPropagation()
//                 setCurrImgUrlIdx(prev => prev + 1)
//             }}><FaAngleRight /></button>}

//         <div className="curr-img-indication flex">
//             {stay.imgUrls.map((imgurl, idx) => {
//                 const dotClr = (currImgUrlIdx === idx) ? "white" : "rgba(255, 255, 255,0.7)"
//                 return <div key={imgurl + idx} style={{ fontSize: "50px", color: dotClr }}>.</div>
//             })}
//         </div>
//         <div>
//             <div className="prev-loc-rate">
//                 <p className="prev-loc">{stay.loc.city + ', ' + stay.loc.country}</p>
//                 <p className="stay-prev-rating">
//                     <span className="fa-solid star" style={{ fontSize: "12px" }}>
//                     </span>{" " + stayService.getAvrStayRating(stay.reviews)}
//                 </p>
//             </div>
//             <p className="prev-host-name">{"Hosted by " + (stay.host.fullname.slice(0,stay.host.fullname.indexOf(' ')))}</p>
//             <PrevDateStr />
//             <p className="prev-price">{'$'+ stay.price}</p>



//         </div>
       
//     </article>
// }

import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

import { stayService } from "../services/stay.service";
import { utilService } from "../services/util.service";
import { PreviewImgCarousel } from "./img-carousel";
import { useSelector } from "react-redux";




export function StayPreview({ stay,onToggleLike }) {
    const navigate = useNavigate()
    const [heartColor,setHeartColor] = useState('rgba($color: $clr7, $alpha: 0.7)')
    const [isLikedByUser,setIsLikedByUser] = useState(false)
    const [currImgUrlIdx, setCurrImgUrlIdx] = useState(0)
    const user = useSelector(storeState => storeState.userModule.user)

    function getDateString(){

    }

    useEffect(()=>{

    },[heartColor])

    // console.log('is liked,!!!!!!!!!!!!!!!!!!!!',isLikedByUser)

  
    function PrevDateStr(){
        const day = 1000*60*60*24
      const startingDate =  Date.now() + (utilService.getRandomIntInclusive(0,14) * day)
      const startingMonth = utilService.getMonthName(new Date(startingDate))
      const startingDay = new Date(startingDate).getDate()
    //   new Date(sentAt).getDate()

    const endDate = startingDate + day*5
    const endingMonth = utilService.getMonthName(new Date(endDate))
    const endingDay = new Date(endDate).getDate()


        return <p className="prev-date">{`${startingMonth} ${startingDay}- ${(startingMonth===endingMonth)? '': endingMonth} ${endingDay} `}</p>
      console.log(startingDay)
    //   const strDate = 
    }

    function checkIfLikedByUser(){
        const indexOfuser = stay.likedByUsers.findIndex(currUser=>currUser._id===user?._id)
        if(indexOfuser > -1 ){
            // setHeartColor('#ff385c')
            return 'liked'
            
        }
        else{
            // setHeartColor('rgba($color: $clr7, $alpha: 0.7)')
            return 'unliked'
        }
    }

    return <article className="stay-preview"
        // onClick={() => { navigate(`/explore/${stay._id}`) }}
    
    >
        <PreviewImgCarousel stay={stay}/>
        {/* <img className="stay-preview-img" src={stay.imgUrls[currImgUrlIdx]} alt="" /> */}

        <button className={`like-btn clear-btn ${checkIfLikedByUser()}`}> <FaHeart /></button>
        <button className="like-btn clear-btn" onClick={()=>{onToggleLike(stay).then((ans)=>{
            console.log('is liked,',ans)
            // checkIfLikedByUser()
            // console.log(isLikedByUser=== true && !!user)
            setIsLikedByUser(prev=>!prev)
        })}}
        ><FaRegHeart className="reg-heart-fa" /></button>

        {/* {( currImgUrlIdx > 0) && <button className="img-preview-paging-btns prev-img-preview-btn clear-btn" onClick={(ev) => {
            ev.stopPropagation()
            setCurrImgUrlIdx(prev => prev - 1)
        }}>
            <FaAngleLeft /></button>}

        {( currImgUrlIdx < stay.imgUrls.length - 1) &&
            <button className="img-preview-paging-btns next-img-preview-btn clear-btn" onClick={(ev) => {
                ev.stopPropagation()
                setCurrImgUrlIdx(prev => prev + 1)
            }}><FaAngleRight /></button>} */}

        {/* <div className="curr-img-indication flex">
            {stay.imgUrls.map((imgurl, idx) => {
                const dotClr = (currImgUrlIdx === idx) ? "white" : "rgba(255, 255, 255,0.7)"
                return <div key={imgurl + idx} style={{ fontSize: "50px", color: dotClr }}>.</div>
            })}
        </div> */}

        <div onClick={() => { navigate(`/explore/${stay._id}`) }} >
            <div className="prev-loc-rate">
                <p className="prev-loc">{stay.loc.city + ', ' + stay.loc.country}</p>
                <p className="stay-prev-rating">
                    <span className="fa-solid star" style={{ fontSize: "12px" }}>
                    </span>{" " + stayService.getAvrStayRating(stay.reviews)}
                </p>
            </div >
            <p className="prev-host-name">{"Hosted by " + (stay.host.fullname.slice(0,stay.host.fullname.indexOf(' ')))}</p>
            <PrevDateStr />
            <p className="prev-price">{'$'+ stay.price}</p>


        </div>
       
    </article>
}

// import { useNavigate } from "react-router-dom"
// import { useState } from "react";

// import { FaRegHeart, FaHeart } from "react-icons/fa";
// import { FaAngleLeft } from "react-icons/fa";
// import { FaAngleRight } from "react-icons/fa";

// import { stayService } from "../services/stay.service";
// import { utilService } from "../services/util.service";




// export function StayPreview({ stay }) {
//     const navigate = useNavigate()
  
//     const [currImgUrlIdx, setCurrImgUrlIdx] = useState(0)

//     function getDateString(){

//     }

  
//     function PrevDateStr(){
//         const day = 1000*60*60*24
//       const startingDate =  Date.now() + (utilService.getRandomIntInclusive(0,14) * day)
//       const startingMonth = utilService.getMonthName(new Date(startingDate))
//       const startingDay = new Date(startingDate).getDate()
//     //   new Date(sentAt).getDate()

//     const endDate = startingDate + day*5
//     const endingMonth = utilService.getMonthName(new Date(endDate))
//     const endingDay = new Date(endDate).getDate()


//         return <p className="prev-date">{`${startingMonth} ${startingDay}- ${(startingMonth===endingMonth)? '': endingMonth} ${endingDay} `}</p>
//       console.log(startingDay)
//     //   const strDate = 
//     }

//     return <article className="stay-preview"
//         onClick={() => { navigate(`/explore/${stay._id}`) }}
    
//     >
//         <img className="stay-preview-img" src={stay.imgUrls[currImgUrlIdx]} alt="" />
//         <button className="like-btn clear-btn"><FaHeart className="heart-fa" /></button>
//         <button className="like-btn clear-btn"><FaRegHeart className="reg-heart-fa" /></button>

//         {( currImgUrlIdx > 0) && <button className="img-preview-paging-btns prev-img-preview-btn clear-btn" onClick={(ev) => {
//             ev.stopPropagation()
//             setCurrImgUrlIdx(prev => prev - 1)
//         }}>
//             <FaAngleLeft /></button>}

//         {( currImgUrlIdx < stay.imgUrls.length - 1) &&
//             <button className="img-preview-paging-btns next-img-preview-btn clear-btn" onClick={(ev) => {
//                 ev.stopPropagation()
//                 setCurrImgUrlIdx(prev => prev + 1)
//             }}><FaAngleRight /></button>}

//         <div className="curr-img-indication flex">
//             {stay.imgUrls.map((imgurl, idx) => {
//                 const dotClr = (currImgUrlIdx === idx) ? "white" : "rgba(255, 255, 255,0.7)"
//                 return <div key={imgurl + idx} style={{ fontSize: "50px", color: dotClr }}>.</div>
//             })}
//         </div>
//         <div>
//             <div className="prev-loc-rate">
//                 <p className="prev-loc">{stay.loc.city + ', ' + stay.loc.country}</p>
//                 <p className="stay-prev-rating">
//                     <span className="fa-solid star" style={{ fontSize: "12px" }}>
//                     </span>{" " + stayService.getAvrStayRating(stay.reviews)}
//                 </p>
//             </div>
//             <p className="prev-host-name">{"Hosted by " + (stay.host.fullname.slice(0,stay.host.fullname.indexOf(' ')))}</p>
//             <PrevDateStr />
//             <p className="prev-price">{'$'+ stay.price}</p>






//         </div>
       
//     </article>
// }

