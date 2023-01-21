import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { IoCloseSharp } from "react-icons/io5";

import { TOGGLE_IS_SHADOW } from '../store/reducers/user.reducer'
import { TOGGLE_FILTER_MODAL } from '../store/reducers/stay.reducer'
import MultiRangeSlider from "./multirange-slider";
import { TextField } from "@mui/material";



export function FilterModal() {
    const dispatch = useDispatch()
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);

    const isFilterModalOpen = useSelector(storeState => storeState.stayModule.isFilterModalOpen)

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
                                <MultiRangeSlider
                                    min={0}
                                    max={800}
                                    onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                                />
                            </div>
                            <div className='inputs-container'>
                                {/* <div className='min-price-container'> */}
                                <TextField id="outlined-basic" label="min price" type="number" variant="outlined" />
                                <span> _ </span>
                                <TextField id="outlined-basic" label="max price" type="number" variant="outlined" />

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >

    )
}
