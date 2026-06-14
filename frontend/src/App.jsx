import { useEffect, useState } from 'react';
import './App.css';
import Logo from './assets/images/logo-universal.png'
import { LuUpload, LuX, LuHardDriveDownload, LuCornerDownLeft, LuCirclePlus, LuSettings2 } from "react-icons/lu";
import { Button } from './components/ui/Button/Button';
import { Greet } from "../wailsjs/go/main/App";

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
                {
                    files.length > 0 ?
                        (
                            <div className={'files_container'}>
                                <ul className='files_box' onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                                    {files.map((item, index) => {
                                        let { file, id } = item;
                                        return (
                                            <li className={`file`} key={`${id} + ${index}`}>
                                                <img src={URL.createObjectURL(file)} draggable={false} className={'image'} />
                                                <div className='file_description'>
                                                    <p className='text_overflow file_name'>{file.name}</p>
                                                    {/* //*fazer calculo pra lidar com tamanho do arquivo e tipo de arquivo*/}
                                                    <p className='text_overflow file_type'>{file.type}, {file.size} Bytes</p>

                                                </div>
                                                <span className={'buttons'}>
                                                    <p className='text'>Converter para</p>
                                                    <Button children={selected} onClick={() => setOpen(!open)} />
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
                                            <label for={'file-input'} className='input-text'><LuCirclePlus />Adicionar Mais</label>
                                            <input type='file' accept='image/webp,image/jpeg,image/jpg,image/png,image/avif' id='file-input' multiple onChange={handleInput} />
                                        </div>
                                        <Button variant='primary' children={<><LuCornerDownLeft /></>} />
                                    </div>
                                    <div className='files_buttons'>
                                        <Button variant='primary' children={< LuSettings2 />} />
                                        <Button variant='secondary' children={<><LuHardDriveDownload />Converter Todos </>} onClick={async() => { console.log(await Greet("Isr"))}} />
                                    </div>
                                </div>
                            </div>
                        ) :
                        (<div className='header_dropper_box' onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                            <div className='dropper_img_wrap'>
                                <LuUpload /></div>
                            <h3>Selecionar Imagem(ns)</h3>
                            <p>Arraste & Solte ou <span className='highlight'>Escolha</span></p>
                            <input type='file' accept='image/webp,image/jpeg,image/jpg,image/png,image/avif' id='file-input' multiple onChange={handleInput} />
                        </div>)

                }</div>
        </section>
    </>
    )
}

export default App

