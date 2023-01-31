import { NavLink, useNavigate } from "react-router-dom"
import { BsHeart } from 'react-icons/bs'
import { GoSearch } from 'react-icons/go'
import { SiAirbnb } from 'react-icons/si'
import { CgProfile } from 'react-icons/cg'
import { BiMessageAlt } from 'react-icons/bi'
import { useSelector } from "react-redux"
import { toggleLoginModal } from "../store/user.actions"

export function MoblieFooter() {
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
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
            <NavLink key={user._id || 'login'} to={`/user/${user._id}`}>
                <div><CgProfile /></div>
                <div>{(user) ? 'Profile' : 'Login'} </div>
                {/* <div onClick={(user) ? navigate('/host') : ()=>toggleLoginModal()}>{(user) ? 'Profile' : 'Login'} </div> */}
            </NavLink>

        </nav>
    </section>
}