

export function HostIndex() {
    return <section className="host-index secondary-container">
        hello
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
                        <section className="img-upload" style={{backgroundImage: 'url(undefined)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                            <label htmlFor="">
                                <p>Upload Image</p>
                                <input type="file"/>
                            </label>
                        </section>
                        <section className="img-upload" style={{backgroundImage: 'url(undefined)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                            <label htmlFor="">
                                <p>Upload Image</p>
                                <input type="file"/>
                            </label>
                        </section>
                        <section className="img-upload" style={{backgroundImage: 'url(undefined)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                            <label htmlFor="">
                                <p>Upload Image</p>
                                <input type="file"/>
                            </label>
                        </section>
                        <section className="img-upload" style={{backgroundImage: 'url(undefined)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                            <label htmlFor="">
                                <p>Upload Image</p>
                                <input type="file"/>
                            </label>
                        </section>
                        <section className="img-upload" style={{backgroundImage: 'url(undefined)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                            <label htmlFor="">
                                <p>Upload Image</p>
                                <input type="file"/>
                            </label>
                        </section>
                    </section>
                </form>
            </section>
        </section>
    </section>
}