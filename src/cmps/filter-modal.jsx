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
    const [checked, setChecked] = useState(false)
    const [selectedButton, setSelectedButton] = useState(null)
    const [amenitiesShown, setAmenitiesShown] = useState(false)
    const [filterBy, setFilterBy] = useState(stayService.getDefaultFilter)
    const rangeRef = useRef({ minPrice: 50, maxPrice: 800 })
    const isFilterModalOpen = useSelector(storeState => storeState.stayModule.isFilterModalOpen)

    // data
    const stayAmenities = ['Cleaning products', 'Shampoo', 'Body soap', 'Hot water',
        'Shower gel', 'Hangers', 'Bed linens', 'Extra pillows and blankets', 'Room-darkening shades',
        'Ethernet connection', 'TV with standard cable', 'Crib', 'High chair', 'AC - split type ductless system',
        'Heating', 'Fire extinguisher', 'First aid kit', 'Refrigerator', 'Microwave', 'Kitchen', 'Mini fridge',
        'Freezer', 'Stove', 'Oven', 'Hot water kettle', 'Coffee maker: pour-over coffee', 'Wine glasses', 'Dining table']
    const values = [12, 13, 15, 14, 8, 19, 20, 15, 25, 12, 13, 15, 14, 8, 19, 20, 15, 25, 12, 13, 15, 14, 8, 19, 20, 15, 25, 12, 13, 15, 14, 8, 19, 20, 15, 25]
    const numbers = [1, 2, 3, 4, 5, 6, 7, '8+']

    // functions

    const handleClick = (ev, num) => {
        ev.preventDefault()
        const { name } = ev.target
        setFilterBy({ ...filterBy, [name]: num, minPrice: rangeRef.current.min, maxPrice: rangeRef.current.max })
    }
    console.log(filterBy)

    const handleRangeChange = ({ minPrice, maxPrice }) => {
        if (rangeRef.current) rangeRef.current = { minPrice, maxPrice }
        // setFilterBy({ ...filterBy, minPrice, maxPrice })
    }


    const handlePropertyTypeClick = (ev) => {
        const previousSelectedButton = selectedButton
        if (previousSelectedButton) {
            previousSelectedButton.classList.remove('selected')
        }
        setSelectedButton(ev.currentTarget)
        ev.currentTarget.classList.add('selected')
        const type = ev.currentTarget.getAttribute('name')
        setFilterBy({ ...filterBy, type })

        // console.log(filterBy)
    }

    const handleAmenityChange = (amenity) => (e) => {
        if (e.target.checked) {
            setFilterBy({ ...filterBy, amenities: [...filterBy.amenities, amenity] });
        } else {
            setFilterBy({ ...filterBy, amenities: filterBy.amenities.filter(a => a !== amenity) });
        }
        console.log(filterBy)
    }


    function onCloseFilterModal() {
        dispatch({ type: TOGGLE_FILTER_MODAL })
        dispatch({ type: TOGGLE_IS_SHADOW })
    }


    function onSubmit(ev) {
        ev.preventDefault()
        const { minPrice, maxPrice, bedrooms, type, beds, bathrooms, amenities } = filterBy
        const queryParams = `isParams=true&minPrice=${minPrice}&maxPrice=${maxPrice}&bedrooms=${bedrooms}&type=${type}&beds=${beds}&bathrooms=${bathrooms}&amenities=${amenities.join(',')}`
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
                        <span className='filter-type-title'>Type of place</span>
                        <div className='type-filter-sub-container'>
                            <div className='type-btns-container'>
                                <div className='type-btns-inner'>
                                    <div className='checkbox-wrapper'>
                                        <input
                                            type='checkbox'
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
                                    <div className='checkbox-wrapper'>

                                        <input
                                            type='checkbox'
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
                                    <div className='checkbox-wrapper'>

                                        <input
                                            type='checkbox'
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


                    <div className='titles-gap'></div>
                    <span className='filter-type-title'>Rooms and beds</span>
                    <div className='rooms-beds-btns-filter'>
                        <div className='inner-numbers-container-wrapper'>
                            <div className='inner-numbers-container'>
                                <span>Bedrooms</span>
                                <div className='btns-container'>
                                    <button
                                        className={`rooms-beds-any-btn ${!filterBy.bedrooms ? 'selected' : ''}`}
                                        onClick={() => setFilterBy({ ...filterBy, bedrooms: null })}
                                    >
                                        Any
                                    </button>
                                    {numbers.map((number) => {
                                        return (
                                            <button
                                                name='bedrooms'
                                                value={number}
                                                key={`bedrooms-${number}`}
                                                className={`rooms-beds-num-btn ${filterBy.bedrooms === number ? 'selected' : ''}`}
                                                onClick={(ev) => handleClick(ev, number)}
                                            // style={{backgroundColor:`${filterBy.bedrooms === number ? 'blue' : 'red'}`}}
                                            >
                                                {number}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className='inner-numbers-container'>
                                <span>Beds</span>
                                <div className='btns-container'>
                                    <button
                                        className={`rooms-beds-any-btn ${!filterBy.beds ? 'selected' : ''}`}
                                        onClick={() => setFilterBy({ ...filterBy, beds: null })}
                                    >
                                        Any
                                    </button>
                                    {numbers.map((number) => {
                                        return (
                                            <button
                                                name='beds'
                                                value={number}
                                                key={`beds-${number}`}
                                                className={`rooms-beds-num-btn ${filterBy.beds === number ? 'selected' : ''}`}
                                                onClick={(ev) => handleClick(ev, number)}
                                            >
                                                {number}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='inner-numbers-container'>
                                <span>Bathrooms</span>
                                <div className='btns-container'>
                                    <button
                                        className={`rooms-beds-any-btn ${!filterBy.bathrooms ? 'selected' : ''}`}
                                        onClick={() => setFilterBy({ ...filterBy, bathrooms: null })}
                                    >
                                        Any
                                    </button>
                                    {numbers.map((number) => {
                                        return (
                                            <button
                                                name='bathrooms'
                                                value={number}
                                                key={`bathrooms-${number}`}
                                                className={`rooms-beds-num-btn ${filterBy.bathrooms === number ? 'selected' : ''}`}
                                                onClick={(ev) => handleClick(ev, number)}
                                            >
                                                {number}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='property-type-filter'>
                        <div className='titles-gap'></div>

                        <div className='property-type-filter-container'>
                            <span className='filter-type-title'> Property type</span>

                            <div className='property-type-btns-container'>
                                <button onClick={handlePropertyTypeClick} name={'House'} className='property-type-filter-btn'>
                                    <div className='inner-btn-div'><img src={require(`../assets/labels-logos/house.jpg`)} >
                                    </img><span>House</span></div>
                                </button>
                                <button onClick={handlePropertyTypeClick} name={'Apartment'} className='property-type-filter-btn'>
                                    <div className='inner-btn-div'><img src={require(`../assets/labels-logos/apartment.jpg`)} >
                                    </img><span>Apartment</span></div>
                                </button>
                                <button onClick={handlePropertyTypeClick} name={'Guesthouse'} className='property-type-filter-btn'>
                                    <div className='inner-btn-div'><img src={require(`../assets/labels-logos/guesthouse.jpg`)} >
                                    </img><span>Guesthouse</span></div>
                                </button>
                                <button onClick={handlePropertyTypeClick} name={'Hotel'} className='property-type-filter-btn'>
                                    <div className='inner-btn-div'><img src={require(`../assets/labels-logos/hotel.jpg`)} >
                                    </img><span>Hotel</span></div>
                                </button>
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
