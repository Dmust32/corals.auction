import React from 'react'
import '../Modal.css'


export default function Modal ({ auction, onClose, updateBidAmount, postBid, bid_amount }) {
    const auction_id = auction.id
    
    return (
        <div className='auction-modal'>
            <div onClick={onClose} style={{ position: 'fixed', width: '100%', height: '100vh', backgroundColor: 'rgba(0, 0, 0, .6)'}} />
            <div className='auction-modal-container'>
                <img src={auction.coral_img_url} alt='coral-thumbnail-modal'/>
                <div className='auction-modal-data-container'>
                    <div className='coral-name-desc'>
                        <h3>Name:{auction.coral_name}</h3>
                        <h3>Description:{auction.coral_desc}</h3>
                    </div>
                    <div className='bid-info-container'>
                        <h3>Auction Ends:{auction.auction_end}</h3>
                        <h3>Starting Bid:{auction.starting_bid}</h3>
                        <h3>Bid Increment:{auction.bid_increment}</h3>
                        <h3>Current Bid:{auction.current_bid}</h3> 
                    </div>
                    
                </div>
                <div className='place-bid-container'>
                        <input placeholder='$0.00' onChange={(e)=> updateBidAmount(e.target.value)}/>
                        <button onClick={()=>postBid({bid_amount, auction_id })}>Bid</button>
                </div>
            </div>
        </div>
    )
}


