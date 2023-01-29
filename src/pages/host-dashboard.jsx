import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../cmps/app-header";
import { userService } from "../services/user.service";
import { loadOrders, updateOrder } from "../store/actions/order.actions";
import { BarChart } from "../cmps/dashboard-barchart";
import { OrderPreview } from "../cmps/order-preview";
import { AiFillStar, } from 'react-icons/ai'
import { RiStarSFill, } from 'react-icons/ri'
import { BsCurrencyDollar,BsFillCloudMoonFill } from 'react-icons/bs'
import { AppFooter } from '../cmps/app-footer'

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
            const currUserOrders = await loadOrders({ user: userService.getLoggedinUser(), forHost: true })
            // console.log(currUserOrders, 'orders!!!!!!!!!')
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
        catch (err) {
            console.log(err)
        }
    }

    return <section className="host-dashboard ">
        <AppHeader/>
        {(orders?.length) ? <main className="host-dashboard-main">
            <header>
                    <div className="stat-prev">
                        <h3><BsFillCloudMoonFill/> 219</h3>
                        <div><p>Nights</p>
                        <p>Booked</p>
                        </div>
                    </div>
                    <div className="stat-prev">
                        <h3><BsCurrencyDollar/> 31.7k</h3>
                        <div>
                            <p>Total</p>
                        <p>Earning</p>
                        </div>
                    </div>
                    <div className="stat-prev">
                        <h3><BsCurrencyDollar/> 219</h3>
                        <div><p>Average </p>
                        <p className="monthly">Monthly earning</p>
                        <p className="salary">Salary</p>
                        </div>
                    </div>
                    <div className="stat-prev">
                        <h3><RiStarSFill/>3.59</h3>
                        <div><p>Average </p>
                        <p> Host rating</p>
                        </div>
                    </div>
            </header>

            <hr />

                <div  className="chart-cont">
            <BarChart/>
                </div>

                 <section className="order-list">
                    <h4>Booking reports</h4>
                    {/* <table>
                        <thead><tr><td>Date</td>
                         <td>Booker</td><td>Start date</td>
                          <td>End date</td><td>Nights</td> <td>Guests</td><td>Status</td> <td>Total price</td></tr></thead>
                        
                    </table> */}
                        <main>
                        <article className="order-preview order-list-header">
                            <div>Date</div>
                            <div>Booker</div>
                            <div>Start</div>
                            <div>End</div>
                            <div>Nights</div>
                            <div>Guests</div>
                            <div>price</div>
                            <div ><span className="status">Status</span></div>
                            </article>
                        {orders.map(order=>{
                            return <OrderPreview order={order} onUpdateOrderStatus={onUpdateOrderStatus}/>
                        })}
                        </main>
                </section>
     
        </main> : <section className="no-orders">

            <h2>You have no registered properties</h2>
            </section>}
       <AppFooter/>

    </section>
}






// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { AppFooter } from "../cmps/app-footer";
// import { AppHeader } from "../cmps/app-header";
// import { DashboardTable } from "../cmps/dashboard-table";
// import { OrderPreview } from "../cmps/order-preview";
// import { loadOrders } from "../store/actions/order.actions";
// import { updateOrder } from "../store/actions/order.actions"
// import { AiFillStar } from 'react-icons/ai'
// import { userService } from "../services/user.service";
// import { stayService } from "../services/stay.service";
// import { orderService } from "../services/order.service";

// export function HostDashBoard() {

//     const [userTrips, setUserTrips] = useState([])
//     // const user = userService.getLoggedinUser()
//     // console.log(user,'user')
//     const orders = useSelector(storeState => storeState.orderModule.orders)
//     const navigate = useNavigate()
//     useEffect(() => {
//         OnloadUserOrders()
//     }, [])

//     async function OnloadUserOrders() {
//         try {
//             const currUserOrders = await loadOrders({ user: userService.getLoggedinUser(), forHost: true })
//             console.log(currUserOrders, 'orders!!!!!!!!!')
//             setUserTrips(currUserOrders)

//         }
//         catch (err) {
//             console.log(err)
//         }
//     }

//     async function onUpdateOrderStatus(order,status) {
//         try{

//             await updateOrder({ ...order, status: status })
//             alert('updated')
            
//         }
//         catch(err){
//             console.log(err)
//         }
//     }

    



//     return <section className="host-dashboard-container order-layout">
//         <AppHeader />
//         {(orders?.length) ?
//             <section className="host-dashboard">

//                 <h2 className="order-title">Orders Status</h2>
//                 <main className="dashboard-main">

//                     <div className="orders-list flex column">
//                         {orders.map(order => {
//                             return <article key={order._id}>
//                                 <OrderPreview order={order} onUpdateOrderStatus={onUpdateOrderStatus} />
//                             </article>
//                         })}
//                     </div>

//                     <div className="statistics-container flex column">

//                         <header className="flex column">

//                             <h3>Hosting summary</h3>
//                             <h4>Fantastic job!</h4>
//                             <p>Guests love what your are doing keep up the good work and review your orders!</p>
//                         </header>

//                         <div className="statistics-info flex column">
//                         <div className="flex space-between"><p>Average rating</p><p className="pending"
//                          style={{position:'relative',right:'16px'}}>{orders[0].stay.avrRate} 
//                          <AiFillStar style={{position:'absolute',bottom:'5px'}}/></p></div>
//                             <div className="flex space-between"><p>Monthly earnings</p><p className="approved">{ '$'+orderService.getMonthlyIncome(orders)}</p></div>
//                             <div className="flex space-between"> <p>Total earnings</p><p className="approved">{ '$'+orderService.getTotalIncome(orders)}</p></div>
//                         </div>

//                         <DashboardTable orders={orders} />
//                         {/* <div>
                            
//                         </div> */}


//                     </div>
//                 </main>

//             </section> :

//             <div>no</div>}
//         {/* <AppFooter/> */}
//     </section>
// }