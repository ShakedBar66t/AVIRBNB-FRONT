import { promised } from 'q'
import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const USER_STORAGE_KEY = 'userDB'
export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore,
    save
}

window.userService = userService
_createUsers()


function getUsers() {
    return storageService.query(USER_STORAGE_KEY)
    // return httpService.get(`user`)
}


async function save(user) {
    // console.log(user)
    var savedUser
    if (user._id) {
        let currUser = await storageService.get(USER_STORAGE_KEY,user._id)
        user.password = currUser.password
        savedUser = await storageService.put(USER_STORAGE_KEY, user)
        // savedUser = await httpService.put(`user/${user._id}`, user)

    } else {
        // Later, owner is set by the backend
        user = userService.getLoggedinUser()
        savedUser = await storageService.post(USER_STORAGE_KEY, user)

        // savedUser = await httpService.post('stay', stay)
    }
    console.log('saved user sdaskldsaklJD',savedUser)
    return savedUser
}

async function getById(userId) {
    const user = await storageService.get(USER_STORAGE_KEY, userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove(USER_STORAGE_KEY, userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
    const user = await storageService.get(USER_STORAGE_KEY, _id)
    user.score = score
    await storageService.put(USER_STORAGE_KEY, user)

    // const user = await httpService.put(`user/${_id}`, {_id, score})
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query(USER_STORAGE_KEY)
    console.log('usersss', users, 'usercred', userCred)
    const user = users.find(user => user.email === userCred.email && user.password === userCred.password)
    console.log('current user 123',user)
    
    // const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }

    else {
        return Promise.reject('Invalid Login')
    }
}
async function signup(userCred) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', userCred, 'userrrrrr')
    // userCred.score = 1000
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post(USER_STORAGE_KEY, userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


 export function saveLocalUser(user) {
    console.log(user)
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, email: user.email }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

export function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()

function _createUsers() {
    let users = utilService.loadFromStorage(USER_STORAGE_KEY) || []

    if (!users || !users.length) {
        users = [
            {
                "fullname": "Yonatan Finerman",
                "imgUrl": "https://assets.audiomack.com/giga-chad/02531741933338421bcd3e89f94f062717dcc76c35dfc439b2c83ff0b5a83d4a.jpeg",
                "email": "luba12@bezeqint.net",
                "password": "a1234567",
                "_id": "622f3401e36c59e6164fab4d"
            },
            {
                "fullname": "Leo",
                "imgUrl": "https://robohash.org/59985?set=set1",
                "email": "luba13@bezeqint.net",
                "password": "a1234567",
                "_id": "622f3401e36c59e6164fab4e"
            },
            {
                "fullname": "Margaux",
                "imgUrl": "https://robohash.org/3805403?set=set1",
                "email": "3805403",
                "password": "Margaux",
                "id": "3805403",
                "_id": "622f3401e36c59e6164fab4f"
            },
            {
                "fullname": "Francine",
                "imgUrl": "https://robohash.org/25851994?set=set1",
                "email": "25851994",
                "password": "Francine",
                "id": "25851994",
                "_id": "622f3401e36c59e6164fab50"
            },
            {
                "fullname": "Winnie",
                "imgUrl": "https://robohash.org/1205536?set=set1",
                "email": "1205536",
                "password": "Winnie",
                "id": "1205536",
                "_id": "622f3401e36c59e6164fab51"
            },
            {
                "fullname": "Erin",
                "imgUrl": "https://robohash.org/33711606?set=set1",
                "email": "33711606",
                "password": "Erin",
                "id": "33711606",
                "_id": "622f3401e36c59e6164fab52"
            },
            {
                "fullname": "Gustavo",
                "imgUrl": "https://robohash.org/16833983?set=set1",
                "email": "16833983",
                "password": "Gustavo",
                "id": "16833983",
                "_id": "622f3401e36c59e6164fab53"
            },
            {
                "fullname": "Fernanda",
                "imgUrl": "https://robohash.org/18223142?set=set1",
                "email": "18223142",
                "password": "Fernanda",
                "id": "18223142",
                "_id": "622f3401e36c59e6164fab54"
            },
            {
                "fullname": "Stephanie",
                "imgUrl": "https://robohash.org/39214712?set=set1",
                "email": "39214712",
                "password": "Stephanie",
                "id": "39214712",
                "_id": "622f3401e36c59e6164fab55"
            },]

        utilService.saveToStorage(USER_STORAGE_KEY, users)
    }
    return users
}



