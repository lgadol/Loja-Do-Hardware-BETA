import React from 'react';
import { toast } from 'react-toastify';


/* Página Profile */
export const EstadosBrasileiros = ({ value, onChange, className }) => (
    <select
        className='estadosBR_profile'
        name="estado"
        value={value}
        onChange={onChange}
    >
        <option value="">Selecione um estado</option>
        <option value="AC">AC</option>
        <option value="AL">AL</option>
        <option value="AP">AP</option>
        <option value="AM">AM</option>
        <option value="BA">BA</option>
        <option value="CE">CE</option>
        <option value="DF">DF</option>
        <option value="ES">ES</option>
        <option value="GO">GO</option>
        <option value="MA">MA</option>
        <option value="MT">MT</option>
        <option value="MS">MS</option>
        <option value="MG">MG</option>
        <option value="PA">PA</option>
        <option value="PB">PB</option>
        <option value="PR">PR</option>
        <option value="PE">PE</option>
        <option value="PI">PI</option>
        <option value="RJ">RJ</option>
        <option value="RN">RN</option>
        <option value="RS">RS</option>
        <option value="RO">RO</option>
        <option value="RR">RR</option>
        <option value="SC">SC</option>
        <option value="SP">SP</option>
        <option value="SE">SE</option>
        <option value="TO">TO</option>
    </select>
);

export const handleInputUserChange = (event, setEditedUser, editedUser) => {
    const { name, value } = event.target;
    let errorMessage = '';

    switch (name) {
        case 'usuario':
            if (value.length > 20 || /[^a-zA-Z0-9]/.test(value)) {
                errorMessage = 'O usuário não pode ter mais de 20 caracteres, espaços ou conter caracteres especiais';
            }
            break;
        case 'nome':
            if (value.length > 50 || /[^a-zA-Z\s]/.test(value)) {
                errorMessage = 'O nome não pode ter mais de 50 caracteres ou conter caracteres especiais';
            }
            break;
        case 'email':
            if (value.length > 50) {
                errorMessage = 'O email não pode ter mais de 50 caracteres';
            }
            break;
        case 'cpf':
            if (value.length > 11 || /\D/.test(value)) {
                errorMessage = 'O CPF não pode ter mais de 11 caracteres e só pode conter números';
            }
            break;
        case 'rua':
            if (value.length > 150 || /[^a-zA-Z\s]/.test(value)) {
                errorMessage = 'A rua não pode ter mais de 150 caracteres e só pode conter letras';
            }
            break;
        case 'bairro':
            if (value.length > 50 || /[^a-zA-Z\s]/.test(value)) {
                errorMessage = 'O bairro não pode ter mais de 50 caracteres ou conter caracteres especiais';
            }
            break;
        case 'numero':
            if (value.length > 20 || /\D/.test(value)) {
                errorMessage = 'O número não pode ter mais de 20 caracteres e só pode conter números';
            }
            break;
        case 'cep':
            if (value.length > 8 || /\D/.test(value)) {
                errorMessage = 'O CEP não pode ter mais de 8 caracteres e só pode conter números';
            }
            break;
        case 'cidade':
            if (value.length > 150 || /[^a-zA-Z\s]/.test(value)) {
                errorMessage = 'A cidade não pode ter mais de 150 caracteres e só pode conter letras';
            }
            break;
        case 'senha':
            if (value.length > 64) {
                errorMessage = 'A senha não pode ter mais de 64 caracteres';
            }
            break;
        default:
            break;
    }

    if (errorMessage) {
        toast.error(errorMessage, {
            position: "bottom-right",
            autoClose: 2000
        });
    } else {
        setEditedUser({
            ...editedUser,
            [name]: value,
        });
    }
};

export const checkUser = async (user, editedUser) => {
    const response = await fetch(`http://localhost:4000/checkUser/${user.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario: editedUser.usuario }),
    });

    if (!response.ok) {
        const { message } = await response.json();
        toast.error(message, {
            position: "bottom-right",
            autoClose: 2000
        });
        return false;
    }

    return true;
};

export const checkEmail = async (user, editedUser) => {
    const response = await fetch(`http://localhost:4000/checkEmail/${user.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: editedUser.email }),
    });

    if (!response.ok) {
        const { message } = await response.json();
        toast.error(message, {
            position: "bottom-right",
            autoClose: 2000
        });
        return false;
    }

    return true;
};

export const checkCpf = async (user, editedUser) => {
    const response = await fetch(`http://localhost:4000/checkCpf/${user.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf: editedUser.cpf }),
    });

    if (!response.ok) {
        const { message } = await response.json();
        toast.error(message, {
            position: "bottom-right",
            autoClose: 2000
        });
        return false;
    }

    return true;
};

export const checkPassword = async (user, editedUser) => {
    const response = await fetch(`http://localhost:4000/checkPassword/${user.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: editedUser.senha }),
    });

    if (!response.ok) {
        const { message } = await response.json();
        toast.error(message, {
            position: "bottom-right",
            autoClose: 2000
        });
        return false;
    }

    return true;
};

/* Página Register */

