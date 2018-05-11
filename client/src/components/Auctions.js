import React, {Component} from 'react'
import Modal from './Modal'
import {connect} from 'react-redux'
import {getAllAuctions} from '../redux/auctions_reducer'
import {postBid, addToWatchlist, updateCurrentBid} from '../redux/auctions_reducer'
import Nav from './Nav'
import AuctionCountDown from './AuctionCountDown'
import socket from '../Utils/Socket'
import ProtectedComponent from './ProtectedComponent'
import { toast} from 'react-toastify'


class Auctions extends Component {
    constructor(props){
        super(props);
        this.state= {
            auctionDetail: {},
            showModal: false,
            bid_amount: 0,
            filterBy: '',
            auctionTypeFilter: false
    
        }

        socket.on('RECEIVE_BID', ()=>{
            this.props.getAllAuctions()
        });
    }
   

    componentDidMount = ( )=> {
        this.props.getAllAuctions()
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
            
                <div className="sub-nav">
                    <h3>All Auctions</h3>
                    <div className='filter-container'>
                        <h3 className='filter'>Filter By: </h3> 
                            <select>
                                <option value=''>All Types</option>                                
                                <option value='SPS'>SPS</option>
                                <option value='LPS'>LPS</option>
                                <option value='Soft'>Soft</option>
                            </select>
                            {/* <select>
                                <option value=''>All Auctions</option>
                                <option value='BuyItNow'>Buy it Now</option>
                                <option value='Auction'>Auction</option>
                            </select> */}
                        
                    </div>
                </div>
              
                <div className='watchlist-container'>
                {this.props.postedAuctions ? this.props.postedAuctions.map((auction, index)=>{
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
                {this.state.showModal ? (
                    <Modal
                        updateBidAmount={this.updateBidAmount}
                        postBid = {this.props.postBid}
                        bid_amount = {this.state.bid_amount}
                        auction={this.state.auctionDetail}
                        addToWatchlist={this.props.addToWatchlist}
                        updateCurrentBid = {this.props.updateCurrentBid}
                        onClose={() => this.setState({ showModal: false, auctionDetail: {}, bid_amount: 0})}
                        placeBidSuccess = {this.placeBidSuccess}
                    /> ) : null }
               </div>
               </ProtectedComponent>
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

