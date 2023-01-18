import React, { useState } from 'react';

export function LabelsFilter() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayCount, setDisplayCount] = useState(7);
    const stayLabels = [
        { name: 'By the lake', src: 'lake' }, { name: 'Amazing views', src: 'views' }, { name: 'Castles', src: 'castle' },
        { name: ' Amzaing pools', src: 'pool' }, { name: 'Mansions', src: 'mansions' }, { name: 'Historical homes', src: 'historical-homes' },
        { name: 'Ski-in/out', src: 'ski' }, { name: 'Riads', src: 'riads' }, { name: 'Luxe', src: 'luxe' }, { name: 'OMG!', src: 'omg' },
        { name: 'Grand pianos', src: 'piano' }, { name: 'Houseboats', src: 'houseboats' }, { name: 'Top of the world', src: 'top' }, { name: 'Islands', src: 'islands' },
        { name: 'New', src: 'new' }, { name: 'Trending', src: 'trending' }, { name: 'Cabins', src: 'cabin' }, { name: 'Boats', src: 'boats' },
        { name: 'Tiny homes', src: 'tiny' }, { name: 'Tropical', src: 'tropical' }
        , { name: 'Bed & breakfasts', src: 'bnb' }, { name: 'Design', src: 'design' }
        , { name: 'Beachfront', src: 'beach' }, { name: 'Farms', src: 'farm' }
        , { name: 'Arctic', src: 'arctic' }, { name: 'Caves', src: 'cave' }
        , { name: 'Play', src: 'play' }, { name: 'Iconic cities', src: 'iconic' }]

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

    return (
        <div className="carousel stay-index-layout">
            <button className="prev-btn" onClick={handlePrev}>prev</button>
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
            <button className="next-btn" onClick={handleNext}>Next</button>
        </div>
    );
};


        // <div className="carousel">
        //     <button className="prev-btn" onClick={handlePrevClick}>Prev</button>
        //     <div className="carousel-group">
        //         {stayLabels.map((label, index) => (
        //             <button className={`label-filter-btn ${index >= currentIndex && index < currentIndex + partSize ? '' : 'hidden'}`} key={index}>
        //                 <img src={require(`../assets/labels-logos/${label.src}.jpg`)} />
        //                 <span>{label.name}</span>
        //             </button>
        //         ))}
        //     </div>
        //     <button className="next-btn" onClick={handleNextClick}>Next</button>
        // </div>




    // return (
    //     <div>

    //         {/* <img className="toy-preview-img" src={pic} /> */}
    //         {/* <img src={img} /> */}

    //         {/* {stayLabels.map((label, index) => {
    //             return < button key={index} > <span>{label}</span></button>

    //         })} */}

    //     </div >





// {name: Castles}, {name:  Amzaing pools}, {name: Mansions},
// {name: Ski-in/out}, {name: Luxe}, {name: OMG!}, {name: Grand pianos}, {name: Houserboats},
// {name: Top of the world}, {name: Islands}, {name: New}, {name: Tranding}, {name: Cabins}, {name: Boats}, {name: Tiny homes}, {name: Tropical},
// {name: Bed & breakfasts}, {name: Design}, {name: Beachfront}, {name: Farms}, {name: Arctic}, {name: Caves}, {name: Play}, {name: Iconic cities}]