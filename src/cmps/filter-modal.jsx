import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from 'react'
import { IoCloseSharp } from "react-icons/io5"
import { Checkbox, TextField } from "@mui/material"

import { TOGGLE_IS_SHADOW } from '../store/reducers/user.reducer'
import { TOGGLE_FILTER_MODAL } from '../store/reducers/stay.reducer'
import MultiRangeSlider from "./multirange-slider"



export function FilterModal() {
    const dispatch = useDispatch()
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(2000)
    const [checked, setChecked] = useState(false)
    const isFilterModalOpen = useSelector(storeState => storeState.stayModule.isFilterModalOpen)
    const numbers = [1, 2, 3, 4, 5, 6, 7, '8+']


    const [selectedBedrooms, setSelectedBedrooms] = useState(null)
    const [selectedBeds, setSelectedBeds] = useState(null)
    const [selectedBathrooms, setSelectedBathrooms] = useState(null)

    const handleClick = (num) => {
        console.log(num)
        selectedBathrooms(num)
    }


    const values = [12, 13, 15, 14, 8, 19, 20, 15, 25, 12, 13, 15, 14, 8, 19, 20, 15, 25, 12, 13, 15, 14, 8, 19, 20, 15, 25, 12, 13, 15, 14, 8, 19, 20, 15, 25]
    function onCloseFilterModal() {
        dispatch({ type: TOGGLE_FILTER_MODAL })
        dispatch({ type: TOGGLE_IS_SHADOW })
    }

    return (
        <div className={`modal-container ${(isFilterModalOpen) ? 'open' : ''}`}>
            <div className="filter-modal-header">
                <button className="back-btn" style={{ fontSize: '21px' }} onClick={onCloseFilterModal}><IoCloseSharp /></button>
                <h2>Filter</h2>
            </div>
            <div className='modal-filters-container'>
                <div className='price-range-container'>
                    <h2>
                        Price range
                    </h2>

                    <span className="average-span"> The average nightly price is </span>
                    <div className="price-range-columns">
                        <div className="price-range-columns-inner">

                            <div className="columns-div">
                                {values.map((value, index) => <div key={index} className="column" style={{ height: `${value}px` }}></div>)}
                                <div class='wrapper' style={{ position: 'relative' }}>
                                    <MultiRangeSlider style={{ position: 'absolute' }}
                                        min={0}
                                        max={800}
                                        onChange={({ min, max }) => { return }}
                                    />
                                </div>
                            </div>
                            <div className='inputs-container'>
                                <TextField id="outlined-basic" label="min price" type="number" variant="outlined" />
                                <span> _ </span>
                                <TextField id="outlined-basic" label="max price" type="number" variant="outlined" />

                            </div>
                        </div>
                    </div>

                </div>

                <div className="type-filter-main-container">


                    <span className="">Type of place</span>
                    <div className="type-filter-sub-container">
                        <div className='type-btns-container'>
                            <div className='type-btns-inner'>
                                <div className="checkbox-wrapper">
                                    <input
                                        type="checkbox"
                                        style={{ backgroundColor: 'white', color: 'black' }}
                                    />
                                </div>
                                <label className='type-btns-inner-text'>
                                    Entire place
                                    <span>A place all to yourself</span>
                                </label>
                            </div>
                        </div>
                        <div className='type-btns-container'>

                            <div className='type-btns-inner'>
                                <div className="checkbox-wrapper">

                                    <input
                                        type="checkbox"
                                        style={{ backgroundColor: 'white', color: 'black' }}
                                    />
                                </div>
                                <label className='type-btns-inner-text'>
                                    Private room
                                    <span>Your own room in a home or a hotel, plus some shared common spaces</span>
                                </label>
                            </div>
                        </div>
                        <div className='type-btns-container'>
                            <div className='type-btns-inner'>
                                <div className="checkbox-wrapper">

                                    <input
                                        type="checkbox"
                                        style={{ backgroundColor: 'white', color: 'black' }}
                                    />
                                </div>
                                <label className='type-btns-inner-text'>
                                    Shared room
                                    <span>A sleeping space and common areas that may be shared with others</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rooms-beds-container">
                </div>
                <div className="rooms-beds-title"></div>
                <span >Rooms and beds</span>
                <div className="rooms-beds-btns-container">
                    <div class="inner-numbers-container-wrapper">

                        <div className="inner-numbers-container">
                            <span>Bedrooms</span>
                            <div className="btns-container">
                                <button className="rooms-beds-any-btn" onClick={() => setSelectedBedrooms(null)}> Any</button>

                                {numbers.map((number) => {
                                    return (
                                        <button
                                            value={number}
                                            key={`bedrooms-${number}`}
                                            className={`rooms-beds-num-btn ${selectedBedrooms === number ? 'selected' : ''}`}
                                            onClick={() => handleClick(number)}
                                        >
                                            {number}
                                        </button>
                                    )
                                }
                                )}
                            </div>
                        </div>
                        <div className="inner-numbers-container">
                            <span>Beds</span>
                            <div className="btns-container">
                                <button className="rooms-beds-any-btn" onClick={() => setSelectedBeds(null)}> Any</button>

                                {numbers.map((number) => {
                                    return (
                                        <button
                                            value={number}
                                            key={`bedrooms-${number}`}
                                            className={`rooms-beds-num-btn ${selectedBeds === number ? 'selected' : ''}`}
                                            onClick={() => handleClick(number)}
                                        >
                                            {number}
                                        </button>
                                    )
                                }
                                )}
                            </div>
                        </div>
                        <div className="inner-numbers-container">

                            <span>Bathrooms</span>
                            <div className="btns-container">
                                <button className="rooms-beds-any-btn" onClick={() => setSelectedBathrooms(null)}> Any</button>

                                {numbers.map((number) => {
                                    return (
                                        <button
                                            value={number}
                                            key={`bedrooms-${number}`}
                                            className={`rooms-beds-num-btn ${selectedBathrooms === number ? 'selected' : ''}`}
                                            onClick={() => handleClick(number)}
                                        >
                                            {number}
                                        </button>
                                    )
                                }
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="filter-modal-footer">
                <button className="clear-all-btn"> Clear all</button>
                <button className="show-all-btn"> Show all homes</button>
            </div>
        </div >

    )
}
