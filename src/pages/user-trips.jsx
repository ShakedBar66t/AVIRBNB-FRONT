import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppFooter } from "../cmps/app-footer";
import { AppHeader } from "../cmps/app-header";
import { TripList } from "../cmps/trip-list";
import { orderService } from "../services/order.service"
import { userService } from "../services/user.service";
import { loadOrders } from "../store/actions/order.actions";

export function UserTrips() {

    const [userTrips, setUserTrips] = useState([])
    // const user = userService.getLoggedinUser()
    // console.log(user,'user')
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const navigate = useNavigate()
    useEffect(() => {
        OnloadUserOrders()
    }, [])


    async function OnloadUserOrders() {
        try {
          const  currUserOrders = await loadOrders()
          console.log(currUserOrders,'prder!!!!!!!!!')
            setUserTrips(currUserOrders)

        }
        catch (err) {
            console.log(err)
        }
    }

    console.log('trips', userTrips)

    return <section className="trips-container">
        <AppHeader />
        <main className="trips-main-cont" style={{ marginTop: '80px' }}>
            <h2 >Trips</h2>
            {(!orders.length) && <section>

                <div className="no-trips-cont">

                <h3 className="trip-list-title">No trips booked...yet!</h3>
                <p>Time to dust off your bags and start planning your next adventure</p>
                <button onClick={()=>{navigate('/explore')}} className="clear-btn">Start searching</button>
                </div>
                <p className="bug-report">Can’t find your reservation here? <span>Visit the Help Center</span></p>
                </section> }

            {( orders.length) ? <TripList trips={orders}/> : ''}
                                
           
        </main>
        <AppFooter/>
    </section>
}
