import axios from 'axios'

const initialState = {
    postedAuctions: [],
}

// ACTION TYPES
const GET_ALL_AUCTIONS = "GET_ALL_AUCTIONS"
const GET_ALL_AUCTIONS_FULFILLED = "GET_ALL_AUCTIONS_FULFILLED"

const POST_BID = "POST_BID"
const POST_BID_FULFILLED = "POST_BID_FULFILLED"


function reducer(state= initialState, action){
    
    switch(action.type){ 
        case GET_ALL_AUCTIONS_FULFILLED:
            return Object.assign({}, state, {postedAuctions: action.payload})
        case POST_BID_FULFILLED:
            return state
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
        })
    }
}



export default reducer