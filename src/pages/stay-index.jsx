import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay, addToStayt } from '../store/actions/stay.actions.js'
import { AppHeader } from '../cmps/app-header'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.js'
import { useParams } from 'react-router-dom'
import { StayList } from '../cmps/stay-list.jsx'
import { PreviewImgCarousel } from '../cmps/img-carousel.jsx'
import { toggleLoginModal } from '../store/user.actions.js'

export function StayIndex() {

    const stays = useSelector(storeState => storeState.stayModule.stays)
    const user = useSelector(storeState => storeState.userModule.user)
    const { filterByParams } = useParams()

    useEffect(() => {
        loadStays(filterByParams)
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

    async function onToggleLike(stay) {

        if (!user) {
            toggleLoginModal()
            return
        }

        else {
            const indexOfuser = stay.likedByUsers.findIndex(currUser => currUser._id === user._id)
            if (indexOfuser > -1) {
                stay.likedByUsers.splice(indexOfuser, 1)
                await updateStay(stay)
                return false
            }
            else {
                stay.likedByUsers.push(user)
                await updateStay(stay)
                return true
            }
        }
    }


    return <section className='stay-index stay-index-layout'>
        <AppHeader />
        <StayList stays={stays} onToggleLike={onToggleLike} />
        {/* <PreviewImgCarousel imgs={stays[0].imgUrls} /> */}



    </section>

}