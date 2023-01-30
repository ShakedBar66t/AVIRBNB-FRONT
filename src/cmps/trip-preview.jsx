
import { utilService } from '../services/util.service'
import { GetOrderStatusStyle } from './order-status'
export function TripPreview({trip}){

    function GetTripDates(){
       const dates = new Date(trip.startDate).getDate()
        return  <div className='trip-dates'>
            <p>{utilService.getMonthName(new Date(trip.startDate))}</p>
            <p>{new Date(trip.startDate).getDate() + ' - ' + new Date(trip.endDate).getDate()}</p>
            <p>{new Date(trip.startDate).getFullYear() }</p>
        </div> 
    }

    return <article className="trip-preview">
        <div className="trip-preview-info">
            <header>

        <h4>{trip.stay.name}</h4>
        <p>{'Hosted by ' + trip.host.fullname }</p>
        <p>{'Total guests ' + trip.guests.total}  </p>
        <p className='price-trip'>{'Total price $'   + trip.stay.price + " /night x" + trip.totalNights + " = " +' $' + trip.totalPrice }</p>
        <p className='trip-status'>{'Trip status: '} <GetOrderStatusStyle status={trip.status}/> </p>
            </header>
            <GetTripDates/>
            <div className='trip-loc'>
                <p>{trip.stay.loc.address}</p>
                <p>{trip.stay.loc.city + ', ' + trip.stay.loc.countryCode }</p>
                <p>{trip.stay.loc.country}</p>
            </div>

        </div>
        <img src={trip.stay.imgUrl} alt="" />
    </article>
}



// import { utilService } from '../services/util.service'
// import { GetOrderStatusStyle } from './order-status'
// export function TripPreview({trip}){

//     function GetTripDates(){
//        const dates = new Date(trip.startDate).getDate()
//         return  <div className='trip-dates'>
//             <p>{utilService.getMonthName(new Date(trip.startDate))}</p>
//             <p>{new Date(trip.startDate).getDate() + ' - ' + new Date(trip.endDate).getDate()}</p>
//             <p>{new Date(trip.startDate).getFullYear() }</p>
//         </div> 
//     }

//     return <article className="trip-preview">
//         <div className="trip-preview-info">
//             <header>

//         <h4>{trip.stay.name}</h4>
//         <p>{'Total price: '  + trip.stay.price + "$ /night x" + trip.totalNights + " = " + trip.totalPrice + '$' }</p>
//         <p>{'Hosted by: ' + trip.host.fullname }</p>
//         <p>{'Total guests: ' + trip.guests.total}  </p>
//         <p >{'Trip status: '} <GetOrderStatusStyle status={trip.status}/> </p>
//             </header>
//             <GetTripDates/>
//             <div className='trip-loc'>
//                 <p>{trip.stay.loc.address}</p>
//                 <p>{trip.stay.loc.city + ', ' + trip.stay.loc.countryCode }</p>
//                 <p>{trip.stay.loc.country}</p>
//             </div>

//         </div>
//         <img src={trip.stay.imgUrl} alt="" />
//     </article>
// }
