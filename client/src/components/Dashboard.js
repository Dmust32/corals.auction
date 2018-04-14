import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMyWatchlist, getMyAuctions} from '../redux/dashboard_reducer'
import Modal from './Modal'
import NewAuctionModal from './NewAuctionModal'




class Dashboard extends Component {
    state = {
        auctionDetail: {},
        showModal: false,
        showNewAuctionModal: false,
        showMyWatchlist: true,
        showMyAuctions: false

    }
    
    componentDidMount = ( )=> {
        this.props.getMyWatchlist();
        this.props.getMyAuctions();
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
                    const {coral_name, coral_img_url} = auction;
                    return(
                        <div onClick={() => this.setState({ auctionDetail: auction, showModal: true})} className='auction-container' key={index}>
                            <h3 className='auction-thumbnail'>{coral_img_url}</h3>
                            <h3>Name:{coral_name}</h3>
                        </div>
                    )
                }): null}

                {this.state.showMyAuctions ? this.props.myAuctions.map((auction, index)=>{
                    const {coral_name, coral_img_url} = auction;
                    return(
                        <div onClick={() => this.setState({ auctionDetail: auction, showModal: true})} className='auction-container' key={index}>
                            <h3 className='auction-thumbnail'>{coral_img_url}</h3>
                            <h3>Name:{coral_name}</h3>
                        </div>
                    )
                }): null}

                {this.state.showModal ? (
                    <Modal
                        auction={this.state.auctionDetail}
                        onClose={() => this.setState({ showModal: false, auctionDetail: {}})}
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

export default connect(mapStateToProps, {getMyAuctions, getMyWatchlist}) (Dashboard) 


