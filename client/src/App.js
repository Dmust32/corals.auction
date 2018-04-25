import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav'
import router from './routes'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'



class App extends Component {
  render() {
    return (
      <div>
        <Nav/>
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
