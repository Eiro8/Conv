import { useEffect, useState } from 'react';
import './App.css';
import Logo from './assets/images/logo-universal.png'
import { LuUpload, LuX } from "react-icons/lu";

function App() {

    const [isHovered, setIsHovered] = useState(false);
    const [files, setFiles] = useState([]);
    const [imageCount, setImageCount] = useState(0);

    //* Lógica de tratamento do Drag and drop
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsHovered(true)
    }
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsHovered(false);
    }
    const handleDrop = (e) => {
        e.preventDefault();
        setIsHovered(false)

        //converte os arquivos em array JS
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles(files.concat(droppedFiles));
    }
    const handleInput = (e) => {
        e.preventDefault();
        let newFiles = Array.from(e.target.files);
        setFiles(files.concat(newFiles));
    };
    //* fazer o fetch aqui pro backend pegar os arquivos
    // useEffect(() => {
    //     console.log(Array.from(files));
    //     fetch('https://localhost:8000', {
    //         "method": "post",
    //     })
    // }, [files])

    useEffect(() => {
        let buttons = document.getElementsByClassName('image_preview_x');
        console.log(typeof (Array.from(buttons)));
        Array.from(buttons).forEach((button) => {
            button.addEventListener('click', (e) => {
                let itemToBeRemoved = e.target.dataset.target;
                itemToBeRemoved.remove();
            })
        })
    }, [files]);

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
                <div className='header_dropper_box' onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                    <div className='dropper_img_wrap'>
                        <LuUpload /></div>
                    <h3>Selecionar Imagem(ns)</h3>
                    <p>Arraste & Solte ou <span className='highlight'>Escolha</span></p>
                    <input type='file' accept='image/webp,image/jpeg,image/jpg,image/png,image/avif' id='file-input' multiple onChange={handleInput} />
                </div>
                <ul className='header_images_container'>
                    {files.map((file, i) => {
                        return (
                            <li className={`image_preview`} id={`image_preview-${i}`} key={`image_preview-${i}`}>
                                <img src={URL.createObjectURL(file)} alt={file.name} height={100} />
                                <button className={'image_preview_x'} data-target={`image_preview-${i}`}>
                                    <LuX />
                                </button>

                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    </>
    )
}

export default App
