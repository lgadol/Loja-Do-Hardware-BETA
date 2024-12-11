import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getItem, setItem } from '../services/LocalStorageFuncs';
import { Header } from "../components/Header";
import { toast } from 'react-toastify';
import { BsFillCartPlusFill } from 'react-icons/bs';

export const ProductPage = () => {
    let { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});
    const [cart, setCart] = useState(getItem('carrinhoYt') || []);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:4000/editProduct/${id}`);
                if (response.ok) {
                    const productData = await response.json();
                    setProduct(productData);
                } else {
                    console.error('Erro ao buscar os dados do produto');
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (id, quantity) => {
        setQuantities({
            ...quantities,
            [id]: quantity,
        });
    };

    const handleClick = async (obj) => {
        const userId = localStorage.getItem('userId');
        const quantity = quantities[obj.id] || '1';

        if (quantity === '0') {
            toast.error('O valor mínimo para adicionar é 1.', {
                autoClose: 2000,
                position: 'bottom-right'
            });
            return;
        }

        setCart([...cart, obj]);
        setItem('carrinhoYt', [...cart, obj]);

        // Adicionar item ao carrinho no banco de dados
        const response = await fetch('http://localhost:4000/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_usuario: userId,
                id_produto: obj.id,
                quantidade: Number(quantity),
            }),
        });

        if (response.ok) {
            toast.success('Produto adicionado ao carrinho com sucesso!', {
                autoClose: 2000,
                position: 'bottom-right'
            });
        } else {
            toast.error('Houve um problema ao adicionar o produto ao carrinho.', {
                autoClose: 2000,
                position: 'bottom-right'
            });
        }
    }

    return (
        <div>
            <Header />
            <div className="productPage">
                {loading ? (
                    <p className="loading">Carregando...</p>
                ) : product ? (
                    <div className="productDetails">
                        <div className="productImage">
                            <img src={product.imagem_url} alt={product.nome} />
                        </div>
                        <div className="productInfo">
                            <h1>{product.nome}</h1>
                            <p className="price">R$ {product.preco}</p>
                            <p className="description">{product.descricao}</p>
                            <div className="buttonGroup fullWidth">
                                <button className="buyButton"
                                    onClick={() => {
                                        if (!localStorage.getItem('userId')) {
                                            toast.warn('Você precisa estar logado para comprar!', {
                                                autoClose: 2000,
                                                position: 'bottom-right',
                                            });
                                            return;
                                        }
                                    }}
                                >
                                    Comprar Agora
                                </button>
                                <button className="cartButton">
                                    <BsFillCartPlusFill
                                        onClick={() => {
                                            if (!localStorage.getItem('userId')) {
                                                toast.warn('Você precisa estar logado para adicionar ao carrinho!', {
                                                    autoClose: 2000,
                                                    position: 'bottom-right',
                                                });
                                                return;
                                            }
                                            handleClick(product);
                                        }} />
                                    <input
                                        className="quantityInput"
                                        type="number"
                                        min="1"
                                        value={quantities[product.id] || '1'}
                                        onChange={(event) => handleQuantityChange(product.id, event.target.value)}
                                    />
                                </button>
                            </div>

                        </div>
                    </div>
                ) : (
                    <p className="notFound">Produto não encontrado</p>
                )}
            </div>
        </div>
    );
}    
