import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NotLoggedIn extends Component {
    render(){
        return (
            <div className="please-login">
                <h1>Please Login to view Content</h1>
                    <Link to='/'>
                        <button>Go To Login</button>
                    </Link>
            </div>
        )
    }
}

export default NotLoggedIn 