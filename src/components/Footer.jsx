import React from 'react';
import '../style/Footer.css';
import logo1 from '../img/loja-do-hardware-logo.png';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export const Footer = () => {
    return (
        <footer class="rodape" id="contato">
            <div class="rodape-div">
                <div class="rodape-div-1">
                    <div class="rodape-div-1-coluna">
                        <img className='imagem_logo' src={logo1} alt="logo 1" />
                        <p>Nova Prata, Rio Grande do Sul - RS, 95320-000</p>
                    </div>
                </div>
                <div class="rodape-div-2">
                    <div class="rodape-div-2-coluna">

                        <span><b>Contatos</b></span>
                        <p>
                            <a href="#e-mail">pedrogadodev@gmail.com</a>
                        </p>
                        <p>+55 54 99900-0000</p>
                    </div>
                </div>
                <div class="rodape-div-3">
                    <div class="rodape-div-3-coluna">
                        <span><b>Links</b></span>
                        <p><a href="#servicos">Serviços</a></p>
                        <p><a href="#empresa">Empresa</a></p>
                        <p><a href="#sobre">Sobre</a></p>
                    </div>
                </div>
                <div class="rodape-div-4">
                    <div class="rodape-div-4-coluna">
                        <span><b>Outros</b></span>
                        <p>
                            <Link to="/privacyPolicies">Políticas de Privacidade</Link>
                        </p>
                    </div>
                </div>
            </div>
            <p class="rodape-direitos">Pedro Henryke Gado © 2025 – Todos os Direitos Reservados.</p>
        </footer>
    )
}
