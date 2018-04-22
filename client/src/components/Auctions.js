import React, {Component} from 'react'
import Modal from './Modal'
import {connect} from 'react-redux'
import {getAllAuctions} from '../redux/auctions_reducer'
import {postBid, addToWatchlist, updateCurrentBid} from '../redux/auctions_reducer'
import AuctionCountDown from './AuctionCountDown'

class Auctions extends Component {
    state = {
        auctionDetail: {},
        showModal: false,
        bid_amount: 0

    }

    componentDidMount = ( )=> {
        this.props.getAllAuctions()
    }

    updateBidAmount = (amount) => {
        this.setState({bid_amount: amount})
        console.log(this.state.bid_amount)
    }

    render(){
        return(
            <div className="dash-container">

                <div className="sub-nav">
                    <h3>All Auctions</h3>
                </div>
                <div className='watchlist-container'>
                {this.props.postedAuctions ? this.props.postedAuctions.map((auction, index)=>{
                    const {coral_name, coral_img_url, current_bid, auction_end} = auction;
                    return(
                        <div onClick={() => this.setState({ auctionDetail: auction, showModal: true})} className='auction-container' key={index}>
                            <h3 className='auction-thumbnail'>{coral_img_url}</h3>
                            <h3>Name: {coral_name}</h3>
                            <h3>Current Bid: ${current_bid}</h3>
                            <AuctionCountDown auction_end = {auction_end}/>
                        </div>
                    )
                }): null}
                {this.state.showModal ? (
                    <Modal
                        updateBidAmount={this.updateBidAmount}
                        postBid = {this.props.postBid}
                        bid_amount = {this.state.bid_amount}
                        auction={this.state.auctionDetail}
                        addToWatchlist={this.props.addToWatchlist}
                        updateCurrentBid = {this.props.updateCurrentBid}
                        onClose={() => this.setState({ showModal: false, auctionDetail: {}, bid_amount: 0})}
                        
                    /> ) : null }
               </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {auctions} = state;
    return {
       postedAuctions: auctions.postedAuctions
    }
}

export default connect(mapStateToProps, 
    {getAllAuctions, 
        postBid, 
        addToWatchlist,
        updateCurrentBid}) (Auctions)   

