import axios from 'axios'

const initialState = {
    postedAuctions: []
}

// ACTION TYPES
const GET_ALL_AUCTIONS = "GET_ALL_AUCTIONS"
const GET_ALL_AUCTIONS_FULLFILLED = "GET_ALL_AUCTIONS_FULLFILLED"

function reducer(state= initialState, action){
    switch(action.type){ 
        case GET_ALL_AUCTIONS_FULLFILLED:
        console.log('hit the action')
            return Object.assign({}, state, {postedAuctions: action.payload})
        default:
            return state
    }
}

export function getAllAuctions(){
    return {
        type: GET_ALL_AUCTIONS,
        payload: axios.get('/api/auctions').then(res =>{
            console.log('hitting reducer', res.data)
            return res.data
        })
    }
}

export default reducer