import { FaRegAddressCard } from 'react-icons/fa'
import { AiOutlineHome } from 'react-icons/ai'
import { SiAirbnb } from 'react-icons/si'
import { BsHeart } from 'react-icons/bs'
export function UserSetting({setPage}){
  return  <div className='setting-cards-cont'>
        <article className="setting-prev" onClick={() => {
            setPage('edit')
        }}>

            <div> <FaRegAddressCard/></div>
            <div>
                <h4>Personal info</h4>
                <p>Provide personal details and how we can reach you</p>
            </div>
        </article>
        <article className="setting-prev">

            <div> <AiOutlineHome/></div>
            <div>
                <h4>Your Homes</h4>
                <p>See statistics infromation and statuses of your assets</p>
            </div>
        </article>
        <article className="setting-prev">

            <div> <SiAirbnb/></div>
            <div>
                <h4>Your trips</h4>
                <p>Take a look at your most recent trips and reserves</p>
            </div>
        </article>
        <article className="setting-prev">

            <div> <BsHeart/></div>
            <div>
                <h4>Wishlist</h4>
                <p>The places you want to go most and have new experiences</p>
            </div>
        </article>

     
    </div>
}