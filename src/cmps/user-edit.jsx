import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BsFillCameraFill } from 'react-icons/bs'
import { ColorForButton } from "./btn-color"
import { saveLocalUser, userService } from "../services/user.service"
import { uploadImg } from "../services/cloudinary-service"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { loadUser, updateUser } from "../store/user.actions"
import { showErrorMsg } from "../services/event-bus.service"
import { AppFooter } from "./app-footer"


export function UserEdit() {


    const { userId } = useParams()
    const navigate = useNavigate()
    const [userToEdit, setUserToEdit] = useState(userService.getLoggedinUser())
    console.log(userToEdit)

    useEffect(() => {
        if (!userId) return
        loadUser()
    }, [])

    function handleEditChange({ target }) {
        let { name: field, files } = target
        if (field === 'img') {
            uploadImg(files[0])
            const reader = new FileReader();
            reader.onload = function (e) {
                setUserToEdit(prevUser => ({ ...prevUser, imgUrl: e.target.result }));
            }
            reader.readAsDataURL(files[0]);
        } else {
            setUserToEdit(prevUser => ({ ...prevUser, [field]: target.value }))
        }
    }

    async function onSaveUser(ev) {
        ev.preventDefault()
        try {
            const savedUser = await updateUser(userToEdit)
            console.log(savedUser)
            navigate(`/explore`)
        } catch (err) {
            showErrorMsg('Cannot edit user', err)
        }
    }

    return <section className="user-edit">
        <section className="edit-section">
            <form className="user-info" onSubmit={onSaveUser} >
                <section className="user-image">
                    <label htmlFor="img">
                        <div className="image-container">
                            <img src={userToEdit.imgUrl} aria-label="User Profile" onClick={() => { document.getElementById('userImg').click() }} />
                        </div>
                        <input type="file"
                            value=''
                            id="userImg"
                            name="img"
                            onChange={handleEditChange}
                            hidden />
                    </label>
                </section>
                <div className="main-user-info">
                    <section className="user-details">
                        <div style={{width: '50%',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <section className="user-fullname">
                                <label htmlFor="fullname">Full name:
                                    <input type="text"
                                        placeholder={userToEdit.fullname}
                                        value={userToEdit.fullname}
                                        name="fullname"
                                        onChange={handleEditChange}
                                    />
                                </label>
                            </section>
                            <section className="user-email">
                                <label htmlFor="email">Email:
                                    <input type="text"
                                        placeholder={userToEdit.email}
                                        name="email"
                                        onChange={handleEditChange}
                                    />
                                </label>
                            </section>
                        </div>
                        <button className="save-edit-btn" type="submit" >
                            Save
                        </button>
                    </section>
                </div>
            </form>
        </section>
        <AppFooter />
    </section>
}