import { createStore, combineReducers } from 'redux'

import { userReducer } from './reducers/user.reducer.js'
import { reviewReducer } from './review.reducer'
import { systemReducer } from './system.reducer'
import { stayReducer } from './reducers/stay.reducer.js'
import { orderReducer } from './reducers/order.reducer.js'

const rootReducer = combineReducers({
    stayModule: stayReducer,
    userModule: userReducer,
    orderModule: orderReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})



