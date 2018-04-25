import React from 'react'
import '../Modal.css'
import AuctionCountDown from './AuctionCountDown'



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
                <div className="image-bid-info-container">
                    <img src={auction.coral_img_url} alt='coral-thumbnail-modal'/>
                    <div className='bid-info-container'>
                            <h3>Time Left: <AuctionCountDown auction_end = {auction.auction_end}/></h3>
                            <h3>Starting Bid: ${auction.starting_bid}</h3>
                            <h3>Bid Increment: ${auction.bid_increment}</h3>
                            <h3>Current Bid: ${auction.current_bid}</h3> 
                            {!hideFooter ? <button className="add-to-watchlist-button" onClick={()=> addToWatchlist(auction_id)}>Add to My Watchlist</button>: null}
                    </div>
                </div>
                <div className='auction-modal-data-container'>

                    <div className='coral-name-desc'>
                        <h3>Name: {auction.coral_name}</h3>
                        <h3>Type: {auction.coral_type}</h3>
                        <h3>Description: {auction.coral_desc}</h3>
                    </div>   

                    {! hideFooter ? 
                        <div className='place-bid-container'>
                            <h3>Minimum Bid: ${minimum_bid}</h3>
                            <input placeholder={'$'+ minimum_bid} onChange={(e)=> updateBidAmount(e.target.value)}/>  
                            <button className='bid-button' onClick={()=>postBid({bid_amount,auction_id })
                                .then(()=>updateCurrentBid({auction_id, bid_amount}))
                                .then(onClose)}>Place Bid</button> 
                        </div> : null
                    }  
                </div>
            
                {showMyWatchlist ? 
                    <div>
                        <button onClick={()=>deleteFromWatchlist(auction_id).then(onClose)}>Remove from Watchlist</button>
                    </div>: null}
            </div>
        </div>
    )
}


