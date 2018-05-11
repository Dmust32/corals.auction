import React,  {Component} from 'react'
import {connect} from 'react-redux'
import {loginCheck} from '../redux/dashboard_reducer'
import NotLoggedIn from './NotLoggedIn'

class ProtectedComponent extends Component{

    componentDidMount=()=>{
        this.props.loginCheck()
    }

    render(){

        return(
            this.props.isLoggedIn ? this.props.children :  <NotLoggedIn/>
          
    
        )
    }
}


function mapStateToProps(state){
    const {dashboard} = state;
    return {
        isLoggedIn: dashboard.isLoggedIn
    }
}

export default connect(mapStateToProps, {loginCheck})(ProtectedComponent)