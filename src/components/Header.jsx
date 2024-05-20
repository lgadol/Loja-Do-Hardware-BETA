import React, { useState, useEffect } from 'react';
import '../style/Header.css';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { FaCrown, FaUser, FaSignInAlt, FaShoppingCart, FaStore, FaSignOutAlt } from 'react-icons/fa';
import logo from '../img/loja-do-hardware-2.png';

export const Header = () => {
    const [userName, setUserName] = useState(localStorage.getItem('userName'));
    const isAdmin = localStorage.getItem('isAdmin');
    const history = useHistory();

    useEffect(() => {
        setUserName(localStorage.getItem('userName'));
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setUserName(null);
        history.push('/login');
    }

    return (
        <div className='header_div'>
            <Link to="/"> <img src={logo} className='header_logo' /> </Link>
            <Link to="/"><FaStore /> Loja</Link>
            <Link to="/cart"><FaShoppingCart /> Carrinho</Link>
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
                <Link to="/login"><FaSignInAlt /> Entrar</Link>
            )}
        </div>
    )
}
