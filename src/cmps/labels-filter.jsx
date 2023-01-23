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
    const totalWidth = ElCarousel1?.current?.offsetWidth
    const displayedWidth = (ElCarousel?.current?.offsetWidth - 114)


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
        console.log((currentIndex * 100 ),'index', ((totalWidth-displayedWidth)- ((totalWidth-displayedWidth)%400) ))
       if((currentIndex * 100 ) === ((totalWidth-displayedWidth)- ((totalWidth-displayedWidth)%400) +400 )){
            console.log('last')
            return ((totalWidth-displayedWidth)+ 70)
       }
       else{
        console.log('notlast')
         return  (currentIndex * 100)
       }
    }


    return (<div className="carousel-container  " ref={ElCarousel}>
        <div className="carousel ">
            <div className="carousel-inner" ref={ElCarousel1} >
                {
                    stayLabels.map((label, index) => {
                        return (
                            <div key={index} className="carousel-group" style={{ transform: `translateX(-${IsLastNextClick()}px)` }}>
                            
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
  
            {(!(IsLastNextClick() === ((totalWidth-displayedWidth)+ 70))) && <div className='btn-container next'>
                <button className='next-btn' onClick={handleNext}> <BiChevronRight /></button>
              
            </div>}
        </div>
        <button className='setting-btn' onClick={handleSettingClick}> <span><CgOptions className='setting-icon' />Filters</span></button>
    </div>
    )
}
;