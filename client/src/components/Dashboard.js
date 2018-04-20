import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMyWatchlist, getMyAuctions, deleteFromWatchlist} from '../redux/dashboard_reducer'
import {updateCurrentBid} from '../redux/auctions_reducer'
import Modal from './Modal'
import NewAuctionModal from './NewAuctionModal'
import axios from 'axios'




class Dashboard extends Component {
    state = {
        auctionDetail: {},
        showModal: false,
        showNewAuctionModal: false,
        showMyWatchlist: true,
        showMyAuctions: false,
        

    }
    
    componentDidMount = ( )=> {
        this.props.getMyWatchlist();
        this.props.getMyAuctions();
        // axios.get('/auth/me').then(res=>{
        //     if(res.user){
        //         console.log('hitting if', this.state.isLoggedIn)
        //         this.setState({isLoggedIn: true})
        //     } else{
        //         console.log('hitting else', this.state.isLoggedIn)
        //         this.setState({isLoggedIn: false})
        //         }
        //     }
        // )
    }

   
    

    render(){
        
        return(
            <div className="dash-container">
                <div className='sub-nav'>
                    <h2 onClick={() => this.setState({showMyWatchlist: true, showMyAuctions: false})}>My Watchlist</h2>
                    <h2 onClick={() => this.setState({showMyWatchlist: false, showMyAuctions: true})}>My Auctions</h2>
                    <div className='new-auction'>
                        <h2 onClick={() => this.setState({showNewAuctionModal: true})}>Create Auction</h2>
                    </div>
                </div>
                <div className='watchlist-container'>
                {this.state.showMyWatchlist ? this.props.myWatchlist.map((auction, index)=>{
                    const {coral_name, coral_img_url, current_bid} = auction;
                    return(
                        <div onClick={() => this.setState({ auctionDetail: auction, showModal: true})} className='auction-container' key={index}>
                            <div className='auction-thumbnail'>{coral_img_url}</div>
                            <h3>Name:{coral_name}</h3>
                            <h3>Current Bid: ${current_bid}</h3>
                        </div>
                    )
                }): null}

                {this.state.showMyAuctions ? this.props.myAuctions.map((auction, index)=>{
                    const {coral_name, coral_img_url, current_bid} = auction;
                    return(
                        <div onClick={() => this.setState({ auctionDetail: auction, showModal: true})} className='auction-container' key={index}>
                            <h3 className='auction-thumbnail'>{coral_img_url}</h3>
                            <h3>Name:{coral_name}</h3>
                            <h3>Current Bid: ${current_bid}</h3>
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
                    /> ) : null }

                {this.state.showNewAuctionModal ? (
                    <NewAuctionModal
                        onClose={() => this.setState({ showNewAuctionModal: false })}
                     /> ): null}

               </div>
               
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
        updateCurrentBid}) (Dashboard) 


