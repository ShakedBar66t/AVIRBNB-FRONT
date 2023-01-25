import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../cmps/app-header";
import { userService } from "../services/user.service";
import { loadOrders } from "../store/actions/order.actions";

export function HostDashBoard(){

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
          const  currUserOrders = await loadOrders({user:userService.getLoggedinUser(),forHost:true})
          console.log(currUserOrders,'orders!!!!!!!!!')
          setUserTrips(currUserOrders)
          
        }
        catch (err) {
            console.log(err)
        }
    }
    

    return <section className="host-dashboard-container order-layout">
        <AppHeader/>
        {(orders?.length) ?
         <section className="host-dashboard">
            
            <h2 className="order-title">Orders Status</h2>
            <main className="dashboard-main">

            <div className="orders-container">

            </div>

            <div className="statistics-container">
                <div>

                <h3>Hosting summary</h3>
                <h4>Fantastic job!</h4>
                <p>Guests love what your are doing keep up the good work and review your orders!</p>
                <div><div><p>Monthly earnings</p><p>500$</p></div></div>
                <div><div><p>AverageRating</p><p>3⭐</p></div></div>
                <div><div><p>Total earnings</p>10000$<p></p></div></div>
                <div></div>
                </div>
            </div>
            </main>

            </section> : 

        <div>no</div>} 
    </section>
}