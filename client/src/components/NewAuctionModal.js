import React, {Component} from 'react'
import '../Modal.css'
import '../NewAuctionModal.css'
import {connect} from 'react-redux'
import {postNewAuction} from '../redux/dashboard_reducer'
import DragAndDropPic from './DragAndDropPic'
import {toast} from 'react-toastify'


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
        this.setState({starting_bid: bid, current_bid: bid})
    }
    updateBidIncrement=(amount)=>{
        this.setState({bid_increment: amount})
    }

    setImageUrl=(url)=>{
        var newUrl= url.substring(0, url.indexOf('?')) 
        this.setState({coral_img_url: newUrl})
    }

    onSubmission = (coral_name,
        coral_type,
        coral_desc,
        auction_end,
        starting_bid,
        bid_increment,
        current_bid, 
        coral_img_url) => {
        if (!coral_name){
            toast.warning('Coral Name Required')
            return false
        } 
        if (!coral_type){
            toast.warning('Type Required')
            return false
        }
        if (!auction_end){
            toast.warning('End Date Required')
            return false
        }
        if (!starting_bid){
            toast.warning('Starting Bid Required')
            return false
        }
        if (!bid_increment){
            toast.warning('Bid Increment Required')
            return false
        }
        if (!coral_img_url){
            toast.warning('Coral Image Required')
            return false
        }
        this.props.postNewAuction({coral_name,
            coral_type,
            coral_desc,
            auction_end,
            starting_bid,
            bid_increment,
            current_bid, 
            coral_img_url}).then(this.setState({coral_img_url: ''})).then(this.props.onClose)
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
            <div className='new-auction-modal-container'>
                <div className='img-container'>
                    {!this.state.coral_img_url?
                    <div className='dropzone'>
                        <DragAndDropPic setImageUrl = {this.setImageUrl}/> 
                    </div> : 
                    <div >
                        <img src={this.state.coral_img_url} alt='coral img'/>
                    </div>}
                    <form className='new-auction-inputs-container'>
                        <div className='coral-name-desc'>
                            <h3>Name:<input maxLength='30' onChange={(e)=>{this.updateCoralName(e.target.value)}} required/></h3>
                        <div className='new-auction-coral-type'>
                            <h3>Type: </h3>
                            <h5><input type='checkbox' value ='SPS' onChange={(e)=>{this.updateCoralType(e.target.value)}} />SPS</h5>
                            <h5><input type='checkbox' value ='LPS' onChange={(e)=>{this.updateCoralType(e.target.value)}} />LPS</h5>
                            <h5><input type='checkbox' value ='Soft' onChange={(e)=>{this.updateCoralType(e.target.value)}} />Soft</h5>  
                        </div>  
                        <div className='desc'>                      
                            <h3 >Description:</h3>
                            <textarea id='description-input' maxLength='120' onChange={(e)=>{this.updateCoralDesc(e.target.value)}}/>
                        </div>
                        </div>
                    </form>
                </div>
                    <form>
                        <div className='bid-info-container'>
                            <h3>Auction Ends:<input type='datetime-local' onChange={(e)=>{this.updateAuctionEnd(e.target.value)}} required/></h3>
                            <h3>Starting Bid:<input onChange={(e)=>{this.updateStartingBid(e.target.value)}} required/></h3>
                            <h3>Bid Increment:<input onChange={(e)=>{this.updateBidIncrement(e.target.value)}} required/></h3>
                            {/* <h3>Current Bid:<input onChange={(e)=>{this.updateCurrentBid(e.target.value)}} /></h3>  */}
                        </div>
                        <button className='bid-button' type='submit' onClick={()=>{this.onSubmission(coral_name,
                            coral_type,
                            coral_desc,
                            auction_end,
                            starting_bid,
                            bid_increment,
                            current_bid, 
                            coral_img_url)}}>Post</button>
                        <button className='delete-from-watchlist' onClick={this.props.onClose}>Cancel</button>
                    </form>
            </div>
        </div>
    )
}
}

export default connect(null, {postNewAuction})(NewAuctionModal)

