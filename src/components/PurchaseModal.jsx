import React from 'react';
import Modal from 'react-modal';
import '../style/PurchaseModal.css';

Modal.setAppElement('#root');

export const PurchaseModal = ({ isOpen, onRequestClose, onConfirm }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirmação de Compra"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)' // Cor de fundo do overlay
                },
                content: {
                    width: '50%', // Largura do modal
                    height: '50%', // Altura do modal
                    margin: 'auto', // Centraliza o modal
                    padding: '20px', // Espaçamento interno do modal
                    border: '1px solid #40b7d3', // Borda do modal
                    borderRadius: '10px', // Raio da borda do modal
                    backgroundColor: 'black' // Cor de fundo do modal
                }
            }}
        >
            <h2>Confirmação de Compra</h2>
            <p>Você realmente deseja efetuar a compra de todos os itens do carrinho?</p>
            <button onClick={onConfirm}>Sim</button>
            <button onClick={onRequestClose}>Não</button>
        </Modal>
    );
};
