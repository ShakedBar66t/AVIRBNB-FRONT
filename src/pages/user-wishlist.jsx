import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../cmps/app-header";


export function UserWishlist() {

    const stays = useSelector(storeState => storeState.stayModule.stays)
    const navigate = useNavigate()

    const likedStays = stays.filter(stay => stay.likedByUsers.length > 0).map(stay => {
        return {
            stay,
            likedBy: stay.likedByUsers.map(user => user.fullname)
        }
    });

    console.log('liked places', likedStays)
    
    if (!likedStays) return
    return <section className="wishlist-index main-layout">
        <AppHeader />
        <div className="user-dashboard secondary-container">
            <section className="dashboard-container">
                <section className="wishlist-container">
                    <h1>Wishlist</h1>
                    <div className="stay-wishlist">
                        {likedStays.map(stay => {
                            return <section className="liked-stay-preview" 
                            key={stay.stay._id}
                            onClick={() => navigate(`/explore/${stay.stay._id}`)}>
                                <div className="like-stay-imgs">
                                    {stay.stay.imgUrls.slice(0,3).map(img => {
                                        return <img src={img} />
                                    })}
                                </div>
                                    <h4>{stay.stay.name}</h4>


                            </section>
                        })}
                    </div>
                </section>
            </section>
        </div>
    </section>
}