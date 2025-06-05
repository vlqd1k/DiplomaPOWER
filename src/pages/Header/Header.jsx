import React from 'react';
import './header.css'
import { Outlet} from 'react-router-dom';
import { Fragment } from 'react';

import Logo from '../../img/Logotype.png'

function Header () {
    return(
       <Fragment>
        <header className="header">
      <div className="header_group">
        <img className="Logo" src={Logo} alt="Logotype"/>
      </div>
      <div className="menu">
        <div className="item"><a href="/"  className="item__box">Home</a></div>
        <div className="item"><a href="/calculate"  className="item__box">Calculate</a></div>
        <div className="item"><a  href="/about"  className="item__box">About</a></div>
        
      </div>
    </header>
        
        <Outlet/>    
       </Fragment>
    );
}
export default Header 