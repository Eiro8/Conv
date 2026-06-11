import { useEffect, useState } from 'react';
import './App.css';
import Logo from './assets/images/logo-universal.png'
import { LuUpload, LuX, LuHardDriveDownload } from "react-icons/lu";
import { Button } from './components/ui/Button/Button';

function App() {
    const [isUploaded, setUploaded] = useState(false);
    const [selected, setSelected] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState([]);
    const allowedFileTypes = new Set([
        'image/webp',
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/avif'
    ]);
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
        let filteredFiles = handleFiles(droppedFiles);
        setFiles(filesArray => filesArray.concat(filteredFiles));
        e.target.value = '';
    };

    const handleInput = (e) => {
        e.preventDefault();
        try {
            const inputFiles = Array.from(e.target.files);
            let filteredFiles = handleFiles(inputFiles);
            setFiles(filesArray => filesArray.concat(filteredFiles));
        } catch (error) {
            console.log(error)
            console.log(`O array  de itens que nao foi: ${Array.from(e.target.files)}`);
        }
        e.target.value = '';

    };


    function handleFiles(arrayOfFiles) {
        let filteredFiles = [];

        //?verifica se formato de  arquivo é compativel
        arrayOfFiles.forEach((file, index) => {
            if (allowedFileTypes.has(file.type)) {
                filteredFiles.push(file);
            } else {
                alert(`O arquivo ${arrayOfFiles[index].name} não é uma  imagem`)
            }
        })
        //?Converte a array de files em array de objetos { id , File}
        let objectsArray = filteredFiles.map((item, i) => (
            {
                "id": files.length + i + 1,
                "file": item,
                "convertTo": "webp"
            })
        )
        return objectsArray;
    };

    // function handleImageClose(e) {
    //     e.preventDefault();
    //     let buttons = document.getElementsByClassName('image_preview_x');

    //     //? Deleta o item da array em base de seu ID.
    //     Array.from(buttons).forEach((button) => {
    //         button.addEventListener('click', (e) => {
    //             const targetID = e.target.dataset.id;
    //             setFiles(files.filter((item) => item.id != targetID));
    //         }, { once: true });
    //     });
    // }

    function handleCloseButton(targetId) {
        setFiles(filesArray => filesArray.filter((item) => item.id != targetId));
    };


    //* fazer o fetch aqui pro backend pegar os arquivos
    // useEffect(() => {
    //     console.log(Array.from(files));
    //     fetch('https://localhost:8000', {
    //         "method": "post",
    //     })
    // }, [files])
    //*Tratamento do botão de remover imagem


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
                    <input type='file' accept='image/webp,image/jpeg,image/jpg,image/png,image/avif' id='file-input' multiple onChange={handleInput} on />
                </div>
                <ul className='header_files_container'>
                    {files.map((item, index) => {
                        let { file, id } = item;
                        return (
                            <li className={`file_preview`} key={`${id} + ${index}`}>
                                <img src={URL.createObjectURL(file)} draggable={false} className={'uploaded_image'} />
                                <div className='file_info'>
                                    <p>{file.name}</p>
                                    {/*fazer calculo pra lidar com tamanho do arquivo e tipo de arquivo*/}
                                    <p>{file.type},{file.size} Bytes</p>

                                </div>

                                <p>Converter para</p>
                                <Button children={selected} onClick={() => setOpen(!open)} />
                                {open && (
                                    <ul>
                                        {Array.from(allowedFileTypes).map(format => (
                                            <li
                                                key={format}
                                                onClick={() => {
                                                    setSelected(format);
                                                    setOpen(false);
                                                }}
                                            >
                                                {format}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {!isUploaded ?
                                    (<Button data-id={`${id}`} onClick={() => { handleCloseButton(id) }} children={<LuX />} />)
                                    :
                                    (<Button data-id={`${id}`} onClick={() => { }} children={<LuHardDriveDownload />} />)
                                }
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
