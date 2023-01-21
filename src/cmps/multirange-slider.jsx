import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
// import "./multiRangeSlider.css";

const MultiRangeSlider = ({ minPrice, maxPrice, onChange }) => {
    const [minVal, setMinVal] = useState(minPrice);
    const [maxVal, setMaxVal] = useState(maxPrice);
    const minValRef = useRef(minPrice);
    const maxValRef = useRef(maxPrice);
    const range = useRef(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - minPrice) / (maxPrice - minPrice)) * 100),
        [minPrice, maxPrice]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Get minPrice and maxPrice values when their state changes
    useEffect(() => {
        onChange({ minPrice: minVal, maxPrice: maxVal });
    }, [minVal, maxVal, onChange]);

    return (
        <div className="container">
            <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className="thumb thumb--left"
                style={{ zIndex: minVal > maxPrice - 100 && "5" }}
            />
            <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className="thumb thumb--right"
            />

            <div className="slider">
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
                <div className="slider__left-value">{minVal}</div>
                <div className="slider__right-value">{maxVal}</div>
            </div>
        </div>
    );
};

MultiRangeSlider.propTypes = {
    minPrice: PropTypes.number.isRequired,
    maxPrice: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default MultiRangeSlider;
