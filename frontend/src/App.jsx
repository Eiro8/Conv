import { useState, useRef } from 'react';

import './App.css';


import Navbar from './components/layout/Navbar/Navbar';
import FileCard from './pages/Convert/components/FileCard/FileCard';
import Logo from './assets/images/logo-universal.png'

import { LuUpload, LuX, LuHardDriveDownload, LuCornerDownLeft, LuCirclePlus, LuSettings2 } from "react-icons/lu";
import { Button } from './components/ui/Button/Button';

import { GetInputPath, ConvertImage, SaveFile, ParseImagePaths } from "../wailsjs/go/main/App";
import { OnFileDrop } from '../wailsjs/runtime/runtime'

function App() {
    const [selected, setSelected] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [open, setOpen] = useState(false)
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


    function handleCloseButton(targetId) {
        setFiles(filesArray => filesArray.filter((item) => item.id != targetId));
    };

    function handleBackButton() {
        setFiles([])
    }

    OnFileDrop((x, y, paths) => {
        handleImageDrop(paths)
    }, true)


    function createImageObject(id = 1, name = "Image-Name", type = "TYPE", base64 = "BASE64", size = 67, path = "/", isConverted, convertPath = "/", convertTo = "WEBP", convertSize = 67) {
        let fileObj = {
            "id": id,
            "name": name,
            "type": type,
            "src": `data:image/${type};charset=utf-8;base64,${base64}`, //* blob do arquivo em Base64
            "size": size, //adicionar size do arquivo pelo backend
            "path": path,
            "isConverted": isConverted,
            "convertPath": convertPath,
            "convertTo": convertTo,
            "convertSize": convertSize,
        }

        return fileObj
    }

    async function handleImageDrop(pathArray) {
        console.log(pathArray)
        await imageParser(pathArray);
    }

    async function handleImageInput() {
        const pathArray = await GetInputPath();
        await imageParser(pathArray);
    }

    async function imageParser(pathArray) {
        try {
            let ImageObjects = await ParseImagePaths(pathArray);
            ImageObjects.forEach(async (item, i) => {
                let { FileName, FilePath, FileType, FileSize, ConvertedPath, Base64Preview, ConvertedSize } = item
                const fileObj = createImageObject(
                    files.length + i + 2,
                    FileName,
                    FileType,
                    Base64Preview,
                    FileSize,
                    FilePath,
                    false,
                    ConvertedPath,
                    "WEBP",
                    ConvertedSize
                )
                setFiles(prev => [...prev, fileObj])
            })
        } catch (error) {
            console.log(new Error(`Ocorreu um erro ao processar suas imagens: ${error.message}`))
            return new Error(`Ocorreu um erro ao processar suas imagens: ${error.message}`)
        }
    }

    async function handleConvert() {
        //* Em um futuro próximo, devo alterar esse index para ID, porque quero adicionar um botão X caso o user
        //* queria remover um arquivo ENQUANTO está convertendo
        try {
            files.forEach(async (file, i) => {
                if (!file.isConverted) {
                    let { NewPath, NewSize } = await ConvertImage(file.path, file.convertTo);

                    setFiles(prev => {
                        const newArr = [...prev];
                        let newFile = { ...file, convertPath: NewPath, convertSize: NewSize, isConverted: true };
                        newArr[i] = newFile;
                        return newArr
                    })
                } else {
                    return file
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
        <section className='header' onDragOver={handleDragOver} onDragLeave={handleDragLeave} style={{ "--wails-drop-target": "drop" }}>
            <div className='header_wrapper container'>
                {files.length > 0 ? (
                    <div className={'files_container'}>
                        <ul className='files_box' >
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
                                    <Button type='button' onClick={handleImageInput} children={<><LuCirclePlus />Adicionar Mais</>} />
                                    <Button variant='primary' children={<><LuCornerDownLeft /></>} onClick={() => handleBackButton()} />
                                </div>
                                <div className='files_buttons'>
                                    <Button variant='primary' children={< LuSettings2 />} onClick={() => (setOpen(!open))} />
                                    {open ?
                                        (
                                            <div className='config_background'>
                                                <div className='config_options'>
                                                    <Button children={<LuX />} onClick={() => setOpen(false)} />
                                                    <div className='options_box'>
                                                        <h2>Configurações</h2>
                                                        <div className='option'>
                                                            <input className='option_input' id='option_input' type='text' placeholder='ex: C:/Users/Pogba/Downloads'></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (null)}
                                    {/*o ideal aqui seria passar uma array de strings ( file ) para entao converter todos juntos no Go.*/}
                                    <Button variant='secondary' children={<><LuHardDriveDownload />Converter Todos </>} onClick={async () => { handleConvert() }} />
                                </div >
                            </div >
                        </ul >

                    </div >
                ) : (
                    <div className='header_dropper_box' onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={() => handleImageInput()}>
                        <div className='dropper_img_wrap' >
                            <LuUpload /></div>
                        <h3>Selecionar Imagem(ns)</h3>
                        <p>Arraste & Solte ou <span className='highlight'>Escolha</span></p>
                    </div>
                )}
            </div >
        </section >
    </>
    )
}

export default App