export const handleRegisterInput = (event, setState, fieldName) => {
    const { value } = event.target;
    let errorMessage = '';

    switch (fieldName) {
        case 'usuario':
            if (value.length > 20 || /[^a-zA-Z0-9]/.test(value)) {
                errorMessage = 'O usuário não pode ter mais de 20 caracteres, espaços ou conter caracteres especiais';
            }
            break;
        case 'nome':
            if (value.length > 50 || /[^a-zA-Z\s]/.test(value)) {
                errorMessage = 'O nome não pode ter mais de 50 caracteres ou conter caracteres especiais';
            }
            break;
        case 'email':
            if (value.length > 50) {
                errorMessage = 'O email não pode ter mais de 50 caracteres';
            }
            break;
        case 'cpf':
            if (value.length > 11 || /\D/.test(value)) {
                errorMessage = 'O CPF não pode ter mais de 11 caracteres e só pode conter números';
            }
            break;
        case 'rua':
            if (value.length > 150 || /[^a-zA-Z\s]/.test(value)) {
                errorMessage = 'A rua não pode ter mais de 150 caracteres e só pode conter letras';
            }
            break;
        case 'bairro':
            if (value.length > 50 || /[^a-zA-Z\s]/.test(value)) {
                errorMessage = 'O bairro não pode ter mais de 50 caracteres ou conter caracteres especiais';
            }
            break;
        case 'numero':
            if (value.length > 20 || /\D/.test(value)) {
                errorMessage = 'O número não pode ter mais de 20 caracteres e só pode conter números';
            }
            break;
        case 'cep':
            if (value.length > 8 || /\D/.test(value)) {
                errorMessage = 'O CEP não pode ter mais de 8 caracteres e só pode conter números';
            }
            break;
        case 'cidade':
            if (value.length > 150 || /[^a-zA-Z\s]/.test(value)) {
                errorMessage = 'A cidade não pode ter mais de 150 caracteres e só pode conter letras';
            }
            break;
        case 'senha':
            if (value.length > 64) {
                errorMessage = 'A senha não pode ter mais de 64 caracteres';
            }
            break;
        default:
            break;
    }

    if (errorMessage) {
        toast.error(errorMessage, {
            position: "bottom-right",
            autoClose: 2000
        });
    } else {
        setState(value);
    }
};

/* Página Product */
export const CategoriasProdutos = ({ value, onChange, className }) => (
    <select
        className='categorias_produtos'
        name="categoria"
        value={value}
        onChange={onChange}
    >
        <option value="">Selecione uma Categoria</option>
        <option value="PLACA DE VÍDEO">PLACA DE VÍDEO</option>
        <option value="PROCESSADOR">PROCESSADOR</option>
        <option value="COOLER">COOLER</option>
        <option value="FONTE">FONTE</option>
        <option value="ARMAZENAMENTO">ARMAZENAMENTO</option>
        <option value="GABINETE">GABINETE</option>
        <option value="ARMAZENAMENTO">ARMAZENAMENTO</option>
        <option value="PLACA MÃE">PLACA MÃE</option>
        <option value="MEMÓRIA RAM">MEMÓRIA RAM</option>
        <option value="OUTRO">OUTRO</option>
    </select>
);

/* Página EditProduct */

export const handleInputProductChange = (event, setEditedProduct, editedProduct) => {
    const { name, value } = event.target;
    let errorMessage = '';

    switch (name) {
        case 'nome':
            if (value.length > 100 || /[^a-zA-Z\s]/.test(value)) {
                errorMessage = 'O nome não pode ter mais de 100 caracteres ou conter caracteres especiais.';
            }
            break;
        case 'descricao':
            if (value.length > 200 || /[^a-zA-Z\s]/.test(value)) {
                errorMessage = 'A descrição não pode ter mais de 200 caracteres ou conter caracteres especiais.';
            }
            break;
        case 'preco':
            if (value.length > 30 || /\D/.test(value)) {
                errorMessage = 'O número não pode ter mais de 30 caracteres e só pode conter números.';
            }
            break;
        case 'imagem_url':
            if (value.length > 500) {
                errorMessage = 'A URL da imagem não pode ter mais de 500 caracteres.';
            }
            break;
        default:
            break;
    }

    if (errorMessage) {
        toast.error(errorMessage, {
            position: "bottom-right",
            autoClose: 2000
        });
    } else {
        setEditedProduct({
            ...editedProduct,
            [name]: value,
        });
    }
};

export const checkProductName = async (product, editedProduct) => {
    const response = await fetch(`http://localhost:4000/checkProduct/${product.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: editedProduct.nome }),
    });

    if (!response.ok) {
        const { message } = await response.json();
        toast.error(message, {
            position: "bottom-right",
            autoClose: 2000
        });
        return false;
    }

    return true;
};

export const checkImageUrl = async (product, editedProduct) => {
    const response = await fetch(`http://localhost:4000/checkUrlImg/${product.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imagem_url: editedProduct.imagem_url }),
    });

    if (!response.ok) {
        const { message } = await response.json();
        toast.error(message, {
            position: "bottom-right",
            autoClose: 2000
        });
        return false;
    }

    return true;
};