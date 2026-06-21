import { useState } from 'react';

import './App.css';


import Navbar from './components/layout/Navbar/Navbar';
import Logo from './assets/images/logo-universal.png'

import { LuUpload, LuX, LuHardDriveDownload, LuCornerDownLeft, LuCirclePlus, LuSettings2, LuChevronDown } from "react-icons/lu";
import { Button } from './components/ui/Button/Button';
import { SelectImage, ConvertImage } from "../wailsjs/go/main/App"; //* FUNCAO DO GO!!!!

function App() {
    const [selected, setSelected] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [open, setOpen] = useState(null);
    const [files, setFiles] = useState([]);
    const allowedFileTypes = new Set([
        'WEBP',
        'JPG',
        'PNG',
        'AVIF'
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
    const handleDrop = () => { }

    function handleCloseButton(targetId) {
        setFiles(filesArray => filesArray.filter((item) => item.id != targetId));
    };



    //* Recebe a imagem em Base64, decodifica e converte em imagem. Passa o valor para o state Files()
    async function handleFileInput() {
        let ImageArray = []
        try {
            const pathArray = await SelectImage();

            pathArray.forEach(async (item, i) => {
                let { FileName, FilePath, FileType, Preview } = item
                let fileObj = {
                    "id": files.length + i + 2,
                    "name": FileName,
                    "type": FileType,
                    "src": `data:image/${FileType};charset=utf-8;base64,${Preview}`, //* blob do arquivo em Base64
                    "path": FilePath,
                    "isConverted": false,
                    "convertPath": "",
                    "convertTo": "WEBP",
                }
                ImageArray.push(fileObj)
            })
        } catch (error) {
            console.log(new Error(`Ocorreu um erro ao processar suas imagens: ${error.message}`))
            return new Error(`Ocorreu um erro ao processar suas imagens: ${error.message}`)
        }
        setFiles(files.concat(ImageArray))
    }

    function handleConvert() {
        try {
            files.forEach(async image => {
                if (!image.isConverted) {
                    let convertedImage = await ConvertImage(image.path, image.convertTo)
                    console.log(image);
                    console.log(convertedImage);
                    image.convertPath = convertedImage;
                    image.isConverted = true;
                }
            })
        }
        catch (error) {
            return new Error(`Um erro ocorreu ao converter o arquivo: \n \n${error}`)
        }
        return files
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
                {files.length > 0 ? (
                    <div className={'files_container'}>
                        <ul className='files_box' onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleConvert}>
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
                                            <Button variant={"dropdown"} children={<>{item.convertTo}<span className={'rotate_onClick'}><LuChevronDown /></span></>} onClick={() => { open ? setOpen(null) : setOpen(id) }} />
                                            {open == id ? (
                                                <ul className='format_options'>
                                                    {Array.from(allowedFileTypes).map(format => (
                                                        <li
                                                            key={format}
                                                            onClick={() => {
                                                                setOpen(false);
                                                                item.convertTo = format
                                                            }}
                                                            className='format_option'>
                                                            {format}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : _}
                                            {!item.isConverted ?
                                                (<Button onClick={() => { handleCloseButton(id) }} children={<LuX />} />)
                                                :
                                                (<Button onClick={() => {}} children={<LuHardDriveDownload />} />)
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
                                    <div type='file' accept='image/webp,image/jpeg,image/jpg,image/png,image/avif' id='file-input' multiple onClick={handleFileInput} ></div>
                                </div>
                                <Button variant='primary' children={<><LuCornerDownLeft /></>} />
                            </div>
                            <div className='files_buttons'>
                                <Button variant='primary' children={< LuSettings2 />} />

                                {/*o ideal aqui seria passar uma array de strings ( file ) para entao converter todos juntos no Go.*/}
                                <Button variant='secondary' children={<><LuHardDriveDownload />Converter Todos </>} onClick={async () => { files.forEach(file => handleConvert(file.path, file.convertTo)) }} />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='header_dropper_box' onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => handleFileInput()}>
                        <div className='dropper_img_wrap' >
                            <LuUpload /></div>
                        <h3>Selecionar Imagem(ns)</h3>
                        <p>Arraste & Solte ou <span className='highlight'>Escolha</span></p>
                    </div>
                )}
            </div>
        </section>
    </>
    )
}

export default App

