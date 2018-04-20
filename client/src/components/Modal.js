import React from 'react'
import '../Modal.css'



export default function Modal ({ 
    auction, 
    onClose, 
    updateBidAmount, 
    postBid,
    bid_amount, 
    addToWatchlist, 
    hideFooter, 
    showMyWatchlist, 
    deleteFromWatchlist ,
    updateCurrentBid
}) {
    const {id: auction_id} = auction
    var minimum_bid = Number(auction.current_bid) + Number(auction.bid_increment)

    
    return (
        <div className='auction-modal'>
            <div onClick={onClose} style={{ position: 'fixed', width: '100%', height: '100vh', backgroundColor: 'rgba(0, 0, 0, .6)'}} />
            <div className='auction-modal-container'>
                <img src={auction.coral_img_url} alt='coral-thumbnail-modal'/>
                <div className='auction-modal-data-container'>
                    <div className='coral-name-desc'>
                        <h3>Name: {auction.coral_name}</h3>
                        <h3>Description: {auction.coral_desc}</h3>
                    </div>
                    <div className='bid-info-container'>
                        <h3>Auction Ends: {auction.auction_end}</h3>
                        <h3>Starting Bid: ${auction.starting_bid}</h3>
                        <h3>Bid Increment: ${auction.bid_increment}</h3>
                        <h3>Current Bid: ${auction.current_bid}</h3> 
                    </div>
                    
                </div>
                {! hideFooter ? 
                <div className='place-bid-container'>
                    
                        <button onClick={()=> addToWatchlist(auction_id)}>Add to My Watchlist</button>
                        <h3>Minimum Bid: ${minimum_bid}</h3>
                        <input placeholder='$0.00' onChange={(e)=> updateBidAmount(e.target.value)}/>  
                        <button onClick={()=>postBid({bid_amount,auction_id })
                            .then(()=>updateCurrentBid({auction_id, bid_amount}))
                                .then(onClose)}>Bid</button> 
                    
                </div> : null
                }
                {showMyWatchlist ? 
                    <div>
                        <button onClick={()=>deleteFromWatchlist(auction_id).then(onClose)}>Remove from Watchlist</button>
                    </div>: null}
            </div>
        </div>
    )
}


