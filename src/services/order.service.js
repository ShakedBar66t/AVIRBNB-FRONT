
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'
import { months } from 'moment/moment.js'
import { useSelector } from 'react-redux'

const ORDER_STORAGE_KEY = 'orderDB'

const BASE_URL = 'order/'

export const orderService = {
    query, /// back
    // getById,
    save,  /// back
    // remove,
    // addOrderMsg,
    getEmptyOrder, /// front
    getMonthlyIncome, /// front
    getTotalIncome, /// front
    getTotalNights, /// front
    getAvrHostRate, /// front
    getStatusPrec, /// front
    getMonthlyIncome,
    getAvrIncome,
}
window.cs = orderService

function getMonthlyIncome(orders, year) {
    const months = ["January", "February", "March", "April", "May",
        "June", "July", "August", "September", "October", "November", "December"]
    const currMonthIdx = new Date().getMonth()
    const lastHalfYear = months.splice(currMonthIdx - 5, 6)
    const avrEarnings = lastHalfYear.map((month, idx) => {
        const filteredOrders = orders.filter(order => new Date(order.startDate).getMonth() === idx &&
            order.status === 'approved' && new Date(order.startDate).getFullYear() === (+year))
        return filteredOrders.reduce((acc, order) => {
            return acc += order.totalPrice
        }, 0)
    })
    return avrEarnings
}

function getTotalIncome(orders) {
    const filteredOrders = orders.filter(order => (order.status === 'approved'))
    let totalIncome = filteredOrders.reduce((acc, order) => {
        return acc += order.totalPrice
    }, 0)

    if (totalIncome > 1000) {
        totalIncome = (totalIncome / 1000).toFixed(2) + 'k'
    }
    return totalIncome
}

function getAvrIncome(orders) {
    const filteredOrders = orders.filter(order => (order.status === 'approved'))
    let totalIncome = filteredOrders.reduce((acc, order) => {
        return acc += order.totalPrice
    }, 0)

    let avrIncome = totalIncome / filteredOrders.length

    if (avrIncome > 1000) {
        avrIncome = (avrIncome / 1000).toFixed(2) + 'k'
    }
    return avrIncome
}

function getTotalNights(orders) {
    const filteredOrders = orders.filter(order => (order.status === 'approved'))
    let totalNights = filteredOrders.reduce((acc, order) => {
        return acc += order.totalNights
    }, 0)

    return totalNights
}

function getStatusPrec(status, orders) {
    const OrdersCount = orders.filter(order => order.status === status)
    const prec = ((OrdersCount.length / orders.length) * 100).toFixed(2)
    console.log(prec)
    return prec
}

function getAvrHostRate(orders) {
    let mapedOrders = orders.reduce((acc, order) => {
        if (acc >= 0 && !acc.includes(order.stay)) {
            acc.push(order)
        }
        return acc
    }, [])
    const totalHostRate = mapedOrders.reduce((acc, order) => {
        return acc += (+order.stay.avRate)
    }, 0)

    return (totalHostRate / mapedOrders.length).toFixed(2)
}

function getEmptyOrder() {
    return {

        "hostId": '1',
        "totalNights": 0,
        "buyer": {
            "_id": '1',
            "fullname": '1'
        },
        "totalPrice": 0,
        "startDate": '1',
        "endDate": '1',
        "guests": {},
        "stay": {
            "_id": "h102",
            "name": "House Of Uncle My",
            "price": 0,
        },
        "host": {},
        "msgs": [],
        "status": "pending" // pending, approved

    }
}

/////////////////////////////////////// BACK 

async function query(user = userService.getLoggedinUser()) { ////////filter at the front 
    var orders = await httpService.get(BASE_URL)
    if (user) {
        if (user.forHost) {
            orders = orders.filter(order => order.host._id === user.user._id)
        }
        else {
            orders = orders.filter(order => order.buyer._id === user.user._id)
        }
    }

    orders = orders.sort((a, b) => b.reservedAt - a.reservedAt)
    return orders
}

function remove(orderId) {
    return httpService.delete(BASE_URL + orderId)
}

async function save(order) {
    var savedOrder
    if (order._id) {
        savedOrder = await httpService.put(BASE_URL + '/' + `${order._id}`, order)
    } else {
        // Later, owner is set by the backend
        // order.owner = userService.getLoggedinUser()
        savedOrder = await httpService.post(BASE_URL, order)
    }
    return savedOrder
}