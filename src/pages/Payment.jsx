import React, { useState, useEffect } from 'react'
import { Header } from '../components/Header';
import { AiFillCheckCircle } from 'react-icons/ai';
import '../style/Global.css';

export const Payment = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:4000/users/${userId}`);

            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                console.error('Erro ao buscar os dados do usuário: ', await response.json());
            }
        }

        fetchUser();
    }, []);

    const { params: { price } } = props.match
    const convertPrice = parseFloat(price)
    const formattedPrice = convertPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Função para gerar o ID de Compra com base nos dados do usuário
    function gerarIdCompra(user) {
        const { nome, cpf, estado } = user;
        const nomeAbreviado = nome.slice(0, 2).toUpperCase();
        const cpfAbreviado = cpf.slice(0, 3);
        const estadoCompleto = estado;
        const priceNumeros = price.replace(/\D/g, '');
        const id = `${nomeAbreviado}${cpfAbreviado}${estadoCompleto}${priceNumeros}`;

        return id;
    }

    return (
        <div>
            <Header />
            {user && (
                <div className='payment_div'>
                    <h2>Sua Compra foi concluída com sucesso!!</h2>
                    <span><AiFillCheckCircle /></span>
                    <h4>{`Comprador: ${user.nome}`}</h4>
                    <h4>{`ID de Compra: ${gerarIdCompra(user)}`}</h4>
                    <h4>{`E-mail: ${user.email}`}</h4>
                    <h4>{`CPF: ${user.cpf}`}</h4>
                    <h4>{`Rua: ${user.rua}`}</h4>
                    <h4>{`Bairro: ${user.bairro}`}</h4>
                    <h4>{`Número: ${user.numero}`}</h4>
                    <h4>{`CEP: ${user.cep}`}</h4>
                    <h4>{`Cidade: ${user.cidade} - ${user.estado}`}</h4>
                    <h4>{`Valor: ${formattedPrice}`}</h4>
                    <h4>{`Prazo: ${Math.ceil(Math.random() * 15) + 2} dias`}</h4>
                </div>
            )}
        </div>
    )
}
