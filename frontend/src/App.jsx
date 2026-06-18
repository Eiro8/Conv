import { useEffect, useState } from 'react';
import crypto from 'crypto'

import './App.css';


import Logo from './assets/images/logo-universal.png'



import { LuUpload, LuX, LuHardDriveDownload, LuCornerDownLeft, LuCirclePlus, LuSettings2 } from "react-icons/lu";
import { Button } from './components/ui/Button/Button';
import { SelectImage } from "../wailsjs/go/main/App"; //* FUNCAO DO GO!!!!

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

    //* handlers antigos
    /*
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
    
        */
    //*  ++__++__++__++__++__++__++__++__++__++__++__++__++__++__++

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

    function handleCloseButton(targetId) {
        setFiles(filesArray => filesArray.filter((item) => item.id != targetId));
    };

    function handleDrop() { }

    async function handleFileInput() {
        let ImageArray = []
        try {
            const pathArray = await SelectImage();

            pathArray.forEach(async (item, i) => {
                let { FileName, FilePath, FileType, Preview } = item
                let fileObj = {
                    "id": files.length + i + 1,
                    "name": FileName,
                    "path": FilePath,
                    "type": FileType,
                    "src": `data:image/${FileType};charset=utf-8;base64,${Preview}`

                }
                ImageArray.push(fileObj)
                console.log(ImageArray)
                console.log(item)
            })
        } catch (error) {
            console.log(new Error(`Ocorreu um erro ao processar suas imagens: ${error.message}`))
            return new Error(`Ocorreu um erro ao processar suas imagens: ${error.message}`)
        }
        setFiles(files.concat(ImageArray))

    }

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
                <div className={'files_container'}>
                    <ul className='files_box' onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                        {files.map((item, index) => {
                            let { id, name, _, type, src } = item;
                            return (
                                <li className={`file`} key={`${id} + ${index}`}>
                                    <img src={src} draggable={false} className={'image'} />
                                    <div className='file_description'>
                                        <p className='text_overflow file_name'>{name}</p>
                                        {/* //*fazer calculo pra lidar com tamanho do arquivo e tipo de arquivo*/}
                                        <p className='text_overflow file_type'>{type}, {4} Bytes</p>
                                    </div>
                                    <span className={'buttons'}>
                                        <p className='text'>Converter para</p>
                                        <Button children={selected ? selected : "WEBP"} onClick={() => setOpen(!open)} />
                                        <Button children={selected ? selected : "WEBP"} onClick={() => handleFileInput()} />
                                        {open && (
                                            <ul className='format_options'>
                                                {Array.from(allowedFileTypes).map(format => (
                                                    <li
                                                        key={format}
                                                        onClick={() => {
                                                            setSelected(format);
                                                            setOpen(false);
                                                        }}
                                                        className='format_option'
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
                                    </span>
                                </li>
                            )
                        })}
                    </ul>
                    <div className='files_settings'>
                        <div className='files_utils'>
                            <div className='files_form'>
                                <label htmlFor={'file-input'} className='input-text'><LuCirclePlus />Adicionar Mais</label>
                                <input type='file' accept='image/webp,image/jpeg,image/jpg,image/png,image/avif' id='file-input' multiple onChange={handleFileInput} />
                            </div>
                            <Button variant='primary' children={<><LuCornerDownLeft /></>} />
                        </div>
                        <div className='files_buttons'>
                            <Button variant='primary' children={< LuSettings2 />} />
                            <Button variant='secondary' children={<><LuHardDriveDownload />Converter Todos </>} onClick={async () => { handleFileInput() }} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}

export default App

