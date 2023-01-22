

export function HostIndex() {

    const stayAmenities = [
        'Cleaning products', 'Shampoo', 'Body soap', 'Hot water',
        'Shower gel', 'Hangers', 'Bed linens', 'Extra pillows and blankets', 'Room-darkening shades',
        'Ethernet connection', 'TV with standard cable', 'Crib', 'High chair', 'AC - split type ductless system',
        'Heating', 'Fire extinguisher', 'First aid kit', 'Refrigerator', 'Microwave', 'Kitchen', 'Mini fridge',
        'Freezer', 'Stove', 'Oven', 'Hot water kettle', 'Coffee maker: pour-over coffee', 'Wine glasses', 'Dining table']


    return <section className="host-index secondary-container">
        <section className="stay-edit">
            <section className="edit-section">
                <form className="stay-info">
                    <section className="stay-name">
                        <h2>
                            <input
                                type="text"
                                placeholder="Stay name" />
                        </h2>
                        <div>
                            <label htmlFor="">
                                <input
                                    type="text"
                                    placeholder="Enter Country"
                                />
                            </label>
                            <label htmlFor="">
                                <input
                                    type="text"
                                    placeholder="Enter City"
                                />
                            </label>
                            <label htmlFor="">
                                <input
                                    type="text"
                                    placeholder="Enter Address"
                                />
                            </label>
                        </div>
                    </section>
                    <section className="img-container">
                        <section className="img-upload" style={{ backgroundImage: 'url(undefined)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                            <label htmlFor="">
                                <p>Upload Image</p>
                                <input type="file" hidden />
                            </label>
                        </section>
                        <section className="img-upload" style={{ backgroundImage: 'url(undefined)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                            <label htmlFor="">
                                <p>Upload Image</p>
                                <input type="file" hidden />
                            </label>
                        </section>
                        <section className="img-upload" style={{ backgroundImage: 'url(undefined)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                            <label htmlFor="">
                                <p>Upload Image</p>
                                <input type="file" hidden />
                            </label>
                        </section>
                        <section className="img-upload" style={{ backgroundImage: 'url(undefined)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                            <label htmlFor="">
                                <p>Upload Image</p>
                                <input type="file" hidden />
                            </label>
                        </section>
                        <section className="img-upload" style={{ backgroundImage: 'url(undefined)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                            <label htmlFor="">
                                <p>Upload Image</p>
                                <input type="file" hidden />
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