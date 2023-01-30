import { useSelector, useDispatch } from 'react-redux'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoCloseSharp } from 'react-icons/io5'
import { TextField } from '@mui/material'
import MultiRangeSlider from './multirange-slider'
import { TOGGLE_IS_SHADOW } from '../store/reducers/user.reducer'
import { TOGGLE_FILTER_MODAL } from '../store/reducers/stay.reducer'
import { stayService } from '../services/stay.service'


export function FilterModal() {
    // setup
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [selectedButton, setSelectedButton] = useState(null)
    const [amenitiesShown, setAmenitiesShown] = useState(false)
    const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter)
    const rangeRef = useRef({ minPrice: 50, maxPrice: 800 })
    const isFilterModalOpen = useSelector(storeState => storeState.stayModule.isFilterModalOpen)

    // data
    const values = [12, 13, 15, 14, 8, 19, 20, 15, 25, 12, 13, 15, 14, 8, 19, 20, 15, 25, 12, 13, 15, 14, 8, 19, 20, 15, 25, 12, 13, 15, 14, 8, 19, 20, 15, 25]
    const numbers = [1, 2, 3, 4, 5, 6, 7, '8+']

    const stayAmenities = ['Cleaning products', 'Shampoo', 'Body soap', 'Hot water',
        'Shower gel', 'Hangers', 'Bed linens', 'Extra pillows and blankets', 'Room-darkening shades',
        'Ethernet connection', 'TV with standard cable', 'Crib', 'High chair', 'AC - split type ductless system',
        'Heating', 'Fire extinguisher', 'First aid kit', 'Refrigerator', 'Microwave', 'Kitchen', 'Mini fridge',
        'Freezer', 'Stove', 'Oven', 'Hot water kettle', 'Coffee maker: pour-over coffee', 'Wine glasses', 'Dining table']

    const filterOptions = [
        { name: 'Bedrooms', label: 'Bedrooms', value: null },
        { name: 'Beds', label: 'Beds', value: null },
        { name: 'Bathrooms', label: 'Bathrooms', value: null }
    ]

    const propertyTypes = [
        { name: 'House', label: 'House', image: require('../assets/labels-logos/house.jpg') },
        { name: 'Apartment', label: 'Apartment', image: require('../assets/labels-logos/apartment.jpg') },
        { name: 'Guesthouse', label: 'Guesthouse', image: require('../assets/labels-logos/guesthouse.jpg') },
        { name: 'Hotel', label: 'Hotel', image: require('../assets/labels-logos/hotel.jpg') }
    ]

    const placeTypes = [
        { name: 'Entire place', label: 'Entire place', desc: 'A place all to yourself' },
        { name: 'Private room', label: 'Private room', desc: 'Your own room in a home or a hotel, plus some shared common spaces' },
        { name: 'Shared room', label: 'Shared room', desc: 'A sleeping space and common areas that may be shared with others' }
    ]

    // functions

    const handleClick = (ev, num) => {
        ev.preventDefault()
        const { name } = ev.target
        setFilterBy({ ...filterBy, [name]: num, minPrice: rangeRef.current.min, maxPrice: rangeRef.current.max })
    }
    // console.log(filterBy)

    function handleRangeChange({ minPrice, maxPrice }) {
        if (rangeRef.current) rangeRef.current = { minPrice, maxPrice }
    }

    function handlePlaceTypeClick(placeType) {
    }

    function handlePropertyTypeClick(ev) {
        const previousSelectedButton = selectedButton
        if (previousSelectedButton) {
            previousSelectedButton.classList.remove('selected')
        }
        setSelectedButton(ev.currentTarget)
        ev.currentTarget.classList.add('selected')
        const type = ev.currentTarget.getAttribute('name')
        setFilterBy({ ...filterBy, type })
    }

    function handleAmenityChange(amenity) {
        return function (e) {
            if (e.target.checked) {
                setFilterBy({ ...filterBy, amenities: [...filterBy.amenities, amenity] })
            } else {
                setFilterBy({ ...filterBy, amenities: filterBy.amenities.filter(a => a !== amenity) })
            }
        }
    }

    function onCloseFilterModal() {
        dispatch({ type: TOGGLE_FILTER_MODAL })
        dispatch({ type: TOGGLE_IS_SHADOW })
    }

    function onSubmit(ev) {
        ev.preventDefault()
        const { minPrice, maxPrice, bedrooms, type, beds, bathrooms, amenities } = filterBy
        const queryParams = `isParams=true&minPrice=${minPrice}&maxPrice=${maxPrice}&bedrooms=${bedrooms}
        &beds=${beds}&bathrooms=${bathrooms}&amenities=${amenities.join(',')} &location=flexible&checkIn=flexible
        &checkOut=flexible&adults=''&infants=''&children=''&type=''`
        onCloseFilterModal()
        navigate(`/explore?${queryParams}`)
    }

    return (
        <div className={`modal-container ${(isFilterModalOpen) ? 'open' : ''}`}>

            <div className='filter-modal-header'>
                <button className='back-btn' style={{ fontSize: '21px' }} onClick={onCloseFilterModal}><IoCloseSharp /></button>
                <h2>Filter</h2>
            </div>

            <div className='modal-filters-container'>
                <div className='price-range-container'>
                    <h2>
                        Price range
                    </h2>

                    <span className='average-span'> The average nightly price is </span>
                    <div className='price-range-columns'>
                        <div className='price-range-columns-inner'>

                            <div className='columns-div'>
                                {values.map((value, index) => <div key={index} className='column' style={{ height: `${value}px` }}></div>)}
                                <div className='wrapper' style={{ position: 'relative' }}>
                                    <MultiRangeSlider
                                        minPrice={0}
                                        maxPrice={800}
                                        onChange={handleRangeChange}
                                    />
                                </div>
                            </div>
                            <div className='inputs-container'>

                                <TextField
                                    id='outlined-basic-min'
                                    label='min price'
                                    type='number'
                                    variant='outlined'
                                    value={rangeRef.current.minPrice}
                                    onChange={(ev) => {
                                        rangeRef.current = {
                                            ...rangeRef.current,
                                            minPrice: Number(ev.target.value)
                                        }
                                    }
                                    }
                                />
                                <span> _ </span>
                                <TextField
                                    id='outlined-basic-max'
                                    label='max price'
                                    type='number'
                                    variant='outlined'
                                    value={rangeRef.current.maxPrice}
                                    onChange={(ev) => {
                                        rangeRef.current = {
                                            ...rangeRef.current,
                                            maxPrice: Number(ev.target.value)
                                        }
                                    }
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className='type-filter-main-container'>
                        <div className='titles-gap'></div>
                        <span className='filter-type-title'>Type of place</span>
                        <div className='type-filter-sub-container'>
                            {placeTypes.map(({ name, label, desc }) => (
                                <div key={name} className='type-btns-container'>
                                    <div className='type-btns-inner'>
                                        <div className='checkbox-wrapper'>
                                            <input

                                                type='checkbox'
                                                color='white'
                                                // checked={filterBy.placeType.includes(name)}
                                                onChange={() => handlePlaceTypeClick(name)}
                                            />
                                        </div>
                                        <label className='type-btns-inner-text'>
                                            {label}
                                            <span>{desc}</span>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='titles-gap'></div>
                    <span className='filter-type-title'>Rooms and beds</span>
                    <div className='rooms-beds-btns-filter'>
                        <div className='inner-numbers-container-wrapper'>
                            {filterOptions.map(({ name, label, value }) => (
                                <div className='inner-numbers-container' key={label + value}>
                                    <span>{label}</span>
                                    <div className='btns-container'>
                                        <button
                                            className={`rooms-beds-any-btn ${!filterBy[name] ? 'selected' : ''}`}
                                            onClick={() => setFilterBy({ ...filterBy, [name]: null })}
                                        >
                                            Any
                                        </button>
                                        {numbers.map((number) => {
                                            return (
                                                <button
                                                    name={name}
                                                    value={number}
                                                    key={`${name}-${number}`}
                                                    className={`rooms-beds-num-btn ${filterBy[name] === number ? 'selected' : ''}`}
                                                    onClick={(ev) => handleClick(ev, number)}
                                                >
                                                    {number}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='property-type-filter'>
                        <div className='titles-gap'></div>

                        <div className='property-type-filter-container'>
                            <span className='filter-type-title'> Property type</span>
                            <div className='property-type-btns-container'>
                                {propertyTypes.map(({ name, label, image }) => (
                                    <button
                                        key={image}
                                        onClick={handlePropertyTypeClick}
                                        name={name}
                                        className={`property-type-filter-btn ${filterBy.propertyType === name ? 'selected' : ''}`}
                                    >
                                        <div className='inner-btn-div'>
                                            <img src={image} />
                                            <span>{label}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
                <div className='titles-gap'></div>
                <div className={`amenities-filter ${amenitiesShown ? 'full' : ''}`}>
                    <span className='filter-type-title'>Amenities </span>
                    <div className='amenities-container'>
                        {stayAmenities.map((amenity, index) => {
                            return <div key={index} className='amenity-label-wrapper'> <label className='amenity-label'>
                                <input
                                    type='checkbox'
                                    style={{ backgroundColor: 'white', color: 'black' }}
                                    onChange={handleAmenityChange(amenity)} />
                                <span>
                                    {amenity}
                                </span>
                            </label>
                            </div>
                        })}
                    </div>
                    <span className='amenities-toggle-btn' onClick={() => setAmenitiesShown(!amenitiesShown)}>Show {amenitiesShown ? 'less' : 'more'} </span>
                </div>
            </div>
            <div className='filter-modal-footer'>

                <button className='clear-all-btn' onClick={() => setFilterBy(stayService.getDefaultFilter())}> Clear all</button>
                <button className='show-all-btn' onClick={(ev) => onSubmit(ev)}> Show all homes</button>
            </div>
        </div >

    )
}
