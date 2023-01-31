import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppHeader } from "../cmps/app-header"
import { uploadImg } from "../services/cloudinary-service"
import { showErrorMsg } from "../services/event-bus.service"
import { stayAmenities, stayService } from "../services/stay.service"
import { getLoggedinUser } from "../services/user.service"
import { addStay } from "../store/actions/stay.actions"

export function HostIndex() {

    const [stay, setStay] = useState(stayService.getEmptyStay())
    const navigate = useNavigate()
    const stayAmenities = ['TV', 'Internet', 'Wifi', 'Air conditioning', 'Pool', 'Kitchen', 'Doorman', 'Gym', 'Elevator', 'Heating', 'Washer', 'Dryer', 'Smoke detector', 'First aid kit', 'Fire extinguisher', 'Essentials', 'Shampoo', '24-hour check-in', 'Hangers', 'Hair dryer', 'Iron', 'Laptop friendly workspace', 'Self check-in', 'Hot water', 'Bed linens', 'Beachfront', 'Microwave', 'Coffee maker', 'Refrigerator', 'Dishes and silverware', 'Cooking basics', 'Stove', 'Babysitter recommendations', 'Step-free access', 'Luggage dropoff allowed', 'Indoor fireplace', 'Extra pillows and blankets', 'Wide entryway', 'Keypad', 'Pocket wifi', 'Ethernet connection', 'Private bathroom', 'How water kettle', 'Fireplace guards', 'Building staff', 'Accessible-height toilet', 'Room-darkening shades']

    function handleChange({ target }) {

        const { name: field, files } = target;
        if (field === 'name' || field === 'capacity' || field === 'price' || field === 'description' || field === 'stay-type' || field === 'summary' || field === 'bathrooms' || field === 'bedrooms') {
            setStay(({ ...stay, [field]: target.value }))
        }
        if (field === 'country' || field === 'city' || field === 'address') {
            setStay(({ ...stay, loc: { ...stay.loc, [field]: target.value } }));
        }
        if (field === 'amenity') {
            setStay(({ ...stay, amenities: { ...stay.amenities, [field]: target.value } }));

        }
        if ((field === 'imgUrl0' || 'imgUrl1' || 'imgUrl2' || 'imgUrl3' || 'imgUrl4') && files && files[0]) {
            uploadImg(files[0])
            const reader = new FileReader();
            reader.onload = function (e) {
                setStay(prevStay => ({ ...prevStay, imgUrls: [...prevStay.imgUrls, e.target.result] }));
            }
            reader.readAsDataURL(files[0]);
        }
        if (field === 'amenity') {
            setStay(({ ...stay, amenities: [...stay.amenities, target.value] }))
        }
    }

    async function onAddStay(ev) {
        ev.preventDefault()
        const savedStay = await addStay(stay)
        try {
            navigate(`/explore/${savedStay._id}`)
        } catch (err) {
            showErrorMsg('Cannot add stay', err)
        }
    }

    return <section className="host-index secondary-container">
        <AppHeader />
        <section className="stay-edit">
            <section className="edit-section">
                <form className="stay-info" onSubmit={onAddStay}>
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
                        <section className="img-upload" onClick={() => document.getElementById('fileInput0').click()} style={{ backgroundImage: `url(${stay.imgUrls[0]})`, backgroundRepeat: 'no-repeat', backgroundSize: 'contain', backgroundPosition: 'center' }}>
                            <label htmlFor="imgUrl0">
                                <p>Upload Image</p>
                                <section>
                                    <input type="file"
                                        value=''
                                        id="fileInput0"
                                        name="imgUrl0"
                                        onChange={handleChange}
                                        hidden
                                    />
                                </section>
                            </label>
                        </section>
                        <section className="img-upload" onClick={() => document.getElementById('fileInput1').click()} style={{ backgroundImage: `url(${stay.imgUrls[1]})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                            <label htmlFor="imgUrl1">
                                <p>Upload Image</p>
                                <section>
                                    <input type="file"
                                        value=''
                                        id="fileInput1"
                                        name="imgUrl1"
                                        onChange={handleChange}
                                        hidden
                                    />
                                </section>
                            </label>
                        </section>
                        <section className="img-upload" onClick={() => document.getElementById('fileInput2').click()} style={{ backgroundImage: `url(${stay.imgUrls[2]})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                            <label htmlFor="imgUrl2" >
                                <p>Upload Image</p>
                                <input type="file"
                                    value=''
                                    id="fileInput2"
                                    name="imgUrl2"
                                    onChange={handleChange}
                                    hidden
                                />
                            </label>
                        </section>
                        <section className="img-upload" onClick={() => document.getElementById('fileInput3').click()} style={{ backgroundImage: `url(${stay.imgUrls[3]})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                            <label htmlFor="imgUrl3">
                                <p>Upload Image</p>
                                <input type="file"
                                    value=''
                                    id="fileInput3"
                                    name="imgUrl3"
                                    onChange={handleChange}
                                    hidden
                                />
                            </label>
                        </section>
                        <section className="img-upload" onClick={() => document.getElementById('fileInput4').click()} style={{ backgroundImage: `url(${stay.imgUrls[4]})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                            <label htmlFor="imgUrl4" >
                                <p>Upload Image</p>
                                <input type="file"
                                    value=''
                                    id="fileInput4"
                                    name="imgUrl4"
                                    onChange={handleChange}
                                    hidden
                                />
                            </label>
                        </section>
                    </section>
                    <section className="stay-description">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label htmlFor="capacity">Capacity
                                <input type="text"
                                    name="capacity"
                                    value={stay.capacity}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="bathrooms">Bathrooms
                                <input type="text"
                                    name="bathrooms"
                                    value={stay.bathrooms}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="bedrooms">Bedrooms
                                <input type="text"
                                    name="bedrooms"
                                    value={stay.bedrooms}
                                    onChange={handleChange}
                                />

                            </label>
                            <label htmlFor="stay-type">Stay-type:
                                <select name="stay-type" onChange={handleChange}>
                                    <option value=""></option>
                                    <option value='Entire Place'>Entire Place</option>
                                    <option value='Private Room'>Private Room</option>
                                    <option value='Shared Room'>Shared Room</option>
                                </select>
                            </label>
                            <label>
                                Price:
                                <input type="text"
                                    style={{ width: '40px' }}
                                    value={stay.price}
                                    onChange={handleChange}
                                    name="price"
                                />
                                /night
                            </label>
                        </div>
                        <div>
                            <h2>Summary: </h2>
                            <textarea name='summary'
                                onChange={handleChange}
                                value={stay.summary}
                            ></textarea>
                        </div>
                        <div className="amenities-container">
                            <h2>Amenities</h2>
                            <div className="stay-amenities">
                                {stayAmenities.map((amenity) => {
                                    return <div style={{ display: 'flex', gap: '13px' }} key={amenity}>
                                        <input type="checkbox"
                                            value={amenity}
                                            onChange={handleChange}
                                            name="amenity"
                                        />
                                        <label>{amenity}</label>
                                    </div>
                                })}
                            </div>
                        </div>
                    </section>
                    <section className="confirm-area">
                        <button type="submit" className="btn-reserve">Save</button>
                    </section>
                </form>
            </section>
        </section>
    </section>
}