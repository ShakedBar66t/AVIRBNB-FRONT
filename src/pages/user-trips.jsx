import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppFooter } from "../cmps/app-footer";
import { AppHeader } from "../cmps/app-header";
import { TripList } from "../cmps/trip-list";
import { showSuccessMsg } from "../services/event-bus.service";
import { orderService } from "../services/order.service"
import { socketService } from "../services/socket.service";
import { userService } from "../services/user.service";
import { loadOrders } from "../store/actions/order.actions";

export function UserTrips() {

    const orders = useSelector(storeState => storeState.orderModule.orders)
    const navigate = useNavigate()
    useEffect(() => {
        OnloadUserOrders()

        socketService.on('update-order-status', onUpdateBySocket)
        return () => {
            socketService.off('update-order-status', onUpdateBySocket)
        }
    }, [])

    async function OnloadUserOrders() {
        try {
            const currUserOrders = await loadOrders({ user: userService.getLoggedinUser(), forHost: false })
        }
        catch (err) {
            console.log(err)
        }
    }

    function onUpdateBySocket(updatedOrder) {
        const userOrders = orders.map(order => order._id === order._id ? updatedOrder : order)
        OnloadUserOrders()

        console.log(userOrders, 'socket updatedddd')
    }

    // console.log('trips', userTrips)

    return <section className="order-layout">
        <AppHeader />
        <main className="trips-main-cont" >
            <h2 >Trips</h2>
            {(!orders.length) && <section>

                <div className="no-trips-cont">

                    <h3 className="trip-list-title">No trips booked...yet!</h3>
                    <p>Time to dust off your bags and start planning your next adventure</p>
                    <button onClick={() => { navigate('/explore') }} className="clear-btn">Start searching</button>
                </div>
                <p className="bug-report">Can’t find your reservation here? <span>Visit the Help Center</span></p>
            </section>}
            {/* <button onClick={() => {
                socketService.emit('testa', 'kaka')
            }}>testa</button> */}
            {(orders.length) ? <TripList trips={orders} /> : ''}

        </main>
        <AppFooter />
    </section>
}
