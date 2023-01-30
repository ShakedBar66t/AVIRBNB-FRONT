import { IoCloseSharp } from "react-icons/io5"
import { useSelector } from "react-redux"
import { TOGGLE_CHECKOUT_MODAL } from "../store/reducers/user.reducer"
import { toggleCheckoutModal } from "../store/user.actions"
import { FaStar } from 'react-icons/fa'
import { addOrder } from '../store/actions/order.actions'
import { useNavigate } from "react-router-dom"


export function ReserveModal({ order }) {

    const isCheckoutModal = useSelector(storeState => storeState.userModule.isCheckoutModal)
    console.log('this is order', order)
    const navigate = useNavigate()


    return <div className={`checkout-modal ${(isCheckoutModal) ? 'open' : 'closed'}`}>
        <header>
            <button className="clear-btn" style={{ fontSize: '21px' }} onClick={toggleCheckoutModal}><IoCloseSharp /></button>
            <h2>Confirm order</h2>
        </header>
        <hr className="full" />
        <main className="checkout-cont">
            <div className="modal-trip-info flex column">
                <h4>Your trip</h4>
                <div className="flex space-between"><p>Check-in</p> <p>{new Date(order.startDate).toLocaleDateString()}</p></div>
                <div className="flex space-between"><p>Check-out</p> <p>{new Date(order.endDate).toLocaleDateString()}</p></div>
                <div className="flex space-between"><p>Host name</p> <p>{order.host.fullname}</p></div>
            </div>
            <div className="modal-stay-info">
                <h4>Stay details</h4>
                <div className="modal-stay-info-cont flex" style={{ gap: '8px' }}>
                    <img src={order.stay.imgUrl} alt="" />
                    <div className="flex column space-between" style={{ width: '60%' }}>
                        <p>{order.stay.name}</p>
                        <small>{order.stay.type}</small>
                        <div className="flex space-between"><p><FaStar style={{ fontSize: '13px' }} />
                            {order.stay.avRate}</p><p>{'$' + order.stay.price + ' night'}</p></div>
                    </div>
                </div>
            </div>
            <div className="modal-price-info">
                <h4>Price details</h4>
                <div className="flex space-between"><p>Guests</p> <p>{order.guests.total}</p></div>
                <div className="flex space-between"><p>Total Nights</p> <p>{order.totalNights}</p></div>
                <div className="flex space-between"><p>Total Price</p> <p>{'$' + order.totalPrice}</p></div>
            </div>
            <button onClick={() => addOrder(order).then(res => {
                toggleCheckoutModal()
                navigate('/user/trip')
                })} className="reserve-btn">Reserve now</button>
        </main>
    </div>
    // {return (isCheckoutModal) ? <div className={`checkout-modal ${(isCheckoutModal) ? 'open' : 'closed'}`}>
    // <header>
    // <button className="clear-btn" style={{ fontSize: '21px' }} onClick={toggleCheckoutModal}><IoCloseSharp /></button>
    //     <h2>Confirm order</h2>
    // </header>
    // <hr className="full"/>
    // <main className="checkout-cont">
    //     <div className="trip-info">
    //     <h4>your trip</h4>
    //     <div className="flex space-between"><p>Check-in</p> <p>{new Date(order.startDate).toLocaleDateString()}</p></div>
    //     <div className="flex space-between"><p>Check-out</p> <p>{new Date(order.endDate).toLocaleDateString()}</p></div>
    //     <div className="flex space-between"><p>Host name</p> <p>{order.host.fullname}</p></div>

    //     </div>
    // </main>
    // </div> : ''}
}