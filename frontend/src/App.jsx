import { useState } from 'react';

import './App.css';


import Navbar from './components/layout/Navbar/Navbar';
import FileCard from './pages/Convert/components/FileCard/FileCard';
import Logo from './assets/images/logo-universal.png'

import { LuUpload, LuX, LuHardDriveDownload, LuCornerDownLeft, LuCirclePlus, LuSettings2, LuChevronDown } from "react-icons/lu";
import { Button } from './components/ui/Button/Button';
import { SelectImage, ConvertImage, SaveFile } from "../wailsjs/go/main/App"; //* FUNCAO DO GO!!!!

function App() {
    const [selected, setSelected] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [open, setOpen] = useState(null);
    const [files, setFiles] = useState([]);
    const allowedFileTypes = new Set([
        'WEBP',
        'JPG',
        'PNG',
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

    function handleBackButton() {
        setFiles([])
    }


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
                    "size": 2, //adicionar size do arquivo pelo backend
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
        // setFiles(files.concat(ImageArray))
        console.log(...ImageArray);

        setFiles(prev => [...prev, ...ImageArray])

    }

    function handleConvert() {

        //* Em um futuro próximo, devo alterar esse index para ID, porque quero adicionar um botão X caso o user
        //* queria remover um arquivo ENQUANTO está convertendo
        try {
            files.forEach(async (item, i) => {
                if (!item.isConverted) {
                    const { path, convertTo } = item;
                    const convertedFilePath = await ConvertImage(path, convertTo);

                    setFiles(prev => {
                        /*//& Ao deixar ...prev, eu reutilizo as referencias dos objetos anteriores, fazendo com que
                        //& O react apenas compare a referencia de cada objeto, e atualize apenas os objetos os quais foram alterados */
                        const newArr = [...prev]
                        let newItem = { ...item, convertPath: convertedFilePath, isConverted: true }
                        newArr[i] = newItem
                        return newArr
                    })
                }
            })

        }
        catch (error) {
            return new Error(`Um erro ocorreu ao converter o arquivo: \n \n${error}`)
        }
        return files
    }

    async function saveFile(path, name, format) {
        try {
            SaveFile(path, name, format)
        } catch (error) {
            return new Error(error.message)
        }
    }


    return (<>
        <Navbar />
        <section className='header'>
            <div className='header_wrapper container'>
                {files.length > 0 ? (
                    <div className={'files_container'}>
                        <ul className='files_box' onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleConvert}>
                            {files.map((item, index) => {
                                let ID = index + files.length + 1
                                return (
                                    <FileCard
                                        file={item}
                                        key={ID}
                                        id={ID}
                                        isSaved={false}

                                        allowedFileTypes={allowedFileTypes}

                                        handleCloseButton={handleCloseButton}
                                        handleSave={saveFile}
                                    />
                                )
                            })}
                            <div className='files_settings'>
                                <div className='files_utils'>
                                    <Button type='button' onClick={handleFileInput} children={<><LuCirclePlus />Adicionar Mais</>} />
                                    <Button variant='primary' children={<><LuCornerDownLeft /></>} onClick={() => handleBackButton()} />
                                </div>
                                <div className='files_buttons'>
                                    <Button variant='primary' children={< LuSettings2 />} />
                                    {/*o ideal aqui seria passar uma array de strings ( file ) para entao converter todos juntos no Go.*/}
                                    <Button variant='secondary' children={<><LuHardDriveDownload />Converter Todos </>} onClick={async () => { files.forEach(file => handleConvert(file.path, file.convertTo)) }} />
                                </div >
                            </div >
                        </ul >

                    </div >
                ) : (
                        <div className='header_dropper_box' onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={() => handleFileInput()}>
                            <div className='dropper_img_wrap' >
                                <LuUpload /></div>
                            <h3>Selecionar Imagem(ns)</h3>
                            <p>Arraste & Solte ou <span className='highlight'>Escolha</span></p>
                        </div>
                    )
                }
            </div >
        </section >
    </>
    )
        }

export default App