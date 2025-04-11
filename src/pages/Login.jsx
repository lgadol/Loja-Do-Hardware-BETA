import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Header } from '../components/Header';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import '../style/Global.css'

export const Login = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');

    const history = useHistory();
    const cond = (name.length > 3 && pass.length > 4);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = `${process.env.REACT_APP_API_URL}/users`;
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error("Erro ao buscar os dados: ", error);
            }
        }
        fetchApi();
    }, [])

    const handleLogin = async () => {
        const user = data.find(user => user.usuario === name);
        if (user) {
            // Verificar a senha usando bcrypt
            const isPasswordCorrect = await bcrypt.compare(pass, user.senha);
            if (isPasswordCorrect) {
                if (user.ativo === 1) {
                    localStorage.setItem('userToken', 'loggedIn');
                    localStorage.setItem('userId', user.id);
                    localStorage.setItem('userName', user.nome);
                    localStorage.setItem('isAdmin', user.admin);
                    history.push("/");
                } else {
                    toast.error("Usuário foi desativado.", {
                        autoClose: 2000,
                        position: 'bottom-right'
                    });
                }
            } else {
                toast.error("Senha incorreta.", {
                    autoClose: 2000,
                    position: 'bottom-right'
                });
            }
        } else {
            toast.error("Usuário não existe.", {
                autoClose: 2000,
                position: 'bottom-right'
            });
        }
    }

    return (
        <div>
            <Header />
            <div className='login_div'>
                <h2>Login</h2>
                <p>Usuário</p>
                <div className='input_login_div'>
                    <input
                        type='text'
                        onChange={({ target: { value } }) => setName(value)}
                        value={name}
                    />
                </div>
                <p>Senha</p>
                <div className='input_login_div'>
                    <input
                        type='password'
                        onChange={({ target: { value } }) => setPass(value)}
                        value={pass}
                    />
                </div>
                <div className='login_buttons_div'>
                    <button className='login_enter_button'
                        type="button"
                        disabled={!cond}
                        onClick={handleLogin}
                    >
                        Entrar
                    </button>
                    <Link to="/register">
                        <button className='login_register_button'
                            type="button"
                        >
                            Registre-se
                        </button>
                    </Link>
                </div>
            </div>
        </div >
    )
}

