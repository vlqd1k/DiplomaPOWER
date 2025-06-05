import React from 'react';
import './home.css';

import Lottie from 'lottie-react';

import WelcomAnim from '../../animations/Welcom.json';
import WelcomSearchAnim from '../../animations/sear.json';


function Home() {
  return (
    <>
    <div className="welcome__info">
      <h1 className='welcome__text'>BackupWatt: Calculate backup power in seconds</h1>
      <Lottie className='welcome__search' animationData={WelcomSearchAnim}/>

    </div>
    <div className="welcome">
      <Lottie className='welcome__animation' animationData={WelcomAnim}/>
      <p className='welcome__button'><a style={{zIndex:"1", color:"white"}} href="/service">Continue</a></p>
      
    </div>
    </>
  );
}

export default Home;