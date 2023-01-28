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
        {/* <div>{order.guests.total}</div> */}
        <div className="price">{'$' + order.totalPrice}</div>
        {(order.status === 'pending') ? <div className="order-actions-btn-container">
             <button className="clear-btn approved " onClick={() => onUpdateOrderStatus(order, 'approved')}>Accept  </button> |
            <button className="clear-btn declined " onClick={() => onUpdateOrderStatus(order, 'declined')}>Decline</button>
           
            
        </div> :<div> <GetOrderStatusStyle status={order.status} /></div> }
     

    </article>
}





// import { utilService } from "../services/util.service"
// import { GetOrderStatusStyle } from "./order-status"



// function OrderDateString() {
//     return <p></p>
// }

// export function OrderPreview({ order, onUpdateOrderStatus }) {
//     const { buyer, status } = order
//     return <article className="order-preview ">

//         <div className="flex align-center" style={{ gap: '24px' }}>
//             <img  src={buyer.imgUrl} alt="" />

//             <div className="flex column " style={{ gap: '8px' }}>
//                 <h4>{buyer.fullname}</h4>
//                 <p className="reserved-at">Reserved at: {utilService.getDayName(new Date(order.reservedAt)) + ' ' +
//                     utilService.getFullMonthName(new Date(order.reservedAt)) + ' ' +
//                     new Date(order.reservedAt).getDate() + ', ' + new Date(order.reservedAt).getFullYear()}</p>
//                 <p>{order.guests.total + ' guests | ' +
//                     utilService.getFullMonthName(new Date(order.startDate)) + ' ' +
//                     new Date(order.startDate).getDate() + ' - ' + new Date(order.endDate).getDate() + ' | ' + 'total price: ' + '$' + order.totalPrice  }</p>
//                 <p>{order.stay.loc.address}</p>
//             </div>
//         </div>

//        {(order.status==='pending') ? <div className="order-actions-btn-container">
//             <button className="clear-btn approved" onClick={() => onUpdateOrderStatus(order, 'approved')}>Accept  </button> |
//             <button className="clear-btn declined" onClick={() => onUpdateOrderStatus(order, 'declined')}>Decline</button>
//         </div> : <GetOrderStatusStyle status={status}/> }
//     </article>
// }