import React from 'react'
import Modal from 'react-modal';
import '../style/Modal.css';

Modal.setAppElement('#root');

export const DeleteModal = ({ isOpen, onRequestClose, onConfirm }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirmação de Exclusão"
            className="pdModalContent"
        >
            <div className='pd_box_content'>
                <h2>Confirmação de Exclusão</h2>
                <p>Você realmente deseja excluir o produto do catálogo?</p>
                <button className='pd_yes_button' onClick={onConfirm}>Sim</button>
                <button className='pd_no_button' onClick={onRequestClose}>Não</button>
            </div>
        </Modal>
    )
}
