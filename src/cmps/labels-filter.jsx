import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { CgOptions } from "react-icons/cg";

import { TOGGLE_FILTER_MODAL } from '../store/reducers/stay.reducer'
import { TOGGLE_IS_SHADOW } from '../store/reducers/user.reducer'
import { Carousel } from 'bootstrap';

export function LabelsFilter() {
    const dispatch = useDispatch()
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayCount, setDisplayCount] = useState(4);
    const [displayNext, setDisplayNext] = useState(true);
    const ElCarousel = useRef(null)
    const ElCarousel1 = useRef(null)

    const stayLabels = [
        { name: 'Play', src: 'play' },{ name: 'Iconic cities', src: 'iconic' },  { name: 'Caves', src: 'cave' },
         { name: 'By the lake', src: 'lake' },{ name: 'Riads', src: 'riads' }, { name: 'Amazing views', src: 'views' }, { name: 'Castles', src: 'castle' },
        { name: ' Amzaing pools', src: 'pool' }, { name: 'Mansions', src: 'mansions' }, { name: 'Historical homes', src: 'historical-homes' },
        { name: 'Luxe', src: 'luxe' }, { name: 'Ski-in/out', src: 'ski' },   { name: 'OMG!', src: 'omg' },
        { name: 'Grand pianos', src: 'piano' }, { name: 'Houseboats', src: 'houseboats' }, { name: 'Mountains', src: 'top' }, { name: 'Islands', src: 'islands' },
        { name: 'New', src: 'new' }, { name: 'Trending', src: 'trending' }, { name: 'Cabins', src: 'cabin' }, { name: 'Boats', src: 'boats' },
        { name: 'Tiny homes', src: 'tiny' }, { name: 'Tropical', src: 'tropical' }
        , { name: 'Bed & breakfasts', src: 'bnb' }, { name: 'Design', src: 'design' }
        , { name: 'Beachfront', src: 'beach' }, { name: 'Farms', src: 'farm' }
        , { name: 'Arctic', src: 'arctic' },
        ,  ]

        console.log(currentIndex, 'index!!!')
        // window.innerWidth
        console.log('cont', ElCarousel?.current?.offsetWidth - 114)
        console.log('total', ElCarousel1?.current?.offsetWidth )
        console.log('transi', currentIndex*100 )
        console.log('gay?', (ElCarousel1?.current?.offsetWidth - (ElCarousel?.current?.offsetWidth - 114)  )% 400)


    const handleNext = () => {
        if (currentIndex + displayCount < stayLabels.length) {
            setCurrentIndex(currentIndex + displayCount);
        }
        // console.log(currentIndex > stayLabels.length)
       
    }

    const handlePrev = () => {
        if (currentIndex - displayCount >= 0) {
            setCurrentIndex(currentIndex - displayCount);
        }
    }

    function handleSettingClick() {
        dispatch({ type: TOGGLE_FILTER_MODAL })
        dispatch({ type: TOGGLE_IS_SHADOW })
    }

    function IsLastNextClick(){

       if(ElCarousel1?.current?.offsetWidth- (ElCarousel?.current?.offsetWidth - 114)){
        
       }
        // if( ((ElCarousel1?.current?.offsetWidth - (ElCarousel?.current?.offsetWidth - 114)  )/ 400 ) % 1===0){
        //     console.log('notlast',((ElCarousel1?.current?.offsetWidth - (ElCarousel?.current?.offsetWidth - 114)  )/ 400 ) % 1)
        //     return (currentIndex * 100)
    
        //     return ((currentIndex * 100) + ((ElCarousel1?.current?.offsetWidth - (ElCarousel?.current?.offsetWidth - 114)  )% 400 ))
        // }

        //     console.log('last',((currentIndex-1) * 100) + ((ElCarousel1?.current?.offsetWidth - (ElCarousel?.current?.offsetWidth - 114)  )% 400 ))
        //     return (((currentIndex-1) * 100) + ((ElCarousel1?.current?.offsetWidth - (ElCarousel?.current?.offsetWidth - 114)  )% 400 ))

        // }

    }
    // function IsLastNextClick(){
    //     // console.log(Math.floor(ElCarousel1?.current?.offsetWidth/100),'index',(currentIndex+1))
    //     if( ((ElCarousel1?.current?.offsetWidth - (ElCarousel?.current?.offsetWidth - 114)  )/ 400 ) % 1===0){
    //         console.log('notlast',((ElCarousel1?.current?.offsetWidth - (ElCarousel?.current?.offsetWidth - 114)  )/ 400 ) % 1)
    //         return (currentIndex * 100)
    //     // if(currentIndex === Math.floor(ElCarousel1?.current?.offsetWidth/100)){
    //         // console.log('last',((currentIndex * 100) + ((ElCarousel1?.current?.offsetWidth - (ElCarousel?.current?.offsetWidth - 114)  )% 400 )))
    //         return ((currentIndex * 100) + ((ElCarousel1?.current?.offsetWidth - (ElCarousel?.current?.offsetWidth - 114)  )% 400 ))
    //     }
    //     // if(currentIndex === Math.floor(ElCarousel1?.current?.offsetWidth/100)){
    //     //     console.log('last',((currentIndex * 100) + ((ElCarousel1?.current?.offsetWidth - (ElCarousel?.current?.offsetWidth - 114)  )% 400 )))
    //     //     return ((currentIndex * 100) + ((ElCarousel1?.current?.offsetWidth - (ElCarousel?.current?.offsetWidth - 114)  )% 400 ))
    //     // }
    //     else{
    //         console.log('last',((currentIndex-1) * 100) + ((ElCarousel1?.current?.offsetWidth - (ElCarousel?.current?.offsetWidth - 114)  )% 400 ))
    //         return (((currentIndex-1) * 100) + ((ElCarousel1?.current?.offsetWidth - (ElCarousel?.current?.offsetWidth - 114)  )% 400 ))
    //         // console.log('not last',(currentIndex * 100))
    //         // return (currentIndex * 100)
    //     }
    // //    if ((ElCarousel1?.current?.offsetWidth - (ElCarousel?.current?.offsetWidth - 114)  )% 400 ){
    // //     return 
    // //     }
    // }

    return (<div className="carousel-container  " ref={ElCarousel}>
        <div className="carousel ">
            <div className="carousel-inner" ref={ElCarousel1} >
                {
                    stayLabels.map((label, index) => {
                        return (
                            <div key={index} className="carousel-group" style={{ transform: `translateX(-${IsLastNextClick()}px)` }}>
                            {/* <div key={index} className="carousel-group" style={{ transform: `translateX(-${currentIndex * 100}px)` }}> */}
                                <div className="label-filter-btn" >
                                    <img src={require(`../assets/labels-logos/${label.src}.jpg`)} />
                                    <span>{label.name}</span>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            
            {(currentIndex) ?  <div className={'btn-container prev '}>
                <button className={`prev-btn ${!currentIndex ? 'hidden' : ''}`} onClick={handlePrev}> <BiChevronLeft /></button>
            </div> : ''}
  
            {(!(currentIndex >= stayLabels.length - displayCount * 3)) && <div className='btn-container next'>
                <button className='next-btn' onClick={handleNext}> <BiChevronRight /></button>
              
            </div>}
        </div>
        <button className='setting-btn' onClick={handleSettingClick}> <span><CgOptions className='setting-icon' />Filters</span></button>
    </div>
    )
}


























// import React, { useState } from 'react';
// import { useSelector, useDispatch } from "react-redux"
// import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
// import { CgOptions } from "react-icons/cg";

// import { TOGGLE_FILTER_MODAL } from '../store/reducers/stay.reducer'
// import { TOGGLE_IS_SHADOW } from '../store/reducers/user.reducer'


// export function LabelsFilter() {
//     const dispatch = useDispatch()
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [displayCount, setDisplayCount] = useState(4);
//     const [displayNext, setDisplayNext] = useState(true);
//     // let carouselSpin = currentIndex * 100
//     // const carouselRef = useRef(null)

//     console.log(window.innerWidth)

//     const stayLabels = [
//         { name: 'Play', src: 'play' },{ name: 'Iconic cities', src: 'iconic' },  { name: 'Caves', src: 'cave' },
//          { name: 'By the lake', src: 'lake' },{ name: 'Riads', src: 'riads' }, { name: 'Amazing views', src: 'views' }, { name: 'Castles', src: 'castle' },
//         { name: ' Amzaing pools', src: 'pool' }, { name: 'Mansions', src: 'mansions' }, { name: 'Historical homes', src: 'historical-homes' },
//         { name: 'Luxe', src: 'luxe' }, { name: 'Ski-in/out', src: 'ski' },   { name: 'OMG!', src: 'omg' },
//         { name: 'Grand pianos', src: 'piano' }, { name: 'Houseboats', src: 'houseboats' }, { name: 'Mountains', src: 'top' }, { name: 'Islands', src: 'islands' },
//         { name: 'New', src: 'new' }, { name: 'Trending', src: 'trending' }, { name: 'Cabins', src: 'cabin' }, { name: 'Boats', src: 'boats' },
//         { name: 'Tiny homes', src: 'tiny' }, { name: 'Tropical', src: 'tropical' }
//         , { name: 'Bed & breakfasts', src: 'bnb' }, { name: 'Design', src: 'design' }
//         , { name: 'Beachfront', src: 'beach' }, { name: 'Farms', src: 'farm' }
//         , { name: 'Arctic', src: 'arctic' },
//         ,  ]

//     const handleNext = () => {
//         if (currentIndex + displayCount < stayLabels.length) {
//             setCurrentIndex(currentIndex + displayCount);
//         }
//         console.log(currentIndex > stayLabels.length)
//         console.log(currentIndex, stayLabels.length)
//     }

//     const handlePrev = () => {
//         if (currentIndex - displayCount >= 0) {
//             setCurrentIndex(currentIndex - displayCount);
//         }
//     }

//     function handleSettingClick() {
//         dispatch({ type: TOGGLE_FILTER_MODAL })
//         dispatch({ type: TOGGLE_IS_SHADOW })
//     }

//     return (<div className="carousel-container  ">
//     {/* return (<div className="carousel-container stay-index-layout "> */}

//         <div className="carousel ">
//             <div className="carousel-inner">
//                 {
//                     stayLabels.map((label, index) => {
//                         return (
//                             <div key={index} className="carousel-group" style={{ transform: `translateX(-${currentIndex * 100}px)` }}>
//                                 <div className="label-filter-btn">
//                                     <img src={require(`../assets/labels-logos/${label.src}.jpg`)} />
//                                     <span>{label.name}</span>
//                                 </div>
//                             </div>
//                         );
//                     })
//                 }
//             </div>
            
//             {/* <div className={'btn-container prev '}>
//                 <button className={`prev-btn ${!currentIndex ? 'hidden' : ''}`} onClick={handlePrev}> <BiChevronLeft /></button>
//             </div> */}
//             {(currentIndex) ?  <div className={'btn-container prev '}>
//                 <button className={`prev-btn ${!currentIndex ? 'hidden' : ''}`} onClick={handlePrev}> <BiChevronLeft /></button>
//             </div> : ''}
//             {/* <div className={'btn-container prev '}>
//                 <button className={`prev-btn ${!currentIndex ? 'hidden' : ''}`} onClick={handlePrev}> <BiChevronLeft /></button>
//             </div> */}

//             {/* {(currentIndex) && <div className={`'btn-container prev'`}>
//                 <button className='prev-btn' onClick={handlePrev}> <BiChevronLeft /></button>
//                 <button className={`prev-btn  ${!currentIndex ? 'hidden' : ''}`} onClick={handlePrev}> <BiChevronLeft /></button>
//             </div>
//             } */}
//             {(!(currentIndex >= stayLabels.length - displayCount * 3)) && <div className='btn-container next'>
//                 <button className='next-btn' onClick={handleNext}> <BiChevronRight /></button>
//                  {/* <button className={`next-btn ${(currentIndex >= stayLabels.length - displayCount * 3) ? 'hidden' : ''}`} onClick={handleNext}> <BiChevronRight /></button> */}
//             </div>}
//         </div>
//         <button className='setting-btn' onClick={handleSettingClick}> <span><CgOptions className='setting-icon' />Filters</span></button>
//     </div>
//     );
// };




// // import React, { useState } from 'react';
// // import { useSelector, useDispatch } from "react-redux"
// // import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
// // import { CgOptions } from "react-icons/cg";

// // import { TOGGLE_FILTER_MODAL } from '../store/reducers/stay.reducer'
// // import { TOGGLE_IS_SHADOW } from '../store/reducers/user.reducer'


// // export function LabelsFilter() {
// //     const dispatch = useDispatch()
// //     const [currentIndex, setCurrentIndex] = useState(0);
// //     const [displayCount, setDisplayCount] = useState(4);
// //     const [displayNext, setDisplayNext] = useState(true);

// //     const stayLabels = [
// //         { name: 'By the lake', src: 'lake' }, { name: 'Amazing views', src: 'views' }, { name: 'Castles', src: 'castle' },
// //         { name: ' Amzaing pools', src: 'pool' }, { name: 'Mansions', src: 'mansions' }, { name: 'Historical homes', src: 'historical-homes' },
// //         { name: 'Ski-in/out', src: 'ski' }, { name: 'Riads', src: 'riads' }, { name: 'Luxe', src: 'luxe' }, { name: 'OMG!', src: 'omg' },
// //         { name: 'Grand pianos', src: 'piano' }, { name: 'Houseboats', src: 'houseboats' }, { name: 'Mountains', src: 'top' }, { name: 'Islands', src: 'islands' },
// //         { name: 'New', src: 'new' }, { name: 'Trending', src: 'trending' }, { name: 'Cabins', src: 'cabin' }, { name: 'Boats', src: 'boats' },
// //         { name: 'Tiny homes', src: 'tiny' }, { name: 'Tropical', src: 'tropical' }
// //         , { name: 'Bed & breakfasts', src: 'bnb' }, { name: 'Design', src: 'design' }
// //         , { name: 'Beachfront', src: 'beach' }, { name: 'Farms', src: 'farm' }
// //         , { name: 'Arctic', src: 'arctic' }, { name: 'Caves', src: 'cave' }
// //         , { name: 'Play', src: 'play' }, { name: 'Iconic cities', src: 'iconic' }]

// //     const handleNext = () => {
// //         if (currentIndex + displayCount < stayLabels.length) {
// //             setCurrentIndex(currentIndex + displayCount);
// //         }
// //         console.log(currentIndex > stayLabels.length)
// //         console.log(currentIndex, stayLabels.length)
// //     }

// //     const handlePrev = () => {
// //         if (currentIndex - displayCount >= 0) {
// //             setCurrentIndex(currentIndex - displayCount);
// //         }
// //     }

// //     function handleSettingClick() {
// //         dispatch({ type: TOGGLE_FILTER_MODAL })
// //         dispatch({ type: TOGGLE_IS_SHADOW })
// //     }

// //     return (<div className="carousel-container  ">
// //     {/* return (<div className="carousel-container stay-index-layout "> */}

// //         <div className="carousel ">
// //             <div className="carousel-inner">
// //                 {
// //                     stayLabels.map((label, index) => {
// //                         return (
// //                             <div key={index} className="carousel-group" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
// //                                 <div className="label-filter-btn">
// //                                     <img src={require(`../assets/labels-logos/${label.src}.jpg`)} />
// //                                     <span>{label.name}</span>
// //                                 </div>
// //                             </div>
// //                         );
// //                     })
// //                 }
// //             </div>
            
// //             <div className={'btn-container prev '}>
// //                 <button className={`prev-btn ${!currentIndex ? 'hidden' : ''}`} onClick={handlePrev}> <BiChevronLeft /></button>
// //             </div>

// //             {/* {(currentIndex) && <div className={`'btn-container prev'`}>
// //                 <button className='prev-btn' onClick={handlePrev}> <BiChevronLeft /></button>
// //                 <button className={`prev-btn  ${!currentIndex ? 'hidden' : ''}`} onClick={handlePrev}> <BiChevronLeft /></button>
// //             </div>
// //             } */}
// //             {(!(currentIndex >= stayLabels.length - displayCount * 3)) && <div className='btn-container next'>
// //                 <button className='next-btn' onClick={handleNext}> <BiChevronRight /></button>
// //                  {/* <button className={`next-btn ${(currentIndex >= stayLabels.length - displayCount * 3) ? 'hidden' : ''}`} onClick={handleNext}> <BiChevronRight /></button> */}
// //             </div>}
// //         </div>
// //         <button className='setting-btn' onClick={handleSettingClick}> <span><CgOptions className='setting-icon' />Filters</span></button>
// //     </div>
// //     );
// // };