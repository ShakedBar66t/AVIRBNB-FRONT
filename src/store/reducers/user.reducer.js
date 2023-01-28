import { userService } from '../../services/user.service.js'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_COUNT = 'CHANGE_COUNT'
export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'
export const SET_SCORE = 'SET_SCORE'
export const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL'
export const TOGGLE_CHECKOUT_MODAL = 'TOGGLE_CHECKOUT_MODAL'
export const TOGGLE_IS_SHADOW = 'TOGGLE_IS_SHADOW'
export const TOGGLE_IS_SIGNUP_MODAL = 'TOGGLE_IS_SIGNUP_MODAL'
export const REFRESH_LOGIN_MODAL = 'REFRESH_LOGIN_MODAL'

const initialState = {
    count: 10,
    user: userService.getLoggedinUser(),
    users: [],
    isLoginModalOpen: false,
    isShadow: false,
    watchedUser: null,
    isSignUpModal: false,
    isCheckoutModal: true,
    isRefreshedLoginModal: true,
    
}

export function userReducer(state = initialState, action) {
    var newState = state
    let users
    switch (action.type) {

        case INCREMENT:
            newState = { ...state, count: state.count + 1 }
            break
        case DECREMENT:
            newState = { ...state, count: state.count - 1 }
            break
        case CHANGE_COUNT:
            newState = { ...state, count: state.count + action.diff }
            break
        case TOGGLE_LOGIN_MODAL:
            newState = { ...state, isLoginModalOpen: !state.isLoginModalOpen }
            break
        case TOGGLE_CHECKOUT_MODAL:
            console.log('statearwaewae',state.isCheckoutModal)
            newState = { ...state, isCheckoutModal: !state.isCheckoutModal }
            break
        case REFRESH_LOGIN_MODAL:
            newState = { ...state, isRefreshedLoginModal: !state.isRefreshedLoginModal }
            break
        case TOGGLE_IS_SIGNUP_MODAL:
            newState = { ...state, isSignUpModal: !state.isSignUpModal }
            break
        case TOGGLE_IS_SHADOW:
            newState = { ...state, isShadow: !state.isShadow }
            break
        case SET_USER:
            newState = { ...state, user: action.user }
            break
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break
        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break
        case SET_USERS:
            console.log(action.users)
            newState = { ...state, users: action.users }
            break
        case SET_SCORE:
            newState = { ...state, user: { ...state.user, score: action.score } }
            break
            case UPDATE_USER:
                
                newState = { ...state, user:action.savedUser }
                break

        default:
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
