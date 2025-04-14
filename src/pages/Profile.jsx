import React, { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { toast } from 'react-toastify';
import '../style/Global.css'
import { EstadosBrasileiros, handleInputUserChange, checkUser, checkEmail, checkCpf, checkPassword } from '../services/Vars';

export const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`);

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
                setEditedUser(userData);
            } else {
                console.error('Erro ao buscar os dados do usuário: ', await response.json());
            }
        }

        fetchUser();
    }, [isEditing]);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSave = async () => {

        // Verificar se o nome de usuário já existe
        const isUserValid = await checkUser(user, editedUser);
        if (!isUserValid) return;

        // Verificar se o email já existe
        const isEmailValid = await checkEmail(user, editedUser);
        if (!isEmailValid) return;

        // Verificar se o cpf já existe
        const isCpfValid = await checkCpf(user, editedUser);
        if (!isCpfValid) return;

        // Verificar se a senha está correta antes de salvar
        const isPasswordValid = await checkPassword(user, editedUser);
        if (!isPasswordValid) return;

        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedUser),
        });

        if (response.ok) {
            setIsEditing(false);
            toast.success('Dados alterados com sucesso!', {
                position: "bottom-right",
                autoClose: 2000
            });

            // Refazer a solicitação para buscar os dados do usuário
            const fetchUser = async () => {
                const userId = localStorage.getItem('userId');
                const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`);
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    console.error('Erro ao buscar os dados do usuário: ', await response.json());
                }
            }

            fetchUser();
        } else {
            console.error('Erro ao atualizar o usuário: ', await response.json());
        }
    };

    return (
        <div>
            <Header />
            {user && (
                <div>
                    {isEditing ? (
                        <div className='profile_editing_div'>
                            <h2>Editar Perfil</h2>
                            <div className='input_group'>
                                <input
                                    type="text"
                                    name="usuario"
                                    placeholder='Usuário'
                                    value={editedUser.usuario}
                                    onChange={(event) => handleInputUserChange(event, setEditedUser, editedUser)}
                                />
                            </div>
                            <div className="input_group">
                                <input
                                    type="text"
                                    name="nome"
                                    placeholder='Nome'
                                    value={editedUser.nome.toUpperCase()}
                                    onChange={(event) => handleInputUserChange(event, setEditedUser, editedUser)}
                                />
                            </div>
                            <div className="input_group">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder='E-mail'
                                    value={editedUser.email}
                                    onChange={(event) => handleInputUserChange(event, setEditedUser, editedUser)}
                                />
                            </div>
                            <div className="input_group">
                                <input
                                    type="text"
                                    name="cpf"
                                    placeholder='CPF'
                                    value={editedUser.cpf}
                                    onChange={(event) => handleInputUserChange(event, setEditedUser, editedUser)}
                                />
                            </div>
                            <div className="input_group">
                                <input
                                    type="text"
                                    name="rua"
                                    placeholder='Rua'
                                    value={editedUser.rua.toUpperCase()}
                                    onChange={(event) => handleInputUserChange(event, setEditedUser, editedUser)}
                                />
                            </div>
                            <div className="input_group">
                                <input
                                    type="text"
                                    name="bairro"
                                    placeholder='Bairro'
                                    value={editedUser.bairro.toUpperCase()}
                                    onChange={(event) => handleInputUserChange(event, setEditedUser, editedUser)}
                                />
                            </div>
                            <div className="input_group">
                                <input
                                    type="text"
                                    name="numero"
                                    placeholder='Número'
                                    value={editedUser.numero}
                                    onChange={(event) => handleInputUserChange(event, setEditedUser, editedUser)}
                                />
                            </div>
                            <div className="input_group">
                                <input
                                    type="text"
                                    name="cep"
                                    placeholder='CEP'
                                    value={editedUser.cep}
                                    onChange={(event) => handleInputUserChange(event, setEditedUser, editedUser)}
                                />
                            </div>
                            <div className="input_group">
                                <input
                                    type="text"
                                    name="cidade"
                                    placeholder='Cidade'
                                    value={editedUser.cidade.toUpperCase()}
                                    onChange={(event) => handleInputUserChange(event, setEditedUser, editedUser)}
                                />
                            </div>
                            <div className="input_group">
                                < EstadosBrasileiros
                                    value={editedUser.estado}
                                    onChange={(event) => handleInputUserChange(event, setEditedUser, editedUser)}
                                />
                            </div>
                            <br />
                            <h3>Confirme com sua senha:</h3>
                            <input
                                className='password_profile_input'
                                type="password"
                                name="password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                    ) : (
                        <div className='profile_information_div'>
                            <h2>Informações do Perfil</h2>
                            <div className='profile_information_content'>
                                <p>{user.usuario}</p>
                                <p>{user.nome}</p>
                                <p>{user.email}</p>
                                <p>{user.cpf}</p>
                                <p>{user.rua}</p>
                                <p>{user.bairro}</p>
                                <p>{user.numero}</p>
                                <p>{user.cep}</p>
                                <p>{user.cidade}</p>
                                <p>{user.estado}</p>
                            </div>
                        </div>
                    )}
                    <div className='profile_buttons_div'>
                        <button className={isEditing ? 'cancel_button_profile' : 'edit_button_profile'} onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? 'Cancelar' : 'Editar Perfil'}
                        </button>
                        {isEditing && (
                            <button className='save_button_profile' onClick={handleSave} disabled={JSON.stringify(user) === JSON.stringify(editedUser) || password === ''}>
                                Salvar
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

