import React, { useState, useEffect } from 'react';
import { BsFillCartDashFill, BsCartXFill } from 'react-icons/bs';
import { Header } from '../components/Header';
import { PurchaseModal } from '../components/PurchaseModal';
import { toast } from 'react-toastify';
import '../style/Global.css';

export const Cart = (props) => {
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const fetchCart = async () => {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/${userId}`);
        if (response.ok) {
            const cartData = await response.json();
            setData(cartData);
        } else {
            console.error('Erro ao buscar os dados do carrinho: ', await response.json());
        }
    }

    useEffect(() => {
        fetchCart();
    }, []);

    const removeItem = async (obj) => {
        await fetch(`${process.env.REACT_APP_API_URL}/${obj.id}`, {
            method: 'DELETE',
        });

        fetchCart();
    }

    const subTotal = data.reduce((acc, cur) => acc + parseFloat(cur.preco) * cur.quantidade, 0);
    const subTotalConvert = parseFloat(subTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    const handleClick = async () => {
        const userId = localStorage.getItem('userId');
        const { history: { push } } = props;

        const response = await fetch(`${process.env.REACT_APP_API_URL}/cartUser/${userId}`, { method: 'DELETE' });

        if (response.ok) {
            toast.success('Compra efetuada e carrinho zerado', {
                autoClose: 2000,
                position: 'bottom-right'
            });
        } else {
            toast.success('Houve um erro ao remover os itens do carrinho', {
                autoClose: 2000,
                position: 'bottom-right'
            });
        }

        push(`/payment/${subTotal}`);
    }

    return (
        <div>
            <Header />
            {subTotal === 0 ? (
                <div className='empty_cart_div'>
                    <h3>Carrinho Vazio :C</h3>
                    <BsCartXFill size={50} />
                </div>
            ) : (
                <div>
                    <h3>{`SubTotal: ${subTotalConvert}`}</h3>
                    <div className='product_area'>
                        {
                            data.map((e) => (
                                <div key={e.id} className='product_div'>
                                    <h4>{e.nome}</h4>
                                    <img className="img_product" src={e.imagem_url} alt="" />
                                    <h3>{parseFloat(e.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                                    <h3>Quantidade: {e.quantidade}</h3>
                                    <button className='product_button'
                                        onClick={() => removeItem(e)}
                                    >
                                        <BsFillCartDashFill color='red' />
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                    <button className='comprar_button_cart'
                        onClick={() => setModalIsOpen(true)}
                    >
                        Comprar
                    </button>
                    <PurchaseModal
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        onConfirm={handleClick}
                        subTotal={subTotalConvert}
                    />
                </div>
            )}
        </div>
    )
}
