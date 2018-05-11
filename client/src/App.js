import React, { Component } from 'react';
import './App.css';
import './MediaQ.css'
import router from './routes'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  render() {
    return (
      <div>
          <ToastContainer/>
        <div>
          {router}
        </div>
     
      </div>
    );
  }
}
function mapStateToProps(state){
  return state
}

export default withRouter(connect(mapStateToProps)(App));
