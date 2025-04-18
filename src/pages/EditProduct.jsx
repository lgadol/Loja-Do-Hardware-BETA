import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/Global.css';
import { handleInputProductChange, checkProductName, checkImageUrl, CategoriasProdutos } from '../services/Vars';

export const EditProduct = () => {
    let { id } = useParams();
    const [product, setProduct] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState({});
    const [categoria, setCategoria] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/editProduct/${id}`);

            if (response.ok) {
                const productData = await response.json();
                setProduct(productData);
                setEditedProduct(productData);
            } else {
                console.error('Erro ao buscar os dados do produto: ', await response.json());
            }
        }

        fetchProduct();
    }, [isEditing]);

    const handleSave = async () => {

        if (
            !editedProduct.nome ||
            !editedProduct.descricao ||
            !editedProduct.preco ||
            !editedProduct.imagem_url
        ) {
            toast.error('Preencha todos os campos!', {
                position: "bottom-right",
                autoClose: 2000
            });
        } else {

            // Verificar se o nome já existe
            const isProductNameValid = await checkProductName(product, editedProduct);
            if (!isProductNameValid) return;

            // Verificar se a URL de imagem já existe
            const isImageUrlValid = await checkImageUrl(product, editedProduct);
            if (!isImageUrlValid) return;

            const response = await fetch(`${process.env.REACT_APP_API_URL}/editProduct/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedProduct),
            });

            if (response.ok) {
                setIsEditing(false);
                toast.success('Dados alterados com sucesso!', {
                    position: "bottom-right",
                    autoClose: 2000
                });

                // Refazer a solicitação para buscar os dados do produto
                const fetchProduct = async () => {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/editProduct/${id}`);
                    if (response.ok) {
                        const productData = await response.json();
                        setProduct(productData);
                    } else {
                        console.error('Erro ao buscar os dados do produto: ', await response.json());
                    }
                }

                fetchProduct();
            } else {
                console.error('Erro ao atualizar o produto: ', await response.json());
            }
        }
    };

    return (
        <div>
            <Header />
            {product && (
                <div>
                    {isEditing ? (
                        <div className='product_editing_div'>
                            <h2>Editar Produto</h2>
                            <div className='input_group'>
                                <input
                                    type="text"
                                    name="nome"
                                    placeholder='Nome do Produto'
                                    value={editedProduct.nome.toUpperCase()}
                                    onChange={(event) => handleInputProductChange(event, setEditedProduct, editedProduct)}
                                />
                            </div>
                            <div className='input_group'>
                                <input
                                    type="text"
                                    name="descricao"
                                    placeholder='Descrição'
                                    value={editedProduct.descricao.toUpperCase()}
                                    onChange={(event) => handleInputProductChange(event, setEditedProduct, editedProduct)}
                                />
                            </div>
                            <div className='input_group'>
                                <input
                                    type="text"
                                    name="preco"
                                    placeholder='Preço'
                                    value={editedProduct.preco}
                                    onChange={(event) => handleInputProductChange(event, setEditedProduct, editedProduct)}
                                />
                            </div>
                            <div className='input_group'>
                                <input
                                    type="text"
                                    name="imagem_url"
                                    placeholder='URL da Imagem do Produto'
                                    value={editedProduct.imagem_url}
                                    onChange={(event) => {
                                        setEditedProduct({
                                            ...editedProduct,
                                            imagem_url: event.target.value
                                        });
                                    }}
                                />
                            </div>
                            <div className='input_group'>
                                <CategoriasProdutos
                                    value={categoria}
                                    onChange={e => setCategoria(e.target.value)}
                                />
                            </div>
                            <br />
                        </div>
                    ) : (
                        <div className='product_information_div'>
                            <h2>Informações do Produto</h2>
                            <div className='product_information_content'>
                                <p><strong>Nome: </strong>  {product.nome}</p>
                                <p><strong>Descrição: </strong>  {product.descricao}</p>
                                <p><strong>Preço: </strong>  {parseFloat(product.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                <p><strong>URL da Imagem: </strong>  ...</p>
                                <p><strong>Data do Registro: </strong>  {new Date(product.data_registro).toLocaleDateString('pt-BR')}</p>
                                <p><strong>Marca: </strong>  {product.marca}</p>
                                <p><strong>Categoria: </strong>  {product.categoria}</p>
                            </div>
                        </div>
                    )}
                    <div className='product_buttons_div'>
                        <button className={isEditing ? 'cancel_button_product' : 'edit_button_product'} onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? 'Cancelar' : 'Editar'}
                        </button>
                        {isEditing && (
                            <button className='save_button_product' onClick={handleSave} disabled={JSON.stringify(product) === JSON.stringify(editedProduct)}>
                                Salvar
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

