import React from 'react';
import Modal from 'react-modal';
import '../style/Modal.css';

Modal.setAppElement('#root');

export const PurchaseModal = ({ isOpen, onRequestClose, onConfirm, subTotal }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirmação de Compra"
            className="pdModalContent"
        >
            <div className='pd_box_content'>
                <h2>Confirmação de Compra</h2>
                <h3>SubTotal: {subTotal}</h3>
                <p>Você realmente deseja efetuar a compra de todos os itens do carrinho?</p>
                <button className='pd_yes_button' onClick={onConfirm}>Sim</button>
                <button className='pd_no_button' onClick={onRequestClose}>Não</button>
            </div>
        </Modal>
    );
};
