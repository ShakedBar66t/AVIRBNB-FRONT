
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { storageService } from './async-storage.service.js'

import { MdOutlineCleaningServices } from 'react-icons/md'


const STAY_STORAGE_KEY = 'stayDB'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg,
    getAvrStayRating,
    getDefaultFilter,
    getFilterFromSearchParams
}
window.cs = stayService

_createStays()


function getAvrStayRating(reviews) {
    const totalRate = reviews.reduce((acc, review) => {
        return acc += review.rate
    }, 0)
    return (totalRate / reviews.length).toFixed(2)
}

async function query(filterBy) {

    const stays = await storageService.query(STAY_STORAGE_KEY)
    if (!filterBy) return stays
    let filteredStays = stays.filter(stay => stay.price >= filterBy.minPrice && stay.price <= filterBy.maxPrice)

    // if (filterBy.bedrooms) {
    //     filteredStays = filteredStays.filter(stay => stay.bedrooms === filterBy.bedrooms)
    // }
    // if (filterBy.type) {
    //     filteredStays = filteredStays.filter(stay => stay.type === filterBy.type)
    // }
    // if (filterBy.beds) {
    //     filteredStays = filteredStays.filter(stay => stay.beds === filterBy.beds)
    // }
    // if (filterBy.bathrooms) {
    //     filteredStays = filteredStays.filter(stay => stay.bathrooms === filterBy.bathrooms)
    // }
    if (filterBy.amenities.length) {
        filteredStays = filteredStays.filter(stay => filterBy.amenities.every(amenity => stay.amenities.includes(amenity)))
    }
    return (filteredStays)
}

