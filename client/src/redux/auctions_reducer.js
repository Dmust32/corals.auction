import axios from 'axios'
import socket from '../Utils/Socket'

const initialState = {
    postedAuctions: [],
}

// ACTION TYPES
const GET_ALL_AUCTIONS = "GET_ALL_AUCTIONS"
const GET_ALL_AUCTIONS_FULFILLED = "GET_ALL_AUCTIONS_FULFILLED"

const POST_BID = "POST_BID"
const POST_BID_FULFILLED = "POST_BID_FULFILLED"

const ADD_TO_WATCHLIST = "ADD_TO_WATCHLIST"
const ADD_TO_WATCHLIST_FULFILLED = "ADD_TO_WATCHLIST_FULFILLED"

const UPDATE_CURRENT_BID = "UPDATE_CURRENT_BID"
const UPDATE_CURRENT_BID_FULFILLED = "UPDATE_CURRENT_BID_FULFILLED"


function reducer(state= initialState, action){
    
    switch(action.type){ 
        case GET_ALL_AUCTIONS_FULFILLED:
            return Object.assign({}, state, {postedAuctions: action.payload})
        case POST_BID_FULFILLED:
            return state
        case ADD_TO_WATCHLIST_FULFILLED:
            return state
        case UPDATE_CURRENT_BID_FULFILLED:
            return Object.assign({}, state, {postedAuctions: action.payload})
        default:
            return state
    }
}

export function getAllAuctions(){
    return {
        type: GET_ALL_AUCTIONS,
        payload: axios.get('/api/auctions').then(res =>{
            return res.data
        })
    }
}

export function postBid({bid_amount, auction_id}){
    return {
        type: POST_BID,
        payload: axios.post('api/bid', {bid_amount, auction_id}).then(res=>{
            return res.data
        }).then(  () =>{
            console.log("hitting reducer send bid")
            socket.emit('SEND_BID', {
                bid_amount: bid_amount
            })
        })
    }
}

export function addToWatchlist(auction_id){
    return {
        type: ADD_TO_WATCHLIST,
        payload: axios.post('/api/auctions/watchlist', {auction_id}).then(res=>{
            return res.data
        })
    }
}

export function updateCurrentBid({bid_amount, auction_id}){
    return {
        type: UPDATE_CURRENT_BID,
        payload: axios.post('api/auctions/bid', {bid_amount, auction_id}).then(res => {
            return res.data
        })
    }
}



export default reducer