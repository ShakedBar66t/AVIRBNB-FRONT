import { userService } from "../services/user.service.js"
import { store } from '../store/store.js'

import { showErrorMsg } from '../services/event-bus.service.js'
import { LOADING_DONE, LOADING_START } from "./system.reducer.js";
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER, TOGGLE_CHECKOUT_MODAL, TOGGLE_LOGIN_MODAL, TOGGLE_IS_SHADOW, TOGGLE_IS_SIGNUP_MODAL, UPDATE_USER } from "./reducers/user.reducer.js";

export function getActionUpdateUser(user) {
    // console.log('user from get action update', user)
    return {
        type: UPDATE_USER,
        user
    }
}

export async function loadUsers() {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
        throw err
    }
}

// export async function login(credentials) {
//     try {
//         const user = await userService.login(credentials)
//         store.dispatch({
//             type: SET_USER,
//             user
//         })
//         return user
//     } catch (err) {
//         console.log('Cannot login', err)

//         throw err
//     }
// }

// export async function signup(credentials) {
//     try {
//         const user = await userService.signup(credentials)
//         store.dispatch({
//             type: SET_USER,
//             user
//         })
//         return user
//     } catch (err) {
//         console.log('Cannot signup', err)
//         throw err
//     }
// }

// export async function logout() {
//     try {
//         await userService.logout()
//         store.dispatch({
//             type: SET_USER,
//             user: null
//         })

//     } catch (err) {
//         console.log('Cannot logout', err)
//         throw err
//     }
// }

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        console.log(user)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        showErrorMsg('Cannot load user')
        console.log('Cannot load user', err)
    }
}

export function toggleLoginModal(signup) {
    if (signup === 'signup') {
        store.dispatch({ type: TOGGLE_IS_SIGNUP_MODAL })
    }
    // toggleUserModal()
    // setLoginModal(!loginModal)
    store.dispatch({ type: TOGGLE_LOGIN_MODAL })
    store.dispatch({ type: TOGGLE_IS_SHADOW })
}

export function toggleCheckoutModal(order) {
    // if (signup === 'signup') {
    //     store.dispatch({ type: TOGGLE_IS_SIGNUP_MODAL })
    // }
    // toggleUserModal()
    // setLoginModal(!loginModal)
    store.dispatch({ type: TOGGLE_CHECKOUT_MODAL })
    store.dispatch({ type: TOGGLE_IS_SHADOW })
}

export async function updateUser(user) {
    console.log('user from actions', user)
    try {
        const savedUser = await userService.save(user)
        console.log('Updated user:', savedUser)
        userService.saveLocalUser(savedUser)
        // store.dispatch(getActionUpdateUser(savedUser))
        store.dispatch({ type: UPDATE_USER, savedUser })
        return savedUser
    }
    catch (err) {
        console.log('Cannot save stay', err)
        throw err
    }
}
// export async function updateUser(user) {
//     console.log('user from actions', user)
//     try {
//         const savedUser = await userService.save(user)
//         console.log('Updated user:', savedUser)
//         store.dispatch(getActionUpdateUser(savedUser))
//         return savedUser
//     }
//     catch (err) {
//         console.log('Cannot save stay', err)
//         throw err
//     }
// }

// export function toggleUserModal() {
//     setUserModal(!userModal)
// }



//////////////////////////////////////////// BACK


export async function login(credentials) {
    try {
        // console.log(credentials, 'user action')
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        // store.dispatch({ type: TOGGLE_IS_SHADOW })
        return user
    } catch (err) {
        // console.error('Cannot login:', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.error('Cannot logout:', err)
        throw err
    }
}

export async function signup(credentials) {
    // console.log(credentials)
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.error('Cannot signup:', err)
        throw err
    }
}
