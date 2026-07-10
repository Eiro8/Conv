import { useState, useRef, useEffect } from 'react';

import './App.css';


import Navbar from './components/layout/Navbar/Navbar';
import FileCard from './pages/Convert/components/FileCard/FileCard';
import Logo from './assets/images/logo-universal.png'

import { LuUpload, LuX, LuHardDriveDownload, LuCornerDownLeft, LuCirclePlus, LuSettings2, LuFile } from "react-icons/lu";
import { Button } from './components/ui/Button/Button';

import { GetInputPath, ConvertImage, SaveFile, ParseImagePaths, OpenDirectoryDialog } from "../wailsjs/go/main/App";
import { OnFileDrop } from '../wailsjs/runtime/runtime'

function App() {

    const [saveDirectory, setSaveDirectory] = useState("");
    const [convertQuality, setConvertQuality] = useState(1)


    const ConfigForm = useRef();
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


    /**
     * Remove de 'files' o elemento cujo targetID for igual a seu ID.
     * @param {string} targetId ID do elemento a ser deletado do useState files 
     */
    function handleCloseButton(targetId) {
        setFiles(filesArray => filesArray.filter((item) => item.ID != targetId));
    };

    /** 
     * Reseta setFiles() para uma array vazia
    */
    function handleBackButton() {
        setFiles([])
    }

    OnFileDrop((x, y, paths) => {
        handleImageDrop(paths)
    }, true)

    /**
     * Recebe uma array de paths e os executa chamando function imageParser()
     * @param {string} pathArray array de paths de arquivos  
     */

    async function handleImageDrop(pathArray) {
        await imageParser(pathArray);
    }

    /**
     * Chama {@link GetInputPath} e executa o retorno em {@link imageParser}
     */
    async function handleImageInput() {
        const pathArray = await GetInputPath();
        await imageParser(pathArray);
    }

    /**
     * Recebe uma lista de caminhos de imagens, cria os objetos correspondentes
    * através de {@link ParseImagePaths} e adiciona os arquivos ao estado.
     * 
     * @param {string} pathArray 
     * @returns erro caso ocorra uma falha
     */
    async function imageParser(pathArray) {
        try {
            let ImageObjects = await ParseImagePaths(pathArray);
            ImageObjects.forEach(async (fileObj, i) => {
                setFiles(prev => [...prev, fileObj]);
            })
        } catch (error) {
            console.log(new Error(`Ocorreu um erro ao processar suas imagens: ${error.message}`))
            return new Error(`Ocorreu um erro ao processar suas imagens: ${error.message}`)
        }
    }

    /**
     * processa os arquivos de {@link files} e verifica se estao convertidos.
     * caso nao,  {@link ConvertImage} irá converte-los e atualizar seus objetos 
     * @returns erro caso ocorra um erro ao converter um arquivo
     */
    async function handleConvert() {
        try {
            files.forEach(async (file, i) => {
                const { IsConverted, FilePath, ConvertTo } = file;
                if (!IsConverted) {
                    let { NewPath, NewSize } = await ConvertImage(FilePath, ConvertTo, convertQuality);
                    setFiles(prev => {
                        const newArr = [...prev];
                        let newFile = { ...file, ConvertedSize: NewSize, ConvertedPath: NewPath, IsConverted: true, };
                        newArr[i] = newFile;
                        return newArr
                    })
                } else {
                    return file
                }
            })
        }
        catch (error) {
            console.log(error)
            return new Error(`Um erro ocorreu ao converter o arquivo: \n \n${error}`)
        }
        return files
    }

    /**
     * Salva o arquivo no diretório selecionado
     * 
     * @param {string} name - Nome do arquivo
     * @param {string} format - Formato do arquivo
     * @param {string} convertedPath - Caminho do arquivo original
     * @param {string} saveDirectory - Caminho do arquivo convertido
     * @returns 
     */
    async function saveFile(name, format, convertedPath, saveDirectory) {
        try {
            SaveFile(name, format, convertedPath, saveDirectory)
        } catch (error) {
            return new Error(error.message)
        }
    }

    /**
     * Atualiza os estados de {@link setSaveDirectory} e {@link setConvertQuality} a partir do input da form
     * @param {Event} e evento de clique 
     */
    function handleConfigSubmit(e) {
        e.preventDefault();
        const formData = new FormData(ConfigForm.current)
        const data = Object.fromEntries(formData)

        let { save_directory, quality_range } = data
        setSaveDirectory(save_directory)
        setConvertQuality(parseInt(quality_range))
        setOpen(false);
    }

    /**
     * Lida com o botão de seleção de diretório em configurações
     * @param {Event} e 
     */
    async function handleDirectorySelector(e) {
        e.preventDefault();
        let directory = await OpenDirectoryDialog();
        console.log(directory)
        if (!directory) {
            console.log("!directory")
            setSaveDirectory("")
        } else {
            setSaveDirectory(directory)
        }
    }

    /**
     * Lida com o input de seleção de diretório em configurações.
     * @param {Event} e 
     */
    function handleDirectorySelectorInput(e) {
        setSaveDirectory(e.target.value)
    }


    return (<>
        <Navbar />
        <section className='header' onDragOver={handleDragOver} onDragLeave={handleDragLeave} style={{ "--wails-drop-target": "drop" }}>
            <div className='header_wrapper container'>
                {files.length > 0 ? (
                    <div className={'files_container'}>
                        <ul className='files_box' >
                            {files.map((item) => {
                                let ID = item.ID
                                return (
                                    <FileCard
                                        file={item}
                                        key={ID}
                                        id={ID}
                                        allowedFileTypes={allowedFileTypes}

                                        handleCloseButton={handleCloseButton}
                                        handleSave={saveFile}
                                        saveDirectory={saveDirectory}
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

                                                    <form className='options_box' ref={ConfigForm}>
                                                        <h2>Configurações</h2>
                                                        <span>
                                                            <button type='button' onClick={handleDirectorySelector}><LuFile /></button>
                                                            <input type='text' name={"save_directory"} placeholder="ex: C:\User\CR7\GOAT" value={saveDirectory} onChange={handleDirectorySelectorInput} ></input>
                                                        </span>
                                                        <input className="option_range" name="quality_range" type='range' min={0} max={4} step={1} defaultValue={convertQuality}></input>
                                                        <button type="submit" name="submit_button" onClick={handleConfigSubmit}>Salvar</button>
                                                    </form>
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
                )
                }
            </div >
        </section >
    </>
    )
}

export default App