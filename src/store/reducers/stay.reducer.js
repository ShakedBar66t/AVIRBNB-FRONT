export const SET_STAYS = 'SET_STAYS'
export const REMOVE_STAY = 'REMOVE_STAY'
export const ADD_STAY = 'ADD_STAY'
export const UPDATE_STAY = 'UPDATE_STAY'
export const ADD_TO_STAYT = 'ADD_TO_STAYT'
export const CLEAR_STAYT = 'CLEAR_STAYT'
export const UNDO_REMOVE_STAY = 'UNDO_REMOVE_STAY'
export const REMOVE_FROM_STAYT = 'REMOVE_FROM_STAYT'
export const TOGGLE_FILTER_MODAL = 'TOGGLE_FILTER_MODAL'
export const SET_SEARCH_DETAILS = 'SET_SEARCH_DETAILS'

const initialState = {
    stays: [],
    stayt: [],
    isFilterModalOpen: false,
    lastRemovedStay: null,
    searchDetails: { location: '', checkIn: '', checkOut: '', guests: { adults: 1, children: 0, infants: 0, pets: 0 } }
}

export function stayReducer(state = initialState, action) {
    var newState = state
    var stays
    var stayt
    switch (action.type) {
        case SET_STAYS:
            newState = { ...state, stays: action.stays }
            break
        case SET_SEARCH_DETAILS:
            console.log(action.filterBy)
            newState = { ...state, searchDetails: { ...action.filterBy } }
            console.log(initialState.searchDetails)
            break
        case REMOVE_STAY:
            const lastRemovedStay = state.stays.find(stay => stay._id === action.stayId)
            stays = state.stays.filter(stay => stay._id !== action.stayId)
            newState = { ...state, stays, lastRemovedStay }
            break
        case ADD_STAY:
            newState = { ...state, stays: [...state.stays, action.stay] }
            break
        case UPDATE_STAY:
            stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay)
            newState = { ...state, stays }
            break
        case ADD_TO_STAYT:
            newState = { ...state, stayt: [...state.stayt, action.stay] }
            break
        case REMOVE_FROM_STAYT:
            stayt = state.stayt.filter(stay => stay._id !== action.stayId)
            newState = { ...state, stayt }
            break
        case CLEAR_STAYT:
            newState = { ...state, stayt: [] }
            break
        case UNDO_REMOVE_STAY:
            if (state.lastRemovedStay) {
                newState = { ...state, stays: [...state.stays, state.lastRemovedStay], lastRemovedStay: null }
            }
            break
        case TOGGLE_FILTER_MODAL:
            newState = { ...state, isFilterModalOpen: !state.isFilterModalOpen }
            break
        default:
    }
    return newState
}
