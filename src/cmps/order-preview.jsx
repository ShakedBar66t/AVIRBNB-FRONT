import { utilService } from "../services/util.service"
import { GetOrderStatusStyle } from "./order-status"

export function OrderPreview({ order, onUpdateOrderStatus }) {

    return <article className="order-preview">
        <div className="desktop">{new Date(order.reservedAt).toLocaleDateString()}</div>
        <div className="mobile">{new Date(order.reservedAt).getDate()+ ' ' + utilService.getMonthName(new Date(order.reservedAt))}</div>

        <div>{order.buyer.fullname.slice(0, order.buyer.fullname.indexOf(' '))}</div>

        <div className="desktop">{new Date(order.startDate).toLocaleDateString()}</div>
        <div className="mobile">{new Date(order.startDate).getDate()+ ' ' + utilService.getMonthName(new Date(order.startDate))}</div>
       
        <div className="desktop">{new Date(order.endDate).toLocaleDateString()}</div>
        <div className="mobile">{new Date(order.endDate).getDate()+ ' ' + utilService.getMonthName(new Date(order.endDate))}</div>
      
        {(order.totalNights>10) ? <div>{order.totalNights}</div> : <div>{'0'+order.totalNights}</div>}
        {(order.guests.total>10) ? <div>{order.guests.total}</div> : <div>{'0'+order.guests.total}</div>}
        <div className="price">{'$' + order.totalPrice}</div>
        {(order.status === 'pending') ? <div className="order-actions-btn-container">
             <button className="clear-btn approved " onClick={() => onUpdateOrderStatus(order, 'approved')}>Accept  </button> |
            <button className="clear-btn declined " onClick={() => onUpdateOrderStatus(order, 'declined')}>Decline</button>
                      
        </div> :<div> <GetOrderStatusStyle status={order.status} /></div> }
     
    </article>
}
