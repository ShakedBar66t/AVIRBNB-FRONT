import { useState } from "react"
import { useSelector } from "react-redux"
import { BsFillCameraFill } from 'react-icons/bs'


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

    return   <section className="user-edit">
    <section className="edit-section">
        <form className="user-info">
            <section className="user-image" onClick={() => document.getElementById('userImg').click()}>
                <label htmlFor="img">
                    <div className="image-container">
                        <img src={user.imgUrl} aria-label="User Profile" />
                        <div className="change-picture-text">
                            <BsFillCameraFill/> Change Picture
                        </div>
                    </div>
                    <input type="file"
                        value=''
                        id="userImg"
                        name="img"
                        onChange={handleChange}
                        hidden />
                </label>
            </section>
            <section className="user-fullname">
                <input type="text"
                    placeholder={user.fullname}
                    value={user.fullname}
                    name="fullname"
                    onChange={handleChange}
                />
            </section>
                <section className="user-email">
                    <input type="text"
                        placeholder={user.email}
                        name="email"
                        onChange={handleChange}
                    />

                </section>
            </form>

        </section>

    </section>
}