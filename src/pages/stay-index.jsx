import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay, addToStayt } from '../store/actions/stay.actions.js'
import { AppHeader } from '../cmps/app-header'
import { UserMsg } from '../cmps/user-msg.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { stayService } from '../services/stay.service.js'
import { useLocation, useSearchParams } from 'react-router-dom'
import { StayList } from '../cmps/stay-list.jsx'
import { toggleLoginModal } from '../store/user.actions.js'
import { LabelsFilter } from '../cmps/labels-filter.jsx'
import { socketService } from '../services/socket.service.js'
import { SOCKET_EVENT_REGISTER_USER_TO_ROOM, SOCKET_EMIT_SEND_HOST_NOTIFICATION } from '../services/socket.service'

export function StayIndex() {
    const location = useLocation()
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const user = useSelector(storeState => storeState.userModule.user)
    const [searchParams, setSearchParams] = useSearchParams()
    const [isOn, setIsOn] = useState(false)
    // const queryFilterBy = stayService.getFilterFromSearchParams(searchParams)


    useEffect(() => {
        // if (location.pathname === '/explore') loadStays()
        // else loadStays(queryFilterBy)
        loadStays(searchParams)
    }, [searchParams])

    useEffect(() => {
        if (user?.isHost) {
            console.log("the user is host");
            socketService.emit(SOCKET_EVENT_REGISTER_USER_TO_ROOM, user._id)
        }
        else {
            return
        }
    }, [user])

    useEffect(() => {
        socketService.on('chat-add-notif', (order) => {
            console.log(order)
        })
        return () => {
            socketService.off('chat-add-notif', (order) => {
                console.log(order)
            })
        }
    }, [user])

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
        // console.log(`Adding ${stay.vendor} to Stayt`)
        addToStayt(stay)
        showSuccessMsg('Added to Stayt')
    }

    function onAddStayMsg(stay) {
        // console.log(`TODO Adding msg to stay`)
    }

    async function onToggleLike(ev, stay) {
        ev.stopPropagation()
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

    return <section className='stay-index main-layout'>
        <AppHeader isOn={isOn} setIsOn={setIsOn} />
        <LabelsFilter />
        <UserMsg />
        <StayList stays={stays} onToggleLike={onToggleLike} />
    </section>

}