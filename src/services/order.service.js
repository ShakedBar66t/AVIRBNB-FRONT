
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const ORDER_STORAGE_KEY = 'orderDB'

export const orderService = {
    // query,
    // getById,
    // save,
    // remove,
    // addOrderMsg,
    getEmptyOrder,
}
window.cs = orderService


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
//         order.owner = userService.getLoggedinUser()
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
            
      "hostId": '',
      "totalNights":0,
      "buyer": {
        "_id": '',
        "fullname": ''
      },
      "totalPrice": 0,
      "startDate": '',
      "endDate": '',
      "guests": { },
      "stay": {
        "_id": "h102",
        "name": "House Of Uncle My",
        "price": 0,
      },
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


// TEST DATA
// storageService.post(ORDER_STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




