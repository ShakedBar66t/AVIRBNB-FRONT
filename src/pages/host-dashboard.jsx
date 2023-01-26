import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppFooter } from "../cmps/app-footer";
import { AppHeader } from "../cmps/app-header";
import { DashboardTable } from "../cmps/dashboard-table";
import { OrderPreview } from "../cmps/order-preview";
import { loadOrders } from "../store/actions/order.actions";
import { updateOrder } from "../store/actions/order.actions"
import { AiFillStar } from 'react-icons/ai'
import { userService } from "../services/user.service";
import { stayService } from "../services/stay.service";
import { orderService } from "../services/order.service";

export function HostDashBoard() {

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
            const currUserOrders = await loadOrders({ user: userService.getLoggedinUser(), forHost: true })
            console.log(currUserOrders, 'orders!!!!!!!!!')
            setUserTrips(currUserOrders)

        }
        catch (err) {
            console.log(err)
        }
    }

    async function onUpdateOrderStatus(order,status) {
        try{

            await updateOrder({ ...order, status: status })
            alert('updated')
            
        }
        catch(err){
            console.log(err)
        }
    }

    



    return <section className="host-dashboard-container order-layout">
        <AppHeader />
        {(orders?.length) ?
            <section className="host-dashboard">

                <h2 className="order-title">Orders Status</h2>
                <main className="dashboard-main">

                    <div className="orders-list flex column">
                        {orders.map(order => {
                            return <article key={order._id}>
                                <OrderPreview order={order} onUpdateOrderStatus={onUpdateOrderStatus} />
                            </article>
                        })}
                    </div>

                    <div className="statistics-container flex column">

                        <header className="flex column">

                            <h3>Hosting summary</h3>
                            <h4>Fantastic job!</h4>
                            <p>Guests love what your are doing keep up the good work and review your orders!</p>
                        </header>

                        <div className="statistics-info flex column">
                        <div className="flex space-between"><p>Average rating</p><p className="pending"
                         style={{position:'relative',right:'16px'}}>{orders[0].stay.avrRate} 
                         <AiFillStar style={{position:'absolute',bottom:'5px'}}/></p></div>
                            <div className="flex space-between"><p>Monthly earnings</p><p className="approved">{ '$'+orderService.getMonthlyIncome(orders)}</p></div>
                            <div className="flex space-between"> <p>Total earnings</p><p className="approved">{ '$'+orderService.getTotalIncome(orders)}</p></div>
                        </div>

                        <DashboardTable orders={orders} />
                        {/* <div>
                            
                        </div> */}


                    </div>
                </main>

            </section> :

            <div>no</div>}
        {/* <AppFooter/> */}
    </section>
}