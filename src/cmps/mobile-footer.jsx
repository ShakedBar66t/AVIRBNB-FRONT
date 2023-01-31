import { NavLink, useNavigate } from "react-router-dom"
import { BsHeart } from 'react-icons/bs'
import { GoSearch } from 'react-icons/go'
import { SiAirbnb } from 'react-icons/si'
import { CgProfile } from 'react-icons/cg'
import { BiMessageAlt } from 'react-icons/bi'
import { useSelector } from "react-redux"
import { toggleLoginModal } from "../store/user.actions"
import { socketService } from "../services/socket.service"
import { useEffect, useState } from "react"

export function MoblieFooter() {
    const [isNotif, setIsNotif] = useState(false)
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    useEffect(() => {
        socketService.on('host-add-notification', (notif) => {  ///////host notif
            console.log('inside footer')
            setIsNotif(true)
        })

        socketService.on('update-order-status', (notif) => { ///// user notif 
            console.log('inside footer')
            setIsNotif(true)
        })

        return () => {
            socketService.off('host-add-notification')
            socketService.off('update-order-status')
        }
    }, [])


    if (!user) return
    return <section className="mobile-footer">
        <nav className="flex">
            <NavLink key="explore" to={'/explore'}>
                <div><GoSearch /></div>
                <div>Explore</div>
            </NavLink>
            <NavLink key="wishlist" to={`user/wishlist/${user._id}`}>
                <div><BsHeart /></div>
                <div>Wishlist</div>
            </NavLink>
            <NavLink key="trips" to={'/user/trip'}>
                <div><SiAirbnb /></div>
                <div>Trips</div>
            </NavLink>
            <NavLink key="inbox" to={'/notifications'}>
                <div><BiMessageAlt /></div>
                <div>Inbox</div>
            </NavLink>
            <NavLink onClick={() => setIsNotif(false)} key={user._id || 'login'} to={`/user/${user._id}`} >
                <div><CgProfile /><span className={`notification-dot-footer ${(isNotif) ? 'shown' : ''}`}></span></div>
                <div>{(user) ? 'Profile' : 'Login'} </div>
                {/* <div onClick={(user) ? navigate('/host') : ()=>toggleLoginModal()}>{(user) ? 'Profile' : 'Login'} </div> */}
            </NavLink>

        </nav>
    </section>
}