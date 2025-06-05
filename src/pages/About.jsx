import React from 'react';
import './about.css';

import bckgrndFlower from '../img/about.jpg';


function About () {
    return(
        <>
        <div className="poster">
            <div className="poster__content">
                <h1 className='poster__content__heading'>
                    Welcome to BackupWatt: Calculate backup power in seconds!
                </h1>
                <div className="poster__content__blocks">
                    <img className='poster__flower' src={bckgrndFlower} alt="bckgrndFlower" />
                    <p className='poster__content__text'>
                    BackupWatt is an innovative tool that helps you quickly and accurately calculate backup power for your home, office, or business. Simply enter your device parameters, and the system will instantly determine the required power capacity. Ensure the stable operation of your electronics without any hassle – BackupWatt does it all for you!
                    </p>
                </div>
                
            </div>

    </div>

        </>

    );
}
export default About 