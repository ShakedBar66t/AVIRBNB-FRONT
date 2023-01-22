export const SET_ORDERS = 'SET_ORDERS'
export const REMOVE_ORDER = 'REMOVE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const ADD_TO_ORDERT = 'ADD_TO_ORDERT'
export const CLEAR_ORDERT = 'CLEAR_ORDERT'
export const UNDO_REMOVE_ORDER = 'UNDO_REMOVE_ORDER'
export const REMOVE_FROM_ORDERT = 'REMOVE_FROM_ORDERT'
export const TOGGLE_FILTER_MODAL = 'TOGGLE_FILTER_MODAL'

const initialState = {
    orders: [],
    ordert: [],
    isFilterModalOpen: false,
    lastRemovedOrder: null,
}

export function orderReducer(state = initialState, action) {
    var newState = state
    var orders
    var ordert
    switch (action.type) {
        case SET_ORDERS:
            newState = { ...state, orders: action.orders }
            break
        case REMOVE_ORDER:
            const lastRemovedOrder = state.orders.find(order => order._id === action.orderId)
            orders = state.orders.filter(order => order._id !== action.orderId)
            newState = { ...state, orders, lastRemovedOrder }
            break
        case ADD_ORDER:
            newState = { ...state, orders: [...state.orders, action.order] }
            break
        case UPDATE_ORDER:
            orders = state.orders.map(order => (order._id === action.order._id) ? action.order : order)
            newState = { ...state, orders }
            break
        case ADD_TO_ORDERT:
            newState = { ...state, ordert: [...state.ordert, action.order] }
            break
        case REMOVE_FROM_ORDERT:
            ordert = state.ordert.filter(order => order._id !== action.orderId)
            newState = { ...state, ordert }
            break
        case CLEAR_ORDERT:
            newState = { ...state, ordert: [] }
            break
        case UNDO_REMOVE_ORDER:
            if (state.lastRemovedOrder) {
                newState = { ...state, orders: [...state.orders, state.lastRemovedOrder], lastRemovedOrder: null }
            }
            break
        case TOGGLE_FILTER_MODAL:
            newState = { ...state, isFilterModalOpen: !state.isFilterModalOpen }
            break
        default:
    }
    return newState
}
