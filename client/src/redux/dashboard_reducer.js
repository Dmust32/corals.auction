import axios from 'axios'

const initialState = {
    myAuctions: [],
    myWatchlist: [],
    
}

// ACTION TYPES
const GET_MY_AUCTIONS = "GET_MY_AUCTIONS"
const GET_MY_AUCTIONS_FULFILLED = "GET_MY_AUCTIONS_FULFILLED"
const GET_MY_WATCHLIST = "GET_MY_WATCHLIST"
const GET_MY_WATCHLIST_FULFILLED = "GET_MY_WATCHLIST_FULFILLED"



function reducer(state= initialState, action){
    switch(action.type){
        case GET_MY_AUCTIONS_FULFILLED:
            return Object.assign({}, state, {myAuctions: action.payload})
        case GET_MY_WATCHLIST_FULFILLED:
            return Object.assign({}, state, {myWatchlist: action.payload})
        
        default:
            return state
    }
}

export function getMyWatchlist(){
    return {
        type: GET_MY_WATCHLIST,
        payload: axios.get('/api/auctions/watchlist').then(res => {

            return res.data
        })
    }
}

export function getMyAuctions(){
    return{
        type: GET_MY_AUCTIONS,
        payload: axios.get('/api/my_auctions').then(res =>{
            console.log('myAuctions', res.data)
            return res.data
        })
    }



}

export default reducer