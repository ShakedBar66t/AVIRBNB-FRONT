import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from "react-redux"
import { BiChevronRight, BiChevronLeft } from "react-icons/bi"
import { CgOptions } from "react-icons/cg"

import { TOGGLE_FILTER_MODAL } from '../store/reducers/stay.reducer'
import { TOGGLE_IS_SHADOW } from '../store/reducers/user.reducer'
import { useNavigate } from 'react-router-dom'

export function LabelsFilter() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [displayCount, setDisplayCount] = useState(4)
    const ElCarousel = useRef(null)
    const ElCarousel1 = useRef(null)
    const totalWidth = ElCarousel1?.current?.offsetWidth
    const displayedWidth = (ElCarousel?.current?.offsetWidth - 114)
    const [isLabelsFilterSticky, setIsLabelsFilterSticky] = useState(false)
    const stayLabels = [
        { name: 'Play', src: 'play' }, { name: 'Iconic cities', src: 'iconic' }, { name: 'Caves', src: 'cave' },
        { name: 'By the lake', src: 'lake' }, { name: 'Riads', src: 'riads' }, { name: 'Amazing views', src: 'views' }, { name: 'Castles', src: 'castle' },
        { name: ' Amzaing pools', src: 'pool' }, { name: 'Mansions', src: 'mansions' }, { name: 'Boats', src: 'boats' }, { name: 'Beachfront', src: 'beach' }, { name: 'Cabins', src: 'cabin' }, { name: 'Historical homes', src: 'historical-homes' },
        { name: 'Luxe', src: 'luxe' }, { name: 'Ski-in/out', src: 'ski' }, { name: 'OMG!', src: 'omg' },
        { name: 'Grand pianos', src: 'piano' }, { name: 'Houseboats', src: 'houseboats' }, { name: 'Mountains', src: 'top' }, { name: 'Islands', src: 'islands' },
        { name: 'New', src: 'new' }, { name: 'Trending', src: 'trending' },
        { name: 'Tiny homes', src: 'tiny' }, { name: 'Tropical', src: 'tropical' }
        , { name: 'Bed & breakfasts', src: 'bnb' }, { name: 'Design', src: 'design' }
        , { name: 'Farms', src: 'farm' }
        , { name: 'Arctic', src: 'arctic' },
        ,]

    function handleNext() {
        if (currentIndex + displayCount < stayLabels.length) {
            setCurrentIndex(currentIndex + displayCount)
        }
    }

    function handlePrev() {
        if (currentIndex - displayCount >= 0) {
            setCurrentIndex(currentIndex - displayCount)
        }
    }

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 25) {
                setIsLabelsFilterSticky(false)
            } else {
                setIsLabelsFilterSticky(true)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            // console.log(isLabelsFilterSticky)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    function handleSettingClick() {
        dispatch({ type: TOGGLE_FILTER_MODAL })
        dispatch({ type: TOGGLE_IS_SHADOW })
    }
    function handleLabelClick(ev) {
        console.log(ev.target.name)
        ev.preventDefault()
        const queryParams = `isParams=true&minPrice=''&maxPrice=''&type=${ev.target.name}&bedrooms=''&beds=''&bathrooms=''
        &amenities=''&location=flexible&checkIn=flexible&checkOut=flexible&adults=''&infants=''&children=''&pets=''`
        navigate(`/explore?${queryParams}`)
    }

    function IsLastNextClick() {
        if ((currentIndex * 100) === ((totalWidth - displayedWidth) - ((totalWidth - displayedWidth) % 400) + 400)) {
            return ((totalWidth - displayedWidth) + 70)
        }
        else {
            return (currentIndex * 100)
        }
    }

    return (
        <div className='fixed-main-wrapper'>
            <div className={`carousel-container-wrapper full `}>
                <div className={`carousel-container main-layout  `} ref={ElCarousel}>
                    <div className="carousel ">
                        <div className="carousel-inner" ref={ElCarousel1} >
                            {
                                stayLabels.map((label, index) => {
                                    return (
                                        <div name={label.name} key={index} className="carousel-group" style={{ transform: `translateX(-${IsLastNextClick()}px)` }}>

                                            <div name={label.name} className="label-filter-btn"
                                                onClick={(ev) => handleLabelClick(ev)} >
                                                <img name={label.name} src={require(`../assets/labels-logos/${label.src}.jpg`)} />
                                                <span name={label.name}>{label.name}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {(currentIndex) ? <div className={'btn-container prev '}>
                            <button className={`prev-btn ${!currentIndex ? 'hidden' : ''}`} onClick={handlePrev}> <BiChevronLeft /></button>
                        </div> : ''}

                        {(!(IsLastNextClick() === ((totalWidth - displayedWidth) + 70))) && <div className='btn-container next'>
                            <button className='next-btn' onClick={handleNext}> <BiChevronRight /></button>

                        </div>}
                    </div>
                    <button className='setting-btn' onClick={handleSettingClick}> <span><CgOptions className='setting-icon' />Filters</span></button>
                </div>
            </div>
        </div>
    )
}
