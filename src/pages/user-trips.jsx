import { useSelector } from "react-redux";
import { AppHeader } from "../cmps/app-header";
import {orderService} from "../services/order.service"

export function UserTrips(){

    const user = useSelector(storeState => storeState.userModule.user)


    return <section className="trips-container">
        <AppHeader/>
        <main className="trips-main-cont" style={{marginTop:'80px'}}>
            <h2 >Trips</h2>
        </main>
    </section>
}
