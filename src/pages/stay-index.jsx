import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay, addToStayt } from '../store/actions/stay.actions.js'
import { AppHeader } from '../cmps/app-header'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.js'

import { StayList } from '../cmps/stay-list.jsx'

export function StayIndex() {

    const stays = useSelector(storeState => storeState.stayModule.stays)

    useEffect(() => {
        loadStays()
    }, [])

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    async function onAddStay() {
        const stay = stayService.getEmptyStay()
        stay.vendor = prompt('Vendor?')
        try {
            const savedStay = await addStay(stay)
            showSuccessMsg(`Stay added (id: ${savedStay._id})`)
        } catch (err) {
            showErrorMsg('Cannot add stay')
        }
    }

    async function onUpdateStay(stay) {
        const price = +prompt('New price?')
        const stayToSave = { ...stay, price }
        try {
            const savedStay = await updateStay(stayToSave)
            showSuccessMsg(`Stay updated, new price: ${savedStay.price}`)
        } catch (err) {
            showErrorMsg('Cannot update stay')
        }
    }

    function onAddToStayt(stay) {
        console.log(`Adding ${stay.vendor} to Stayt`)
        addToStayt(stay)
        showSuccessMsg('Added to Stayt')
    }

    function onAddStayMsg(stay) {
        console.log(`TODO Adding msg to stay`)
    }


    return <section className='stay-index stay-index-layout'>
        <AppHeader />
       
        <StayList stays={stays} />
        

    </section>

    // return (
    //     <div>
    //         <h3>Stays App</h3>
    //         <main>
    //             <button onClick={onAddStay}>Add Stay ⛐</button>
    //             <ul className="stay-list">
    //                 {stays.map(stay =>
    //                     <li className="stay-preview" key={stay._id}>
    //                         <h4>{stay.vendor}</h4>
    //                         <h1>⛐</h1>
    //                         <p>Price: <span>${stay.price.toLocaleString()}</span></p>
    //                         <p>Owner: <span>{stay.owner && stay.owner.fullname}</span></p>
    //                         <div>
    //                             <button onClick={() => { onRemoveStay(stay._id) }}>x</button>
    //                             <button onClick={() => { onUpdateStay(stay) }}>Edit</button>
    //                         </div>

    //                         <button onClick={() => { onAddStayMsg(stay) }}>Add stay msg</button>
    //                         <button className="buy" onClick={() => { onAddToStayt(stay) }}>Add to stayt</button>
    //                     </li>)
    //                 }
    //             </ul>
    //         </main>
    //     </div>
    // )
}