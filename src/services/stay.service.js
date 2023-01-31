
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { storageService } from './async-storage.service.js'
const STAY_STORAGE_KEY = 'stayDB'

const BASE_URL = 'stay/'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg,
    getAvrStayRating,
    getDefaultFilter,
    getFilterFromSearchParams,
    getDefaultFilterForHeader
}

function getAvrStayRating(reviews) {
    const totalRate = reviews.reduce((acc, review) => {
        return acc += review.rate
    }, 0)
    return (totalRate / reviews.length).toFixed(2)
}

///////////////////////////////// QUERY BACK
async function query(filterBy) {
    console.log(filterBy)
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

////////////////////////////////////// FRONT ONLY
// async function query(filterBy) {

//     // const stays = await storageService.query(STAY_STORAGE_KEY)
//     if (!filterBy) return stays
//     let filteredStays = stays.filter(stay => stay.price >= filterBy.minPrice && stay.price <= filterBy.maxPrice)
//     if (filterBy.amenities.length) {
//         filteredStays = filteredStays.filter(stay => filterBy.amenities.every(amenity => stay.amenities.includes(amenity)))
//     }
//     return (filteredStays)
// }

function getFilterFromSearchParams(searchParams) {
    const emptyFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in emptyFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}
function getDefaultFilterForHeader() {
    return { location: 'flexible', guests: { Adults: 1, Children: 0, Infants: 0, Pets: 0, Total: 1 }, checkIn: 'flexible', checkOut: 'flexible' }
}
function getDefaultFilter() {
    return { minPrice: 50, maxPrice: 100, bedrooms: '', type: [], beds: '', bathrooms: '', amenities: [], isParams: false, location: 'flexible', guests: { Adults: 1, Children: 0, Infants: 0, Pets: 0, Total: 1 }, checkIn: 'flexible', checkOut: 'flexible' }
}

// function getById(stayId) {
//     return storageService.get(STAY_STORAGE_KEY, stayId)
//     // return httpService.get(`stay/${stayId}`)
// }

async function remove(stayId) {
    // await storageService.remove(STORAGE_KEY, stayId)
    return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
    var savedStay
    if (stay._id) {
        // savedStay = await storageService.put(STAY_STORAGE_KEY, stay)
        savedStay = await httpService.put(`stay/${stay._id}`, stay)

    } else {
        // Later, owner is set by the backend
        stay.host = userService.getLoggedinUser()
        // savedStay = await storageService.post(STAY_STORAGE_KEY, stay)

        savedStay = await httpService.post('stay', stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt })
    return savedMsg
}

function getEmptyStay() {
    return {
        name: '',
        type: '',
        price: '',
        imgUrls: [],
        price: '',
        summary: '',
        amenities: [],
        labels: [],
        host: {},
        loc: {},
        reviews: [],
        likedByUsers: [],
        capacity: '',
        bathrooms: '',
        bedrooms: '',
    }
}
window.cs = stayService