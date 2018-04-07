import React, {Component} from 'react'
import spsPic from '../assets/mainSPSpic.jpg'
class Home extends Component {
    render(){
        return (
            <div className='dash-main-container'>
                <div className="coral-pics" >
                    <img src={spsPic}/>
                </div>
                <div className="subtext">
                    <div className="rules">
                    </div>
                    <div className='about'>
                    </div>
                </div>
            </div>
        )
    }
}

 export default Home