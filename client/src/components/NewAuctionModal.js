import React, {Component} from 'react'
import '../Modal.css'
import {connect} from 'react-redux'
import {postNewAuction} from '../redux/dashboard_reducer'
import DragAndDropPic from './DragAndDropPic'


class NewAuctionModal extends Component  {
    constructor(props){
        super(props);
        this.state = {
            coral_name: '',
            coral_type: '',
            coral_desc: '',
            auction_end: '',
            starting_bid: '',
            bid_increment: '',
            current_bid: '',
            coral_img_url: ''

        }
    }

    updateCoralName=(name)=>{
        this.setState({coral_name: name})
    }
    updateCoralType=(type)=>{
        this.setState({coral_type: type})
    }
    updateCoralDesc=(desc)=>{
        this.setState({coral_desc: desc})
    }
    updateAuctionEnd=(time)=>{
        this.setState({auction_end: time})
    }
    updateStartingBid=(bid)=>{
        this.setState({starting_bid: bid})
    }
    updateBidIncrement=(amount)=>{
        this.setState({bid_increment: amount})
    }
    updateCurrentBid=(bid)=>{
        this.setState({current_bid: bid})
    }

    setImageUrl=(url)=>{
        var newUrl= url.substring(0, url.indexOf('?')) 
        this.setState({coral_img_url: newUrl})
        console.log('hitting the set image', newUrl)
    }

    render(){
       const{ coral_name,
            coral_type,
            coral_desc,
            auction_end,
            starting_bid,
            bid_increment,
            current_bid,
            coral_img_url} = this.state
    return (
        <div className='auction-modal'>
            <div onClick={this.props.onClose} style={{ position: 'fixed', width: '100%', height: '100vh', backgroundColor: 'rgba(0, 0, 0, .6)'}} />
            <div className='auction-modal-container'>
                {!this.state.coral_img_url?
                <DragAndDropPic setImageUrl = {this.setImageUrl}/> : 
                <img src={this.state.coral_img_url} alt='coral img'/>}
                <div className='auction-modal-data-container'>
                    <div className='coral-name-desc'>
                        <h3>Name:<input onChange={(e)=>{this.updateCoralName(e.target.value)}} required/></h3>
                        <h3>Type:<input onChange={(e)=>{this.updateCoralType(e.target.value)}} required/></h3>
                        <h3>Description:<input onChange={(e)=>{this.updateCoralDesc(e.target.value)}} required/></h3>
                    </div>
                    <div className='bid-info-container'>
                        <h3>Auction Ends:<input onChange={(e)=>{this.updateAuctionEnd(e.target.value)}} required/></h3>
                        <h3>Starting Bid:<input onChange={(e)=>{this.updateStartingBid(e.target.value)}} required/></h3>
                        <h3>Bid Increment:<input onChange={(e)=>{this.updateBidIncrement(e.target.value)}} required/></h3>
                        <h3>Current Bid:<input onChange={(e)=>{this.updateCurrentBid(e.target.value)}} /></h3> 
                    </div>
                    <button onClick={()=>{this.props.postNewAuction({coral_name,
                        coral_type,
                        coral_desc,
                        auction_end,
                        starting_bid,
                        bid_increment,
                        current_bid, 
                        coral_img_url}).then(this.setState({coral_img_url: ''})).then(this.props.onClose)}}>Post</button>
                    <button onClick={this.props.onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
}

export default connect(null, {postNewAuction})(NewAuctionModal)

