
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

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
    getStatusPrec, /// front
}
window.cs = orderService


// async function query(user = userService.getLoggedinUser()) {
//     var orders = await storageService.query(ORDER_STORAGE_KEY)
//     // console.log('order!!@231312',orders)
//     // console.log('userid',user._id,'buterid',orders[0].buyer._id)
//     console.log('user!!!!!!!', user)
//     if (user) {

//         if (user.forHost) {
//             orders = orders.filter(order => order.host._id === user.user._id)
//         }
//         else {
//             orders = orders.filter(order => order.buyer._id === user.user._id)
//         }
//         console.log('filtersd orders', orders)
//     }
//     return orders
// }


function getMonthlyIncome(orders) {
    const month = 1000 * 60 * 60 * 24 * 30

    const filteredOrders = orders.filter(order => {
        return (order.reservedAt + month > Date.now() && order.status === 'approved')
    })
    const monthlyIncome = filteredOrders.reduce((acc, order) => {
        return acc += order.totalPrice
    }, 0)
    return monthlyIncome
}

function getTotalIncome(orders) {
    const filteredOrders = orders.filter(order => (order.status === 'approved'))
    const totalIncome = filteredOrders.reduce((acc, order) => {
        return acc += order.totalPrice
    }, 0)
    return totalIncome
}

function getStatusPrec(status, orders) {
    // var pPos = $('#pointspossible').val();
    // var pEarned = $('#pointsgiven').val();

    // var perc = ((pEarned/pPos) * 100).toFixed(3);
    // $('#pointsperc').val(perc)

    const OrdersCount = orders.filter(order => order.status === status)
    const prec = ((OrdersCount.length / orders.length) * 100).toFixed(2)
    console.log(prec)
    return prec
}


// function _createOrders() {
//     let orders = utilService.loadFromStorage(ORDER_STORAGE_KEY) || []

//     if (!orders || !orders.length) {
//         orders = [
//             {
//                 buyer:{
//                     "fullname": "Margaux",
//                     "imgUrl": "https://robohash.org/3805403?set=set1",
//                     "_id":{Adults:2,Children:1,Infants}
//             },
//         }
//         ]
            

//         utilService.saveToStorage(ORDER_STORAGE_KEY, orders)
//     }
//     return orders
// }


// async function query(filterBy = { txt: '', price: 0 }) {
//     var orders = await storageService.query(ORDER_STORAGE_KEY)
//     if (filterBy.txt) {
//         const regex = new RegExp(filterBy.txt, 'i')
//         orders = orders.filter(order => regex.test(order.vendor) || regex.test(order.description))
//     }
//     if (filterBy.price) {
//         orders = orders.filter(order => order.price <= filterBy.price)
//     }
//     return orders
// }

// function getById(orderId) {
//     return storageService.get(ORDER_STORAGE_KEY, orderId)
// }

// async function remove(orderId) {
//     // throw new Error('Nope')
//     await storageService.remove(ORDER_STORAGE_KEY, orderId)
// }

// async function save(order) {
//     var savedOrder
//     if (order._id) {
//         savedOrder = await storageService.put(ORDER_STORAGE_KEY, order)
//     } else {
//         // Later, owner is set by the backend
//         // order.owner = userService.getLoggedinUser()
//         savedOrder = await storageService.post(ORDER_STORAGE_KEY, order)
//     }
//     return savedOrder
// }

// async function addOrderMsg(orderId, txt) {
//     // Later, this is all done by the backend
//     const order = await getById(orderId)
//     if (!order.msgs) order.msgs = []

//     const msg = {
//         id: utilService.makeId(),
//         by: userService.getLoggedinUser(),
//         txt
//     }
//     order.msgs.push(msg)
//     await storageService.put(ORDER_STORAGE_KEY, order)

//     return msg
// }

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
        "host":{},
        "msgs": [],
        "status": "pending" // pending, approved

    }
}

//   const orders = [
//     {
//       "_id": "o1225",
//       "hostId": "u102",
//       "buyer": {
//         "_id": "u101",
//         "fullname": "User 1"
//       },
//       "totalPrice": 160,
//       "startDate": "2025/10/15",
//       "endDate": "2025/10/17",
//       "guests": {
//         "adults": 2,
//         "kids": 1
//       },
//       "stay": {
//         "_id": "h102",
//         "name": "House Of Uncle My",
//         "price": 80.00
//       },
//       "msgs": [],
//       "status": "pending" // pending, approved
//     }
//   ]

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
        console.log('filtersd orders', orders)
    }
    return orders
}

function remove(orderId) {
    console.log(BASE_URL + orderId)
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