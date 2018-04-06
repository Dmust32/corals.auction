import React, {Component} from 'react'

class Nav extends Component {
    render(){
        return(
            <div className= "nav-container">
                <h3>LOGO HERE</h3>
                <div className="pages-container">
                    <h3>Home</h3>
                    <h3>MyDash</h3>
                    <h3>Auctions</h3>
                    <a href="http://localhost:5050/auth"><h3>Login</h3></a>
                </div>
            </div>
        )
    }
}

export default Nav