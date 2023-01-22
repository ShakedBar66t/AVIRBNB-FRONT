import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { CgOptions } from "react-icons/cg";

import { TOGGLE_FILTER_MODAL } from '../store/reducers/stay.reducer'
import { TOGGLE_IS_SHADOW } from '../store/reducers/user.reducer'


export function LabelsFilter() {
    const dispatch = useDispatch()
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayCount, setDisplayCount] = useState(4);
    const [displayNext, setDisplayNext] = useState(true);

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

    const handleNext = () => {
        if (currentIndex + displayCount < stayLabels.length) {
            setCurrentIndex(currentIndex + displayCount);
        }
        console.log(currentIndex > stayLabels.length)
        console.log(currentIndex, stayLabels.length)
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

    return (<div className="carousel-container  ">
    {/* return (<div className="carousel-container stay-index-layout "> */}

        <div className="carousel ">
            <div className="carousel-inner">
                {
                    stayLabels.map((label, index) => {
                        return (
                            <div key={index} className="carousel-group" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                <div className="label-filter-btn">
                                    <img src={require(`../assets/labels-logos/${label.src}.jpg`)} />
                                    <span>{label.name}</span>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
<<<<<<< HEAD
            <div className='btn-container prev '>
                <button className={`prev-btn ${!currentIndex ? 'hidden' : ''}`} onClick={handlePrev}> <BiChevronLeft /></button>
            </div>
            <div className='btn-container next'>
                <button className={`next-btn ${(currentIndex >= stayLabels.length - displayCount * 3) ? 'hidden' : ''}`} onClick={handleNext}> <BiChevronRight /></button>
            </div>
=======
            
            {/* <div className={'btn-container prev '}>
                <button className={`prev-btn ${!currentIndex ? 'hidden' : ''}`} onClick={handlePrev}> <BiChevronLeft /></button>
            </div> */}
            {(currentIndex) ?  <div className={'btn-container prev '}>
                <button className={`prev-btn ${!currentIndex ? 'hidden' : ''}`} onClick={handlePrev}> <BiChevronLeft /></button>
            </div> : ''}
            {/* <div className={'btn-container prev '}>
                <button className={`prev-btn ${!currentIndex ? 'hidden' : ''}`} onClick={handlePrev}> <BiChevronLeft /></button>
            </div> */}

            {/* {(currentIndex) && <div className={`'btn-container prev'`}>
                <button className='prev-btn' onClick={handlePrev}> <BiChevronLeft /></button>
                <button className={`prev-btn  ${!currentIndex ? 'hidden' : ''}`} onClick={handlePrev}> <BiChevronLeft /></button>
            </div>
            } */}
            {(!(currentIndex >= stayLabels.length - displayCount * 3)) && <div className='btn-container next'>
                <button className='next-btn' onClick={handleNext}> <BiChevronRight /></button>
                 {/* <button className={`next-btn ${(currentIndex >= stayLabels.length - displayCount * 3) ? 'hidden' : ''}`} onClick={handleNext}> <BiChevronRight /></button> */}
            </div>}
>>>>>>> e3c8dba07bbd1e9cbb744284c1056ab5bdbc8e7b
        </div>
        <button className='setting-btn' onClick={handleSettingClick}> <span><CgOptions className='setting-icon' />Filters</span></button>
    </div>
    );
};




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

//     const stayLabels = [
//         { name: 'By the lake', src: 'lake' }, { name: 'Amazing views', src: 'views' }, { name: 'Castles', src: 'castle' },
//         { name: ' Amzaing pools', src: 'pool' }, { name: 'Mansions', src: 'mansions' }, { name: 'Historical homes', src: 'historical-homes' },
//         { name: 'Ski-in/out', src: 'ski' }, { name: 'Riads', src: 'riads' }, { name: 'Luxe', src: 'luxe' }, { name: 'OMG!', src: 'omg' },
//         { name: 'Grand pianos', src: 'piano' }, { name: 'Houseboats', src: 'houseboats' }, { name: 'Mountains', src: 'top' }, { name: 'Islands', src: 'islands' },
//         { name: 'New', src: 'new' }, { name: 'Trending', src: 'trending' }, { name: 'Cabins', src: 'cabin' }, { name: 'Boats', src: 'boats' },
//         { name: 'Tiny homes', src: 'tiny' }, { name: 'Tropical', src: 'tropical' }
//         , { name: 'Bed & breakfasts', src: 'bnb' }, { name: 'Design', src: 'design' }
//         , { name: 'Beachfront', src: 'beach' }, { name: 'Farms', src: 'farm' }
//         , { name: 'Arctic', src: 'arctic' }, { name: 'Caves', src: 'cave' }
//         , { name: 'Play', src: 'play' }, { name: 'Iconic cities', src: 'iconic' }]

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
//                             <div key={index} className="carousel-group" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
//                                 <div className="label-filter-btn">
//                                     <img src={require(`../assets/labels-logos/${label.src}.jpg`)} />
//                                     <span>{label.name}</span>
//                                 </div>
//                             </div>
//                         );
//                     })
//                 }
//             </div>
            
//             <div className={'btn-container prev '}>
//                 <button className={`prev-btn ${!currentIndex ? 'hidden' : ''}`} onClick={handlePrev}> <BiChevronLeft /></button>
//             </div>

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