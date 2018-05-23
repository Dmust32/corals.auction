import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/coral logo.png'

class Nav extends Component {
    state = {
        showMenu: false
    }
    render(){
        
        return(
            <div className= "nav-container">
                <div className="logo-container">
                    <img src={logo} alt="logo"/><h3>REEF-AUCTIONS</h3>
                </div>
                <div className="pages-container">
                    {/* <Link to="/">
                        <h3>Home</h3>
                    </Link> */}
                    <Link to= "/MyDash">
                        <h3>MyDash</h3>
                    </Link>
                    <Link to="/Auctions">
                        <h3>Auctions</h3>
                    </Link>
                    <a href={process.env.REACT_APP_AUTH_LOGOUT}><h3>Logout</h3></a> 
                </div>
                {/* <div className='phone-pages-container'>
                    <div onClick = {()=>{
                        if(!this.state.showMenu){
                            this.setState({showMenu: true})
                        }else{
                            this.setState({showMenu: false})
                        }
                        }}>

                        <i class="fas fa-bars fa-2x"></i>
                    </div>
               
                    
                </div>
                <div className='hamburger-menu'>
                    {this.state.showMenu? 
                        <ul>
                            <li><Link to= "/MyDash">MyDash</Link></li>
                            <li><Link to= "/Auctions">Auctions</Link></li>
                            <li><a href="http://localhost:5050/auth/logout">Logout</a></li>
                
                        </ul>
                        : null
                    }
                </div> */}
            </div>
        )
    }
}

export default Nav