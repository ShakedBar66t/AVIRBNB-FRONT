import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BarChart } from "../cmps/dashboard-barchart";
import { AiFillStar, } from 'react-icons/ai'
import { RiStarSFill, } from 'react-icons/ri'
import { BsCurrencyDollar, BsFillCloudMoonFill } from 'react-icons/bs'
import { orderService } from "../services/order.service";
import { socketService, SOCKET_EMIT_SET_STATUS } from "../services/socket.service";

import { AppHeader } from "../cmps/app-header";
import { AppFooter } from '../cmps/app-footer'
import { OrderPreview } from "../cmps/order-preview";

import { loadOrders, updateOrder } from "../store/actions/order.actions";
import { userService } from "../services/user.service";

export function HostDashBoard() {

    const orders = useSelector(storeState => storeState.orderModule.orders)
    const [userTrips, setUserTrips] = useState([])
    const [year, setYear] = useState(new Date().getFullYear())
    const navigate = useNavigate()

    useEffect(() => {
        OnloadUserOrders()
    }, [])

    async function OnloadUserOrders() {
        try {
            const currUserOrders = await loadOrders({ user: userService.getLoggedinUser(), forHost: true })
            setUserTrips(currUserOrders)

        }
        catch (err) {
            console.log(err)
        }
    }
    async function onUpdateOrderStatus(order, status) {
        try {

            await updateOrder({ ...order, status: status })
            socketService.emit(SOCKET_EMIT_SET_STATUS, order) 
        }
        catch (err) {
            console.log(err)
        }
    }

    function handleYearInputChange({ target }) {
        setYear(target.value)
    }

    return <section className="host-dashboard ">
        <AppHeader />
        {(orders?.length) ? <main className="host-dashboard-main">
            <header>
                <div className="stat-prev">
                    <h3><BsFillCloudMoonFill /> {orderService.getTotalNights(orders)}</h3>
                    <div><p>Nights</p>
                        <p>Booked</p>
                    </div>
                </div>
                <div className="stat-prev">
                    <h3><BsCurrencyDollar /> {orderService.getTotalIncome(orders)}</h3>
                    <div>
                        <p>Total</p>
                        <p>Earning</p>
                    </div>
                </div>
                <div className="stat-prev">
                    <h3><BsCurrencyDollar />{orderService.getAvrIncome(orders)}</h3>
                    <div><p>Average </p>
                        <p className="monthly">Order earning</p>
                        <p className="salary">Salary</p>
                    </div>
                </div>
                <div className="stat-prev">
                    <h3><RiStarSFill />{orderService.getAvrHostRate(orders)}</h3>
                    <div><p>Average </p>
                        <p> Host rating</p>
                    </div>
                </div>
            </header>

            <hr />
            <div className="chart-header">
                <div>
                    <label htmlFor="year-select">{year}</label>
                    <select name="" id="year-select" className="year-select" onChange={handleYearInputChange}>
                        <option value={2023}>2023</option>
                        <option value={2022}>2022</option>
                        <option value={2021}>2021</option>
                        <option value={2020}>2020</option>
                    </select>
                </div>
                <h4 className="chart-title">{year + ' monthly earnings'}</h4>
            </div>
            <div className="chart-cont">
                <BarChart orders={orders} year={year} />
            </div>

            <section className="order-list">
                <h4>Booking reports</h4>

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
                    {orders.map(order => {
                        return <OrderPreview order={order} onUpdateOrderStatus={onUpdateOrderStatus} />
                    })}
                </main>
            </section>

        </main> : <section className="no-orders">

            <h2 >Hosting tools</h2>
            <div>
                <h4>You have no registered properties</h4>
                <p>Not a host yet? try registering a property here:</p>
                <button onClick={() => navigate('/host/home')}>Become a host</button>
            </div>
            <small>Cant find your listings? <span>contact us here</span></small>
        </section>}
        <AppFooter />

    </section>
}
