import React from 'react';
import appstore from '../../../images/appstore.png'
import playstore from '../../../images/playstore.png';
// import { GrAppleAppStore } from 'react-icons/gr';
// import { IoLogoGooglePlaystore } from 'react-icons/io5';
import './Footer.css';



const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h3>DOWNLOAD OUR APP</h3>
                <p>Download app for Android and iOS devices </p>
                <img src={appstore} alt="App Store" ></img>
                {/* <GrAppleAppStore />
                <IoLogoGooglePlaystore /> */}
                <img src={playstore} alt="Google Play"></img>
            </div>
            <div className="midFooter">
                <h1>ECOMMERCE</h1>
                <p>User Satisfaction is our first priority</p>
                <p>Copyright 2021 &copy; Ritik </p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us </h4>
                <a href="https://twitter.com/Ritik">Instagram</a>
                <a href="https://twitter.com/Ritik">Youtube</a>
                <a href="https://twitter.com/Ritik">Twitter</a>
            </div>
        </footer>
    )
}
export default Footer
