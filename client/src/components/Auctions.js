import React, {Component} from 'react'
import Modal from './Modal'
import {connect} from 'react-redux'
import {getAllAuctions} from '../redux/auctions_reducer'

class Auctions extends Component {
    state = {
        auctionDetail: {},
        showModal: false

    }

    componentDidMount = ( )=> {
        this.props.getAllAuctions()
    }

    render(){
        return(
            <div className="dash-container">
                <h3>Auctions</h3>
                <div className='watchlist-container'>
                {this.props.postedAuctions ? this.props.postedAuctions.map((auction, index)=>{
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

export default connect(mapStateToProps, {getAllAuctions}) (Auctions)