import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';
import Button from '../button';


const Header = ({ isAuth, logout }) => {

    const navBar = (
        <div>
            <Link styleName="link" to="/join">Создать аккаунт</Link>
            <Link styleName="link contained" to="/login">Войти</Link>
        </div>
    );

    const render = isAuth ? <Button className="contained" onClick={logout}>Выйти</Button> : navBar;

    return(
        <header styleName="header">
            <div className="container flex justify-between align-center">
                <span styleName="app-name">React Chat</span>   
                {render}        
            </div>
        </header>
    )
}

export default Header;