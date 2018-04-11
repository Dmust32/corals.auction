import {createStore, applyMiddleware, combineReducers} from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import auctionReducer from './auctions_reducer'
import dashboardReducer from './dashboard_reducer'

const reducer = combineReducers({
    auctions: auctionReducer, 
    dashboard: dashboardReducer
})

export default createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(reduxPromiseMiddleware())
)