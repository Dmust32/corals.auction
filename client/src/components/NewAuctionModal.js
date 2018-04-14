import React from 'react'
import '../Modal.css'

export default function NewAuctionModal ({ onClose }) {
    return (
        <div className='auction-modal'>
            <div onClick={onClose} style={{ position: 'fixed', width: '100%', height: '100vh', backgroundColor: 'rgba(0, 0, 0, .6)'}} />
            <div className='auction-modal-container'>
                {/* <img src={auction.coral_img_url} alt='coral-thumbnail-modal'/> */}
                <div className='auction-modal-data-container'>
                    <div className='coral-name-desc'>
                        <h3>Name:<input/></h3>
                        <h3>Description:<input/></h3>
                    </div>
                    <div className='bid-info-container'>
                        <h3>Auction Ends:<input/></h3>
                        <h3>Starting Bid:<input/></h3>
                        <h3>Bid Increment:<input/></h3>
                        <h3>Current Bid:<input/></h3> 
                    </div>
                    <button>Post</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    )
}

