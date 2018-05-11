import React, {Component} from 'react'
import {connect} from 'react-redux'
import Nav from './Nav'
import {getMyWatchlist, getMyAuctions, deleteFromWatchlist} from '../redux/dashboard_reducer'
import {updateCurrentBid, postBid} from '../redux/auctions_reducer'
import Modal from './Modal'
import NewAuctionModal from './NewAuctionModal'
import AuctionCountDown from './AuctionCountDown'
import socket from '../Utils/Socket'
import ProtectedComponent from './ProtectedComponent'
import Mailbox from './Mailbox'
import { toast} from 'react-toastify'

class Dashboard extends Component {
    constructor(props){
        super(props);

        this.state = {
            auctionDetail: {},
            showModal: false,
            showNewAuctionModal: false,
            showMyWatchlist: true,
            showMyAuctions: false,
            showMyMailbox: false,
            bid_amount: 0
    
        }

        socket.on('RECEIVE_BID', ()=>{
            this.props.getMyWatchlist();
            this.props.getMyAuctions()
        });
    }
    

    
    componentDidMount = ( )=> {
        this.props.getMyWatchlist();
        this.props.getMyAuctions();
    }

    updateBidAmount = (amount) => {
        this.setState({bid_amount: amount})
        
    }

    placeBidSuccess = () => {
        toast.success("Successfully placed bid!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        })}

    render(){
        
        return(
            <div className="dash-container">
            <Nav />
            <ProtectedComponent>
            
                <div className='sub-nav'>
                    <h2 onClick={() => this.setState({showMyWatchlist: true, showMyAuctions: false, showMyMailbox: false})}>My Watchlist</h2>
                    <h2 onClick={() => this.setState({showMyWatchlist: false, showMyAuctions: true, showMyMailbox: false})}>My Auctions</h2>
                    <h2 onClick={() => this.setState({showMyWatchlist: false, showMyAuctions: false, showMyMailbox: true})}>Mailbox</h2>
                    <div className='new-auction'>
                        <h2 onClick={() => this.setState({showNewAuctionModal: true})}>Create Auction</h2>
                    </div>
                </div>
                <div className='watchlist-container'>
                {this.state.showMyWatchlist ? this.props.myWatchlist.map((auction, index)=>{
                    const {id,coral_name, coral_img_url, current_bid, auction_end} = auction;
                    return(
                        <div onClick={() => this.setState({ auctionDetail: auction, showModal: true})} className='auction-container' key={index}>
                            <img src={coral_img_url} alt="coral img" className='auction-thumbnail' />
                            
                            <h3>{coral_name}</h3>
                            <h3>Current Bid: ${current_bid}</h3>
                            <AuctionCountDown className='auction-countdown'
                                auction_end = {auction_end}
                                auction_id = {id}/>
                        </div>
                    )
                }): null}

                {this.state.showMyAuctions ? this.props.myAuctions.map((auction, index)=>{
                    const {id,coral_name, coral_img_url, current_bid, auction_end} = auction;
                    return(
                        <div onClick={() => this.setState({ auctionDetail: auction, showModal: true})} className='auction-container' key={index}>
                            <img src={coral_img_url} alt="coral img" className='auction-thumbnail' />
                            <h3>{coral_name}</h3>
                            <h3>Current Bid: ${current_bid}</h3>
                            <AuctionCountDown className='auction-countdown' auction_id = {id} auction_end = {auction_end}/>
                        </div>
                    )
                }): null}

                {this.state.showModal ? (
                    <Modal
                        auction={this.state.auctionDetail}
                        onClose={() => this.setState({ showModal: false, auctionDetail: {}})}
                        hideFooter={true}
                        showMyWatchlist={this.state.showMyWatchlist}
                        deleteFromWatchlist = {this.props.deleteFromWatchlist}
                        updateCurrentBid = {this.props.updateCurrentBid}
                        updateBidAmount={this.updateBidAmount}
                        postBid = {this.props.postBid}
                        bid_amount = {this.state.bid_amount}
                        placeBidSuccess = {this.placeBidSuccess}
                    /> ) : null }

                {this.state.showNewAuctionModal ? (
                    <NewAuctionModal
                        onClose={() => this.setState({ showNewAuctionModal: false })}
                     /> ): null}
                {this.state.showMyMailbox? 
                    <Mailbox/>: null}
               </div>
               </ProtectedComponent>
            </div>
            
        )
    }
}

function mapStateToProps(state){
    const {dashboard} = state;
    return {
        myAuctions: dashboard.myAuctions,
        myWatchlist: dashboard.myWatchlist,
        
    }
}

export default connect(mapStateToProps, 
    {getMyAuctions, 
        getMyWatchlist, 
        deleteFromWatchlist, 
        updateCurrentBid, 
        postBid}) (Dashboard) 


