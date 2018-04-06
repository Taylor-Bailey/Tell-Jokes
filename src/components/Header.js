import React from 'react';
import logo from '../images/twb.png';

function Header(props){
    return (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{props.title}</h1>
        </header>
    )

}

export default Header;