import { useState } from "react"
import { stayService } from "../services/stay.service"


export function HostIndex() {

    const [stay, setStay] = useState(stayService.getEmptyStay())

    const stayAmenities = [
        'Cleaning products', 'Shampoo', 'Body soap', 'Hot water',
        'Shower gel', 'Hangers', 'Bed linens', 'Extra pillows and blankets', 'Room-darkening shades',
        'Ethernet connection', 'TV with standard cable', 'Crib', 'High chair', 'AC - split type ductless system',
        'Heating', 'Fire extinguisher', 'First aid kit', 'Refrigerator', 'Microwave', 'Kitchen', 'Mini fridge',
        'Freezer', 'Stove', 'Oven', 'Hot water kettle', 'Coffee maker: pour-over coffee', 'Wine glasses', 'Dining table']

    const urls = []
    function handleChange({ target }) {
        const { name: field, value } = target
        // console.log(target)
        setStay(({ ...stay, [field]: value }))
        console.log(stay)
        if (field === 'country' || field === 'city' || field === 'address') {
            stay.loc[field] = value
        }
        if (field === 'imgUrls') {
            setStay(prevStay => ({ ...prevStay, imgUrls: [prevStay.imgUrls, value] }))
        }
    }


    return <section className="host-index secondary-container">
        <section className="stay-edit">
            <section className="edit-section">
                <form className="stay-info">
                    <section className="stay-name">
                        <h2>
                            <input
                                type="text"
                                placeholder="Stay name"
                                value={stay.name}
                                name="name"
                                onChange={handleChange}
                            />
                        </h2>
                        <div>
                            <label htmlFor="">
                                <input
                                    type="text"
                                    placeholder="Enter Country"
                                    value={stay.loc.country}
                                    name="country"
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="">
                                <input
                                    type="text"
                                    placeholder="Enter City"
                                    value={stay.loc.city}
                                    name="city"
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="">
                                <input
                                    type="text"
                                    placeholder="Enter Address"
                                    value={stay.loc.address}
                                    name="address"
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </section>
                    <section className="img-container">
                        <section className="img-upload" style={{ backgroundImage: 'url(undefined)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                            <label htmlFor="">
                                <p>Upload Image</p>
                                <input type="file"
                                    value=''
                                    name="imgUrls"
                                    onChange={handleChange}
                                />
                            </label>
                        </section>
                        <section className="img-upload" style={{ backgroundImage: 'url(undefined)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                            <label htmlFor="">
                                <p>Upload Image</p>
                                <input type="file"
                                    value=''
                                    name="imgUrls"
                                    onChange={handleChange}
                                />
                            </label>
                        </section>
                        <section className="img-upload" style={{ backgroundImage: 'url(undefined)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                            <label htmlFor="">
                                <p>Upload Image</p>
                                <input type="file"
                                    value=''
                                    name="imgUrls"
                                    onChange={handleChange}
                                />
                            </label>
                        </section>
                        <section className="img-upload" style={{ backgroundImage: 'url(undefined)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                            <label htmlFor="">
                                <p>Upload Image</p>
                                <input type="file"
                                    value=''
                                    name="imgUrls"
                                    onChange={handleChange}
                                />
                            </label>
                        </section>
                        <section className="img-upload" style={{ backgroundImage: 'url(undefined)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                            <label htmlFor="">
                                <p>Upload Image</p>
                                <input type="file"
                                    value=''
                                    name="imgUrls"
                                    onChange={handleChange}
                                />
                            </label>
                        </section>
                    </section>
                    <section className="stay-description">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label htmlFor="capacity">Capacity
                                <input type="text"
                                    name="capacity"
                                    
                                    
                                />
                            </label>
                            <label htmlFor="stay-type">Stay-type:
                                <select name="stay-type">
                                    <option value=""></option>
                                    <option value="entire-place">Entire Place</option>
                                    <option value="private-room">Private Room</option>
                                    <option value="shared-room">Shared Room</option>
                                </select>
                            </label>
                            <label htmlFor="propety-type">Property Type:
                                <select name="propety-type">
                                    <option value=""></option>
                                    <option value="stay">Stay</option>
                                    <option value="apartment">Apartment</option>
                                    <option value="guest-stay">Guest stay</option>
                                    <option value="hotel">Hotel</option>
                                </select>
                            </label>
                            <label>
                                Price:
                                <input type="text" style={{ width: '40px' }} />
                                /night
                            </label>
                        </div>
                        <div>
                            <h2>Description: </h2>
                            <textarea></textarea>
                        </div>
                        <div className="amenities-container">
                            <h2>Amenities</h2>
                            <div className="stay-amenities">
                                {stayAmenities.map((amenity) => {
                                    return <div style={{ display: 'flex', gap: '13px' }}>
                                        <input type="checkbox" />
                                        <label>{amenity}</label>
                                    </div>
                                })}
                            </div>
                        </div>
                    </section>
                    <section className="confirm-area">
                        <button className="btn-reserve">Save</button>
                    </section>
                </form>
            </section>
        </section>
    </section>
}