import React, { useState, useEffect } from 'react';
import '../style/Header.css';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FaCrown, FaUser, FaSignInAlt, FaShoppingCart, FaStore, FaSignOutAlt, FaBars } from 'react-icons/fa';
import logo from '../img/loja-do-hardware-2.png';

export const Header = () => {
    const [userName, setUserName] = useState(localStorage.getItem('userName'));
    const isAdmin = localStorage.getItem('isAdmin');
    const history = useHistory();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        setUserName(localStorage.getItem('userName'));
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUserName(null);
        history.push('/login');
    }

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = (e) => {
        if (e.target.classList.contains("overlay")) {
            setIsDrawerOpen(false);  // Fecha a bandeja ao clicar na overlay
        }
    };

    return (
        <div className='header_div'>
            <Link to="/"> <img src={logo} className='header_logo' /> </Link>
            <Link to="/" className="store_icon"><FaStore /> Loja</Link>
            <Link to="/cart" className="cart_icon"><FaShoppingCart /> Carrinho</Link>
            {userName ? (
                <>
                    <p className='header_p'>
                        Bem-vindo
                        <br />
                        {isAdmin === '1' ? <FaCrown color='yellow' /> : <FaUser color='white' />}
                        {" "} <Link to="/profile">{userName}</Link>
                    </p>
                    <a className='exit_p' onClick={handleLogout}><FaSignOutAlt color='red' /> Sair</a>
                </>
            ) : (
                <Link to="/login" className="enter_p"><FaSignInAlt /> Entrar</Link>
            )}

            <FaBars className='bars_icon' onClick={toggleDrawer}></FaBars>

            {isDrawerOpen && <div className="overlay" onClick={closeDrawer}></div>}

            <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
                <FaBars className="drawer_close" onClick={toggleDrawer}></FaBars>
                <Link to="/" className="drawer-button"><FaStore /> Loja</Link>
                <Link to="/cart" className="drawer-button"><FaShoppingCart /> Carrinho</Link>
                <a className="drawer-button" onClick={handleLogout}><FaSignOutAlt /> Sair</a>
            </div>

        </div>
    )
}