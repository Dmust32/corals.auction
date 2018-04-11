import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/coral logo.png'

class Nav extends Component {
    render(){
        return(
            <div className= "nav-container">
                <div className="logo-container">
                    <img src={logo} alt="logo"/><h3>REEF-AUCTIONS</h3>
                </div>
                <div className="pages-container">
                    <Link to="/">
                        <h3>Home</h3>
                    </Link>
                    <Link to= "/MyDash">
                        <h3>MyDash</h3>
                    </Link>
                    <Link to="/Auctions">
                        <h3>Auctions</h3>
                    </Link>
                    <a href="http://localhost:5050/auth"><h3>Login</h3></a>
                </div>
            </div>
        )
    }
}

export default Nav