import { FaRegAddressCard } from 'react-icons/fa'
import { AiOutlineHome } from 'react-icons/ai'
import { SiAirbnb } from 'react-icons/si'
import { BiBarChartAlt2 } from 'react-icons/bi'
import { BsHeart, BsMegaphone } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { userService } from '../services/user.service'
import { useState } from 'react'
export function UserSetting({ setPage }) {

    const [user, setUser] = useState(userService.getLoggedinUser())

    const navigate = useNavigate()
    return <div className='account-setting secondary-container'>
        <h1>Account</h1>
        <h2> <span className='user-fullname'>{user.fullname}</span>, {user.email} · <span style={{textDecoration: 'underline', fontWeight: '600', cursor: 'pointer'}} onClick={() => {
            setPage('edit')
        }} >Go to profile</span></h2>
        <div className='setting-cards-cont'>
            <article className="setting-prev" onClick={() => {
                setPage('edit')
            }}>
                <div> <FaRegAddressCard /></div>
                <div>
                    <h4>Personal info</h4>
                    <p>Provide personal details and how we can reach you</p>
                </div>
            </article>
            <article className="setting-prev" onClick={() => {
                navigate('/host/home')
            }}>
                <div> <AiOutlineHome /></div>
                <div>
                    <h4>Become a host</h4>
                    <p>See statistics infromation and statuses of your assets</p>
                </div>
            </article>
            <article className="setting-prev" onClick={() => {
                navigate('/user/trip')
            }}>
                <div> <SiAirbnb /></div>
                <div>
                    <h4>Your trips</h4>
                    <p>Take a look at your most recent trips and reserves</p>
                </div>
            </article>
            <article className="setting-prev" onClick={() => {
                navigate(`/user/wishlist/${user._id}`)
            }}>
                <div> <BsHeart /></div>
                <div>
                    <h4>Wishlist</h4>
                    <p>The places you want to go most and have new experiences</p>
                </div>
            </article>
            <article className="setting-prev">

                <div> <BsMegaphone /></div>
                <div>
                    <h4>Notifications</h4>
                    <p>Choose notification preferences and how you want to be contracted</p>
                </div>
            </article>
            <article className="setting-prev" onClick={() => {
                navigate('/host/dashboard')
            }}>

                <div> <BiBarChartAlt2 /></div>
                <div>
                    <h4>Professional hosting tools</h4>
                    <p>Get professional tools if you manage several properties on Avirbnb</p>
                </div>
            </article>


        </div>
    </div>
}