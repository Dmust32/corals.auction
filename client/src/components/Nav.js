import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Nav extends Component {
    render(){
        return(
            <div className= "nav-container">
                <h3>LOGO HERE</h3>
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