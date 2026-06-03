import { useState } from 'react';
import './App.css';
import Logo from './assets/images/logo-universal.png'

function App() {



    return (<>
        <section className='nav'>
            <a href='#' className='nav_logo' draggable='false'>
                <img src={Logo} width={'60px'} draggable='false' ></img>
            </a>
            <span className='nav_buttons'>
                <a href='#' className='highlight'>
                    Precisa de ajuda?
                </a>
                <a href='#' className='button'>
                    Contato
                </a>
            </span>
        </section>
        <section className='header'>
            <div className='header_wrapper container'>
                <div className='header_dropper_box'>
                    <div className='dropper_img_wrap'>
                        {/* //! trocar por svg de upload */}
                            <img src={Logo} width={'30px'} className='dropper_img'></img></div>
                    <h3>Selecionar Imagem(ns)</h3>
                    <p>Arraste & Solte ou <a href='#' className='dropper_link'>Escolha</a></p>
                </div>
            </div>
        </section>
    </>
    )
}

export default App
