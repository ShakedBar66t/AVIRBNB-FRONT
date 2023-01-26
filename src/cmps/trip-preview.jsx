// import { MdOutlinePending,MdPendingActions } from 'react-icons/md'
// import { AiFillCloseCircle } from 'react-icons/ai'
// import { BsCheckLg } from 'react-icons/bs'
import { utilService } from '../services/util.service'
import { GetOrderStatusStyle } from './order-status'
export function TripPreview({trip}){

    // function GetTripStatusStyle({status}){
    //     if (status === 'pending'){
    //         return <span className={status}>{status} <MdPendingActions /> </span>
    //     }
    //     if (status === 'approved'){
    //         return <span className={status}>{status} <BsCheckLg/> </span>
    //     }
    //     if (status === 'declined'){
    //         return <span className={status}>{status} <AiFillCloseCircle/> </span>
    //     }
    // }

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
        <p>{'Total price: '  + trip.stay.price + "$ /night x" + trip.totalNights + " = " + trip.totalPrice + '$' }</p>
        <p>{'Hosted by: ' + trip.host.fullname }</p>
        <p>{'Total guests: ' + trip.guests.total}  </p>
        <p >{'Trip status: '} <GetOrderStatusStyle status={trip.status}/> </p>
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