function getFilterFromSearchParams(searchParams) {
    const emptyFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in emptyFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

function getDefaultFilter() {
    return { minPrice: 50, maxPrice: 2000, bedrooms: '', type: '', beds: '', bathrooms: '', amenities: [], isParams: false }
}



// async function query(filterBy = getDefaultFilter()) {
//     return storageService.query(STAY_STORAGE_KEY)
// return httpService.get(STAY_STORAGE_KEY, filterBy)
// }

function getById(stayId) {
    return storageService.get(STAY_STORAGE_KEY, stayId)
    // return httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
    // await storageService.remove(STORAGE_KEY, stayId)
    return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await storageService.put(STAY_STORAGE_KEY, stay)
        // savedStay = await httpService.put(`stay/${stay._id}`, stay)

    } else {
        // Later, owner is set by the backend
        stay.owner = userService.getLoggedinUser()
        savedStay = await storageService.post(STAY_STORAGE_KEY, stay)

        // savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt })
    return savedMsg
}


function getEmptyStay() {
    return {
        id: '',
        name: '',
        type: '',
        price: utilService.getRandomIntInclusive(1000, 9000),
        imgUrls: [],
        price: '',
        summary: '',
        amenities: [],
        labels: [],
        host: {},
        loc: {},
        reviews: [],
        likedByUsers: [],
        capacity: ''
    }
}

function _createStays() {
    let stays = utilService.loadFromStorage(STAY_STORAGE_KEY) || []
    if (!stays || !stays.length) {
        for (let i = 0; i < 50; i++) {

            const stay = _createStay()
            stays.push(stay)
        }
        utilService.saveToStorage(STAY_STORAGE_KEY, stays)
    }

    return stays

}

function _createStay() {
    const imgs = [
        'https://news.airbnb.com/wp-content/uploads/sites/4/2019/06/PJM020719Q202_Luxe_WanakaNZ_LivingRoom_0264-LightOn_R1.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTESwKAxENfxuhNUFjv3RANhGoPIXKbbYshj_wdhFGE4Px0NUxJ578VAiQzNAkuq2LiCWI&usqp=CAU',
        'https://i0.wp.com/files.tripstodiscover.com/files/2019/11/Sunny-Cottage-with-Water-Views.jpg?resize=784%2C588',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8r9sd72zqSvexruPhx_ghtUodfeL4bXXrGiLtv1Xznk8EqmzfbiY86MgUOtDPYTt1QRk&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Y2Fva_khVXYKyP9cIO25ZQ9Mn3pkgOzXwRUqx2827thvLwxDDfNe30q3z3tIjNqoRuA&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-IiUDwwjvwM2mCpo2U9_Dv8hZMGcXAUGp3ceYWIJSCaCmsVV_roj0gd0YuNDizRfLb1M&usqp=CAU',
        'https://a0.muscache.com/im/pictures/miso/Hosting-571650106575065257/original/abf3b786-1117-4c8c-9f9f-783f1fd53eda.jpeg?im_w=720',

    ]
    const stayTypes = ['Entire place', 'Private rooms', 'Hotel rooms', 'Shared rooms']

    const stayAmenities = ['Cleaning products', 'Shampoo', 'Body soap', 'Hot water',
        'Shower gel', 'Hangers', 'Bed linens', 'Extra pillows and blankets', 'Room-darkening shades',
        'Ethernet connection', 'TV with standard cable', 'Crib', 'High chair', 'AC - split type ductless system',
        'Heating', 'Fire extinguisher', 'First aid kit', 'Refrigerator', 'Microwave', 'Kitchen', 'Mini fridge',
        'Freezer', 'Stove', 'Oven', 'Hot water kettle', 'Coffee maker: pour-over coffee', 'Wine glasses', 'Dining table']

    const stayLabels = ['lake', 'Amazing views', 'Castles', ' Amzaing pools', 'Mansions',
        'Historical homes', 'Ski-in/out', 'Riads', 'Luxe', 'OMG!', 'Grand pianos', 'Houserboats',
        'Top of the world', 'Islands', 'New', 'Tranding', 'Cabins', 'Boats', 'Tiny homes', 'Tropical',
        'Bed & breakfasts', 'Design', 'Beachfront', 'Farms', 'Arctic', 'Caves', 'Play', 'Iconic cities']

    const demoLocs = [{
        "country": "Portugal",
        "countryCode": "PT",
        "city": "Porto",
        "address": "17 Kombo st",
        "lat": -8.61308,
        "lng": 41.1413
    }, {
        "country": "France",
        "countryCode": "FR",
        "city": "Paris",
        "address": "16 Av Victor Hugo",
        "lat": 48.871938,
        "lng": 2.290538
    },
    {
        "country": "Spain",
        "countryCode": "ES",
        "city": "Madrid",
        "address": "Prta del Sol, 7",
        "lat": 40.4168,
        "lng": -3.7022
    }]

    function getDemoReview() {

        return {
            "id": utilService.makeId(),
            "txt": utilService.makeLorem(4),
            "rate": utilService.getRandomIntInclusive(1, 5),
            "by": {
                "_id": utilService.makeId(),
                "fullname": "Kuku Epta",
                "imgUrl": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6q9BznG8oztRJPy6U0iowu827IrJA4u-mzpk9jRyyWsES4La3RBP-SxuSxr8DuOffDB4&usqp=CAU'
            }
        }
    }

    return {
        _id: utilService.makeId(),
        name: utilService.makeLorem(3),
        type: stayTypes[utilService.getRandomIntInclusive(0, stayTypes.length - 1)],
        price: utilService.getRandomIntInclusive(100, 800),
        capacity: utilService.getRandomIntInclusive(2, 12),
        imgUrls: [imgs[utilService.getRandomIntInclusive(0, imgs.length - 1)],
        imgs[utilService.getRandomIntInclusive(0, imgs.length - 1)],
        imgs[utilService.getRandomIntInclusive(0, imgs.length - 1)],
        imgs[utilService.getRandomIntInclusive(0, imgs.length - 1)],
        imgs[utilService.getRandomIntInclusive(0, imgs.length - 1)]],
        summary: utilService.makeLorem(15),
        amenities: [stayAmenities[utilService.getRandomIntInclusive(0, stayAmenities.length - 1)],
        stayAmenities[utilService.getRandomIntInclusive(0, stayAmenities.length - 1)],
        stayAmenities[utilService.getRandomIntInclusive(0, stayAmenities.length - 1)],
        stayAmenities[utilService.getRandomIntInclusive(0, stayAmenities.length - 1)]],
        labels: [stayLabels[utilService.getRandomIntInclusive(0, stayLabels.length - 1)],
        stayLabels[utilService.getRandomIntInclusive(0, stayLabels.length - 1)],
        stayLabels[utilService.getRandomIntInclusive(0, stayLabels.length - 1)]],
        host: { _id: utilService.makeId(), fullname: 'moshe ha gadol', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6q9BznG8oztRJPy6U0iowu827IrJA4u-mzpk9jRyyWsES4La3RBP-SxuSxr8DuOffDB4&usqp=CAU' },
        loc: demoLocs[utilService.getRandomIntInclusive(0, demoLocs.length - 1)],
        reviews: [getDemoReview(), getDemoReview(), getDemoReview(), getDemoReview()],
        likedByUsers: [{ _id: utilService.makeId(), fullname: 'Kinki Uncle', imgUrl: 'https://preview.redd.it/8rfj7dyr4co91.jpg?auto=webp&s=fb9d08619d652e5c27086d16f15133fcb327928e' },
        { _id: utilService.makeId(), fullname: 'Asi Sassi', imgUrl: 'https://i.pinimg.com/736x/93/45/89/934589f3aa2f266b260de8bfeb3ae1ab.jpg' },
        { _id: utilService.makeId(), fullname: 'mr ass', imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyvM7m3XNTKot6plKwCy6tn56-1Rqxj4P8eMNJQl8BfSKgTdtcBIe45t_7BlIm6R9VdQE&usqp=CAU' }]
    }
}
//       "loc": {
//         "country": "Portugal",
//         "countryCode": "PT",
//         "city": "Porto",
//         "address": "17 Kombo st",
//         "lat": -8.61308,
//         "lng": 41.1413
//       },
//       "reviews": [
//         {
//           "id": "madeId",
//           "txt": "Very helpful hosts. Cooked traditional...",
//           "rate": 4,
//           "by": {
//             "_id": "u102",
//             "fullname": "user2",
//             "imgUrl": "/img/img2.jpg"
//           }
//         }
//       ],
//       "likedByUsers": ['mini-user'] // for user-wishlist : use $in
//     }
//   ]




// const stays = [
//     {
//       "_id": "10006546",
//       "name": "Ribeira Charming Duplex",
//       "type": "House",
//       "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
//       "price": 80.00,
//       "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",
//       "capacity": 8,
//       "amenities": [
//         "TV",
//         "Wifi",
//         "Kitchen",
//         "Smoking allowed",
//         "Pets allowed",
//         "Cooking basics"
//       ],
//       "labels": [
//         "Top of the world",
//         "Trending",
//         "Play",
//         "Tropical"
//       ],
//       "host": {
//         "_id": "u101",
//         "fullname": "Davit Pok",
//         "imgUrl": "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
//       },
//       "loc": {
//         "country": "Portugal",
//         "countryCode": "PT",
//         "city": "Porto",
//         "address": "17 Kombo st",
//         "lat": -8.61308,
//         "lng": 41.1413
//       },
//       "reviews": [
//         {
//           "id": "madeId",
//           "txt": "Very helpful hosts. Cooked traditional...",
//           "rate": 4,
//           "by": {
//             "_id": "u102",
//             "fullname": "user2",
//             "imgUrl": "/img/img2.jpg"
//           }
//         }
//       ],
//       "likedByUsers": ['mini-user'] // for user-wishlist : use $in
//     }
//   ]

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

//   const users = [
//     {
//       "_id": "u101",
//       "fullname": "User 1",
//       "imgUrl": "/img/img1.jpg",
//       "username": "user1",
//       "password": "secret"
//     },
//     {
//       "_id": "u102",
//       "fullname": "User 2",
//       "imgUrl": "/img/img2.jpg",
//       "username": "user2",
//       "password": "secret",
//       // "isOwner" : true // OPTIONAL
//     }
//   ]



// Homepage: TOP categories: Best Rate / Houses / Kitchen  - show all - link to Explore
// Renders a <StayList> with <StayPreview> with Link to <StayDetails>   url: /stay/123
// See More => /explore?topRate=true
// See More => /explore?type=House
// See More => /explore?amenities=Kitchen
// Explore page:
// stayService.query({type: 'House'})

// UserDetails
//  basic info
//  visitedStays => orderService.query({userId: 'u101'})
//  myStayOrders => orderService.query({hostId: 'u101'})
//  ownedStays => stayService.query({hostId: 'u103'})

// StayEdit - make it super easy to add Stay for development
// StayList, StayPreview
// Order, confirm Order
// Lastly: StayExplore, Filtering



// Example - figuring up if the user is an owner:
// userService.login()
//  const userStays = stayService.query({ownerId: loggeinUser._id})
//  loggeinUser.isOwner = userStays.length > 0


