import React, {Component} from 'react'
import spsPic from '../assets/mainSPSpic.jpg'
class Home extends Component {
    render(){
        return (
            <div className='dash-main-container'>
                <div className="coral-pics" >
                    <img src={spsPic} alt='coralPic'/>
                </div>
                <div className="subtext">
                    <div className="about">
                        <h2>About</h2>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. 

                            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. 
                        </p>
                    </div>
                    <div className='rules'>
                        <h2>Rules</h2>
                        <ul>
                            <li>Don't be dumb</li>
                            <li>fajdfkjadfjaejfjadfkamlkdfmal'dmfklfkladjfafdf</li>
                            <li>adkfpoajdfpoapdjfpajdpjfpajdfpkalfmalwmfl;adf</li>
                            <li>'aslkdmfkajhrfonmdfnanfa;cmoafpamfad</li>
                            <li>asdfkljadvjanrnvojnondzjnasjnva</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

 export default Home