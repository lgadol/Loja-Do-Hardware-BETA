import React, { useEffect, useState } from 'react';
import { BsFillCartPlusFill, BsTrash3Fill, BsPlusCircle, BsPencilSquare } from 'react-icons/bs';
import { FaSearch, FaStoreAltSlash } from "react-icons/fa";
import { DeleteModal } from '../components/DeleteModal';
import { getItem, setItem } from '../services/LocalStorageFuncs';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import '../style/Global.css';
import { toast } from 'react-toastify';

export const Store = () => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState(getItem('carrinhoYt') || []);
    const [quantities, setQuantities] = useState({});
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [search, setSearch] = useState('');

    const fetchStore = async () => {
        try {
            const url = 'http://localhost:4000/';
            const response = await fetch(url);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error("Erro ao buscar os dados: ", error);
        }
    }

    useEffect(() => {
        fetchStore();
    }, [])

    const handleQuantityChange = (id, quantity) => {
        setQuantities({
            ...quantities,
            [id]: quantity,
        });
    };

    const handleClick = async (obj) => {
        const userId = localStorage.getItem('userId');
        const quantity = quantities[obj.id] || '0';

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

    const handleDelete = (obj) => {
        setSelectedProduct(obj);
        setDeleteModalIsOpen(true);
    }

    const handleConfirmDelete = async () => {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:4000/product/${selectedProduct.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_usuario: userId,
                ativo: 0,
            }),
        });

        if (response.ok) {
            toast.success("Produto excluído com sucesso!", {
                position: "bottom-right",
                autoClose: 2000
            });
            fetchStore();
        } else {
            toast.error("Erro ao excluir o produto.", {
                position: "bottom-right",
                autoClose: 2000
            });
        }
        // Feche o modal de confirmação
        setDeleteModalIsOpen(false);
    }

    const filteredData = data.filter(e => e.nome.toUpperCase().includes(search.toUpperCase()));

    return (
        <div>
            <Header />
            {localStorage.getItem('isAdmin') === '1' &&
                <div className='add_product_div'>
                    <Link to="/product">
                        <p className='addProduct_button'><BsPlusCircle /> Adicionar produto</p>
                    </Link>
                </div>
            }

            <div className='search_bar_store'>
                <i class="fa fa-search" />
                <input
                    type='text'
                    placeholder='Pesquise...'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className='product_area'>
                {
                    filteredData.length > 0 ? (
                        filteredData.map((e) => (
                            <div key={e.id} className='product_div'>
                                <div className='alter_buttons'>
                                    <button className='trash_button'>
                                        {localStorage.getItem('isAdmin') === '1' && <BsTrash3Fill
                                            onClick={() => handleDelete(e)} />}
                                    </button>
                                    <DeleteModal
                                        isOpen={deleteModalIsOpen}
                                        onRequestClose={() => setDeleteModalIsOpen(false)}
                                        onConfirm={handleConfirmDelete}
                                    />
                                    <Link to={`/editProduct/${e.id}`}>
                                        <button className='edit_button'>
                                            {localStorage.getItem('isAdmin') === '1' && <BsPencilSquare />}
                                        </button>
                                    </Link>
                                </div>
                                <h4>{e.nome}</h4>
                                <img className="img_product" src={e.imagem_url} alt="" />
                                <h3>{parseFloat(e.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                                <div className='cart_div'>
                                    <input className='cartQuanty_input'
                                        type="number"
                                        min="1"
                                        value={quantities[e.id] || '0'}
                                        onChange={(event) => handleQuantityChange(e.id, event.target.value)}
                                    />
                                    <button className='product_button' onClick={() => handleClick(e)}>
                                        <BsFillCartPlusFill />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ color: "grey", marginBottom: "355px" }}>
                            <h2>Nenhum produto encontrado</h2>
                            <FaStoreAltSlash />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
