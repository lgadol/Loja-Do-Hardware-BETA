import React, { useState } from 'react'
import { Header } from '../components/Header';
import { toast } from 'react-toastify';
import { handleRegisterInput, EstadosBrasileiros } from '../services/Vars';

export const Register = () => {
    const [usuario, setUsuario] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = async () => {
        if (!usuario || !nome || !email || !cpf || !rua || !bairro || !numero || !cep || !cidade || !estado || !senha) {
            toast.error('Por favor, preencha todos os campos.', {
                autoClose: 2000,
                position: 'bottom-right'
            });
            return;
        }

        const response = await fetch('http://localhost:4000/registerUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                admin: '0',
                ativo: '1',
                usuario,
                nome: nome.toUpperCase(),
                email,
                cpf,
                senha,
                rua: rua.toUpperCase(),
                bairro: bairro.toUpperCase(),
                numero,
                cep,
                cidade: cidade.toUpperCase(),
                estado
            })
        });

        const responseData = await response.json();

        if (response.ok) {
            toast.success(responseData.message, {
                autoClose: 2000,
                position: 'bottom-right'
            });
        } else {
            toast.error(responseData.message, {
                autoClose: 2000,
                position: 'bottom-right'
            });
        }
    };

    return (
        <div>
            <Header />
            <div className='profile_register_div'>
                <h2>Registre-se</h2>
                <div className='input_group_register'>
                    <p>Usuário:</p>
                    <input
                        type="text"
                        name="usuario"
                        value={usuario}
                        onChange={(event) => handleRegisterInput(event, setUsuario, 'usuario')}
                    />
                </div>
                <div className='input_group_register'>
                    <p>Nome:</p>
                    <input
                        type="text"
                        name="nome"
                        value={nome.toUpperCase()}
                        onChange={(event) => handleRegisterInput(event, setNome, 'nome')}
                    />
                </div>
                <div className='input_group_register'>
                    <p>E-mail:</p>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(event) => handleRegisterInput(event, setEmail, 'email')}
                    />
                </div>
                <div className='input_group_register'>
                    <p>CPF:</p>
                    <input
                        type="text"
                        name="cpf"
                        value={cpf}
                        onChange={(event) => handleRegisterInput(event, setCpf, 'cpf')}
                    />
                </div>
                <div className='input_group_register'>
                    <p>Rua:</p>
                    <input
                        type="text"
                        name="rua"
                        value={rua.toUpperCase()}
                        onChange={(event) => handleRegisterInput(event, setRua, 'rua')}
                    />
                </div>
                <div className='input_group_register'>
                    <p>Bairro:</p>
                    <input
                        type="text"
                        name="bairro"
                        value={bairro.toUpperCase()}
                        onChange={(event) => handleRegisterInput(event, setBairro, 'bairro')}
                    />
                </div>
                <div className='input_group_register'>
                    <p>Número:</p>
                    <input
                        type="text"
                        name="numero"
                        value={numero}
                        onChange={(event) => handleRegisterInput(event, setNumero, 'numero')}
                    />
                </div>
                <div className='input_group_register'>
                    <p>CEP:</p>
                    <input
                        type="text"
                        name="cep"
                        value={cep}
                        onChange={(event) => handleRegisterInput(event, setCep, 'cep')}
                    />
                </div>
                <div className='input_group_register'>
                    <p>Cidade:</p>
                    <input
                        type="text"
                        name="cidade"
                        value={cidade.toUpperCase()}
                        onChange={(event) => handleRegisterInput(event, setCidade, 'cidade')}
                    />
                </div>
                <div className='input_group_register'>
                    <p>Estado:</p>
                    < EstadosBrasileiros
                        className="estadosBR_profile"
                        value={estado}
                        onChange={(event) => setEstado(event.target.value)}
                    />
                </div>
                <div className='input_group_register'>
                    <p>Senha:</p>
                    <input
                        type="password"
                        name="senha"
                        value={senha}
                        onChange={(event) => handleRegisterInput(event, setSenha, 'senha')}
                    />
                </div>
                <div className='input_group_register'>
                    <p>Confirme sua Senha:</p>
                    <input
                        type="password"
                        name="confirmSenha"
                        value={confirmPassword}
                        onChange={(event) => {
                            if (event.target.value !== senha) {
                                toast.error('As senhas não correspondem.', {
                                    autoClose: 2000,
                                    position: 'bottom-right'
                                });
                            }
                            setConfirmPassword(event.target.value);
                        }}
                    />
                </div>
            </div>
            <div className='profile_buttons_div'>
                <button className='cancel_button_profile'>
                    Cancelar
                </button>
                <button className='save_button_profile' onClick={handleSave}>
                    Salvar
                </button>
            </div>
        </div>
    )
}
