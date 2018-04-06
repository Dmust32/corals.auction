import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav'
import router from './routes'

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

export default App;
