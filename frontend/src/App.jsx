import { useEffect, useState } from 'react';
import './App.css';
import Logo from './assets/images/logo-universal.png'
import { LuUpload, LuX } from "react-icons/lu";

function App() {

    const [isHovered, setIsHovered] = useState(false);
    const [files, setFiles] = useState([]);
    const allowedFileTypes = new Set([
        'image/webp',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/avif']);

    //* Lógica de tratamento do Drag and drop de imagens
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsHovered(true)
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsHovered(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsHovered(false)

        //? converte os arquivos em array JS
        const droppedFiles = Array.from(e.dataTransfer.files);
        let filteredFiles = fileHandler(droppedFiles);

        setFiles(files.concat(filteredFiles));
    };
    const handleInput = (e) => {
        e.preventDefault();
        const inputFiles = Array.from(e.target.files);
        let filteredFiles = fileHandler(inputFiles);
        setFiles(files.concat(filteredFiles));
    };

    function fileHandler(arrayOfFiles) {
        let filteredFiles = [];

        //* verifica se formato de  arquivo é compativel
        arrayOfFiles.forEach((file, index) => {
            if (allowedFileTypes.has(file.type)) {
                filteredFiles.push(file);
            } else {
                alert(`O arquivo ${arrayOfFiles[index].name} não é uma  imagem`)
            }
        })

        let objectsArray = filteredFiles.map((item,i) => (
            {
                "id": files.length + i + 1,
                "file": item
            })
        )
        return objectsArray;
    };




    //* fazer o fetch aqui pro backend pegar os arquivos
    // useEffect(() => {
    //     console.log(Array.from(files));
    //     fetch('https://localhost:8000', {
    //         "method": "post",
    //     })
    // }, [files])
    //*Tratamento do botão de remover imagem
    useEffect(() => {

        let buttons = document.getElementsByClassName('image_preview_x');
        Array.from(buttons).forEach((button) => {
            button.addEventListener('click', (e) => {
                const targetHtmlID = e.target.dataset.target; //*ID do elemento a ser removido
                const targetIndex = e.target.dataset.id; //* index do elemento em 'files'
                document.getElementById(targetHtmlID)?.remove();
                delete files[targetIndex];
            }, { once: true });
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
                    {files.map((item, i) => {
                        let { file, id } = item;
                        return (
                            <li className={`image_preview`} id={`image_preview-${id}`} key={id}>
                                <img src={URL.createObjectURL(file)} alt={file.name} height={100} draggable={false} />
                                <button className={'image_preview_x'} data-target={`image_preview-${id}`} data-id={`${id}`}>
                                    <div className='local_anchor'>
                                        <LuX />
                                    </div>
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
