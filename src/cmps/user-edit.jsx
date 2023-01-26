import { useState } from "react"
import { useSelector } from "react-redux"
import { BsFillCameraFill } from 'react-icons/bs'
import { ColorForButton } from "./btn-color"


export function UserEdit() {

    const user = useSelector(storeState => storeState.userModule.user)
    console.log(user)

    function handleChange() {

    }
    const [isHovering, setIsHovering] = useState(false)
    const [imageSrc, setImageSrc] = useState()

    function handleMouseEnter() {
        setIsHovering(true)
    }

    function handleMouseLeave() {
        setIsHovering(false)
    }

    function reserveOrder(){

    }

    return <section className="user-edit">
        <section className="edit-section">
            <form className="user-info">
                <section className="user-image" onMouseOver={() => document.getElementById('change-picture-text').style.display = "block"} onMouseOut={() => document.getElementById('change-picture-text').style.display = "none"}>
                    <label htmlFor="img">
                        <div className="image-container">
                            <img src={user.imgUrl} aria-label="User Profile" />
                        </div>
                        <input type="file"
                            value=''
                            id="userImg"
                            name="img"
                            onChange={handleChange}
                            hidden />
                    </label>
                </section>
                <section className="user-details">
                    <section className="user-fullname">
                        <label htmlFor="fullname">Full name:
                            <input type="text"
                                placeholder={user.fullname}
                                value={user.fullname}
                                name="fullname"
                                onChange={handleChange}
                            />
                        </label>
                    </section>

                    <section className="user-email">
                        <label htmlFor="email">Email:
                            <input type="text"
                                placeholder={user.email}
                                name="email"
                                onChange={handleChange}
                            />
                        </label>
                    </section>
                </section>
                <ColorForButton txt={'Save'} type="submit" reserveOrder={reserveOrder} />
            </form>

        </section>
        

    </section>
}