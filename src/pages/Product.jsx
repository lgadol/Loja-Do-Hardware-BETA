import React, { useState } from 'react';
import { Header } from '../components/Header';
import '../style/Global.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CategoriasProdutos } from '../services/Vars';

export const Product = () => {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [imagem_url, setImagem] = useState('');
    const [marca, setMarca] = useState('');
    const [categoria, setCategoria] = useState('');

    const handleNMChange = (e, setState) => {
        const value = e.target.value;
        if (/^[a-zA-Z0-9\s]*$/.test(value)) {
            setState(value);
        } else {
            toast.error('Este campo só pode conter letras e números.', {
                autoClose: 2000,
                position: 'bottom-right'
            });
        }
    }

    const handlePrecoChange = (e) => {
        const value = e.target.value;
        if (/^\d+(\.\d{1,2})?$/.test(value) || /^\d*$/.test(value)) {
            setPreco(value);
        } else {
            toast.error('O preço deve conter apenas números.', {
                autoClose: 2000,
                position: 'bottom-right'
            });
        }
    }

    const saveData = async () => {
        if (!nome || !descricao || !preco || !imagem_url) {
            toast.error('Por favor, preencha todos os campos.', {
                autoClose: 2000,
                position: 'bottom-right'
            });
            return;
        }

        const response = await fetch(`http://localhost:4000/addProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ativo: '1',
                nome: nome.toUpperCase(),
                descricao: descricao.toUpperCase(),
                preco,
                imagem_url,
                marca: marca.toUpperCase(),
                categoria
            })
        });

        const responseData = await response.json();

        if (response.ok) {
            toast.success(responseData.message, {
                autoClose: 2000,
                position: 'bottom-right'
            });
            console.log('Dados salvos com sucesso');
        } else {
            toast.error(responseData.message, {
                autoClose: 2000,
                position: 'bottom-right'
            });
            console.error('Erro ao salvar os dados: ', responseData);
        }
    }

    return (
        <div>
            <Header />
            <h1 className='add_product_h1'>
                Adicionar Produto
            </h1>
            <div className='centered_container'>
                <div className='edit_product_div'>
                    <div className="input_group">
                        <input
                            type="text"
                            name="nome"
                            placeholder='Nome do Produto'
                            value={nome.toUpperCase()}
                            onChange={e => handleNMChange(e, setNome)}
                        />
                    </div>
                    <div className="input_group">
                        <input
                            type="text"
                            name="descricao"
                            placeholder='Descrição'
                            value={descricao.toUpperCase()}
                            onChange={e => setDescricao(e.target.value)}
                        />
                    </div>
                    <div className="input_group">
                        <input
                            type="text"
                            name="preco"
                            placeholder='Preço'
                            value={preco}
                            onChange={handlePrecoChange}
                        />
                    </div>
                    <div className="input_group">
                        <input
                            type="text"
                            name="imagem"
                            placeholder='URL da Imagem'
                            value={imagem_url}
                            onChange={e => setImagem(e.target.value)}
                        />
                    </div>
                    <div className="input_group">
                        <input
                            type="text"
                            name="marca"
                            placeholder='Marca'
                            value={marca.toUpperCase()}
                            onChange={e => handleNMChange(e, setMarca)}
                        />
                    </div>
                    <div className="input_group">
                        <CategoriasProdutos
                            value={categoria}
                            onChange={e => setCategoria(e.target.value)}
                        />
                    </div>
                    <div className='product_buttons'>
                        <button className='product_salvar' onClick={saveData}>Salvar</button>
                        <Link to="/">
                            <button className='product_cancelar'>Cancelar</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
