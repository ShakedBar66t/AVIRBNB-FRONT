import { utilService } from "../services/util.service"
import { GetOrderStatusStyle } from "./order-status"



function OrderDateString() {
    return <p></p>
}

export function OrderPreview({ order, onUpdateOrderStatus }) {
    const { buyer, status } = order
    return <article className="order-preview ">

        <div className="flex align-center" style={{ gap: '24px' }}>
            <img  src={buyer.imgUrl} alt="" />

            <div className="flex column " style={{ gap: '8px' }}>
                <h4>{buyer.fullname}</h4>
                <p className="reserved-at">Reserved at: {utilService.getDayName(new Date(order.reservedAt)) + ' ' +
                    utilService.getFullMonthName(new Date(order.reservedAt)) + ' ' +
                    new Date(order.reservedAt).getDate() + ', ' + new Date(order.reservedAt).getFullYear()}</p>
                <p>{order.guests.total + ' guests | ' +
                    utilService.getFullMonthName(new Date(order.startDate)) + ' ' +
                    new Date(order.startDate).getDate() + ' - ' + new Date(order.endDate).getDate() + ' | ' + 'total price: ' + '$' + order.totalPrice  }</p>
                <p>{order.stay.loc.address}</p>
            </div>
        </div>

       {(order.status==='pending') ? <div className="order-actions-btn-container">
            <button className="clear-btn approved" onClick={() => onUpdateOrderStatus(order, 'approved')}>Accept  </button> |
            <button className="clear-btn declined" onClick={() => onUpdateOrderStatus(order, 'declined')}>Decline</button>
        </div> : <GetOrderStatusStyle status={status}/> }
    </article>
}