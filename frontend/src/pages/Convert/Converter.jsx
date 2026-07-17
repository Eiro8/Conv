import { useState } from 'react';
import styles from './converter.module.css'

import Navbar from '../../components/layout/Navbar/Navbar';
import FileCard from './components/FileCard/FileCard';
import SettingsButton from './components/Settings/Settings';
import { Button } from '../../components/ui/Button/Button';
import { LuUpload, LuHardDriveDownload, LuCornerDownLeft, LuCirclePlus } from "react-icons/lu";
import { OnFileDrop } from '../../../wailsjs/runtime/runtime';

import CreateImageObject from '../../services/fileCreatorService';
import convertImageObjects from '../../services/fileConvertService';
import DirectoryDialog from '../../services/openDirectoryDialog';
import FileDialog from '../../services/openFileDialog';

function Converter() {

    const [saveDirectory, setSaveDirectory] = useState("");
    const [convertQuality, setConvertQuality] = useState(20)
    const [isHovered, setIsHovered] = useState(false);

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
        * Recebe uma array de paths e os executa chamando function imageParser()
        * @param {string} pathArray array de paths de arquivos  
        */
    OnFileDrop(async (x, y, paths) => {
        await addImagesFromPaths(paths)
    }, true)


    /**
     * Chama {@link FileDialog} e executa o retorno em {@link imageParser}
     */
    async function handleImageInput() {
        const pathArray = await FileDialog();
        await addImagesFromPaths(pathArray);
    }

    /**
     * Recebe uma lista de caminhos de imagens, cria os objetos correspondentes
    * através de {@link CreateImageObject} e adiciona os arquivos ao estado.
     * 
     * @param {string} pathArray 
     * @returns erro caso ocorra uma falha
     */
    async function addImagesFromPaths(pathArray) {
        try {
            let ImageObjects = await CreateImageObject(pathArray);
            ImageObjects.forEach((fileObj) => {
                setFiles(prev => [...prev, fileObj]);
            })
        } catch (error) {
            console.log(new Error(`Ocorreu um erro ao processar suas imagens: ${error.message}`))
            return error
        }
    }

    /**
     * processa os arquivos de {@link files} e verifica se estao convertidos.
     * caso nao,  {@link convertImageObjects} irá converte-los e atualizar seus objetos 
     * @returns erro caso ocorra um erro ao converter um arquivo
     */
    async function handleConvert() {
        try {
            //! Futuramente, adicionar forma de enviar apenas um array de arquivos não convertidos pra nao precisar verificar se todos não estao convertidos
            const convertedArr = await convertImageObjects(files, convertQuality)
            console.log("finalizou processo")
            convertedArr.forEach(item => {
                setFiles(prev => {
                    
                    let newArr = [...prev];
                    newArr[item.ID] = { ...newArr[item.ID], IsConverted: true, ...item }
                    return newArr
                })

            })
        }
        catch (error) {
            console.log(error)
            return new Error(`Um erro ocorreu ao converter o arquivo: \n \n${error}`)
        }
        return files
    }

    /**
     * Atualiza os estados de {@link setSaveDirectory} e {@link setConvertQuality} a partir do input da form
     * @param {Event} e evento de clique 
     */
    function handleConfigSubmit(e, formRef) {
        e.preventDefault();
        const formData = new FormData(formRef.current)
        const data = Object.fromEntries(formData)

        let { save_directory, quality_range } = data
        setSaveDirectory(save_directory)
        setConvertQuality(parseInt(quality_range))
    }

    /**
     * Lida com o botão de seleção de diretório em configurações
     * @param {Event} e 
     */
    async function handleDirectorySelector(e) {
        e.preventDefault();
        let directory = await DirectoryDialog();
        console.log(directory)
        if (!directory) {
            setSaveDirectory("")
        } else {
            setSaveDirectory(directory)
        }
    }

    /** 
        * limpa a array de {@link setFiles}
       */
    function clearFiles() {
        setFiles([])
    }
    /**
         * Atualiza os estados de {@link setSaveDirectory} e {@link setConvertQuality} a partir do input da form
         * @param {Event} e evento de clique 
         */
    function handleDirectorySelectorInput(e) {
        setSaveDirectory(e.target.value)
    }

    return (<>
        <Navbar />
        <section className={`header ${isHovered ? "header_hovered" : ""}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} style={{ "--wails-drop-target": "drop" }}>
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
                                        saveDirectory={saveDirectory}
                                    />
                                )
                            })}
                            <div className='files_settings'>
                                <div className='files_utils'>
                                    <Button type='button' onClick={handleImageInput} children={<><LuCirclePlus />Adicionar Mais</>} />
                                    <Button variant='primary' children={<><LuCornerDownLeft /></>} onClick={() => clearFiles()} />
                                </div>
                                <div className='files_buttons'>
                                    <SettingsButton
                                        handleDirectorySelector={handleDirectorySelector}
                                        handleDirectorySelectorInput={handleDirectorySelectorInput}
                                        handleConfigSubmit={handleConfigSubmit}
                                        convertQuality={convertQuality}
                                        saveDirectory={saveDirectory}
                                    />

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
                        <p>Arraste & Solte ou <span className='highlight'>Clique</span></p>
                    </div>
                )
                }
            </div >
        </section >
    </>
    )
}

export default Converter