import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getMyWatchlist, getMyAuctions} from '../redux/dashboard_reducer'
import Modal from './Modal'



class Dashboard extends Component {
    state = {
        auctionDetail: {},
        showModal: false

    }
    
    componentDidMount = ( )=> {
        this.props.getMyWatchlist()
    }

    render(){
        return(
            <div className="dash-container">
                <div className='sub-nav'>
                    <h2>My Watchlist</h2>
                    <h2>My Auctions</h2>
                </div>
                <div className='watchlist-container'>
                {this.props.myWatchlist.map((auction, index)=>{
                    const {coral_name, coral_img_url} = auction;
                    return(
                        <div onClick={() => this.setState({ auctionDetail: auction, showModal: true})} className='auction-container' key={index}>
                            <h3 className='auction-thumbnail'>{coral_img_url}</h3>
                            <h3>Name:{coral_name}</h3>
                        </div>
                    )
                })}
                {this.state.showModal ? (
                    <Modal
                        auction={this.state.auctionDetail}
                        onClose={() => this.setState({ showModal: false, auctionDetail: {}})}
                    /> ) : null }
               </div>
               <div className='my-auctions-container'>
               </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {dashboard} = state;
    return {
        myAuctions: dashboard.myAuctions,
        myWatchlist: dashboard.myWatchlist
    }
}

export default connect(mapStateToProps, {getMyAuctions, getMyWatchlist}) (Dashboard) 


