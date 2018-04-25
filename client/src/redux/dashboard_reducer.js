import axios from 'axios'

const initialState = {
    myAuctions: [],
    myWatchlist: [],
    isLoggedIn: false
    
}

// ACTION TYPES
const GET_MY_AUCTIONS = "GET_MY_AUCTIONS"
const GET_MY_AUCTIONS_FULFILLED = "GET_MY_AUCTIONS_FULFILLED"
const GET_MY_WATCHLIST = "GET_MY_WATCHLIST"
const GET_MY_WATCHLIST_FULFILLED = "GET_MY_WATCHLIST_FULFILLED"
const POST_NEW_AUCTION = "POST_NEW_AUCTION"
const POST_NEW_AUCTION_FULFILLED = "POST_NEW_AUCTION_FULFILLED"
const DELETE_FROM_WATCHLIST = "DELETE_FROM_WATCHLIST"
const DELETE_FROM_WATCHLIST_FULFILLED = "DELETE_FROM_WATCHLIST_FULFILLED"


function reducer(state= initialState, action){
    switch(action.type){
        case GET_MY_AUCTIONS_FULFILLED:
            return Object.assign({}, state, {myAuctions: action.payload})
        case GET_MY_WATCHLIST_FULFILLED:
            return Object.assign({}, state, {myWatchlist: action.payload})
        case POST_NEW_AUCTION_FULFILLED:
            return Object.assign({}, state, {myAuctions: action.payload})
        case DELETE_FROM_WATCHLIST_FULFILLED:
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
            return res.data
        })
    }
}

export function postNewAuction({coral_name,
    coral_type,
    coral_desc,
    auction_end,
    starting_bid,
    bid_increment,
    current_bid,
    coral_img_url
}){
return {
    type: POST_NEW_AUCTION,
    payload: axios.post('/api/auctions', {coral_name,
        coral_type,
        coral_desc,
        auction_end,
        starting_bid,
        bid_increment,
        current_bid,
        coral_img_url
    }).then(res=>{
        return res.data
    })}
}

export function deleteFromWatchlist(id){
    return {
        type: DELETE_FROM_WATCHLIST,
        payload: axios.delete(`/api/auctions/watchlist/${id}`).then(res=>{
            return res.data
        }
        )
    }
}


export default reducer