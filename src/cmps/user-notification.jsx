import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../services/user.service";
import { loadUser } from "../store/user.actions";
import { AppHeader } from '../cmps/app-header'

export function UserNotification() {

    const { userId } = useParams()
    const [user, setUser] = useState(userService.getLoggedinUser())
    const [notificationRead, setNotificationRead] = useState({})
    const [notifications, setNotifications] = useState([
        { type: "notification", msg: 'Please confirm your email address by clicking on the link we just emailed you. If you cannot find the email, you can request a new confirmation email or change your email address.', time: Date.now() },
        { type: "notification", msg: 'Connect with Facebook to complete your profile and make it easy to log in.', time: Date.now() }
    ]);
    console.log(user)

    useEffect(() => {
        if (!userId) return
        loadUser()
    }, [])

    const handleNotificationClick = (notificationId) => {
        setNotificationRead({
            ...notificationRead,
            [notificationId]: true
        })
    }

    return <section className="user-notification">
        <AppHeader />
        <section className="notification-list">
            <h5>Notifications</h5>
            <div className="email-confirm notification" onClick={() => handleNotificationClick("email-confirm")}>
                <img src={user.imgUrl} />
                <div className="notification-info">
                    <h2 style={{ color: notificationRead["email-confirm"] === true ? "grey" : "initial", fontWeight: notificationRead["email-confirm"] === true ? "400" : "600" }}> {notifications[0].msg}</h2>
                    <h6>{notificationRead["email-confirm"] === true ? `Opened at ${new Date().toLocaleDateString()}` : `${new Date().toLocaleDateString()}`}</h6>
                </div>
                <button className="delete-btn">
                    X
                </button>

            </div>
            <div className="facebook-connect notification" onClick={() => handleNotificationClick("facebook-connect")}>
                <img src={user.imgUrl} />
                <div className="notification-info">
                    <h2 style={{ color: notificationRead["facebook-connect"] === true ? "grey" : "initial", fontWeight: notificationRead["facebook-connect"] === true ? "400" : "600" }}>{notifications[1].msg}</h2>
                    <h6>{notificationRead["facebook-connect"] === true ? `Opened at ${new Date().toLocaleDateString()}` : `${new Date().toLocaleDateString()}`}</h6>
                </div>
                <button className="delete-btn">
                    X
                </button>

            </div>
        </section>
    </section>

}