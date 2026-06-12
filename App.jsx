import { useEffect, useState, useCallback } from 'react';
import './App.css';
import Logo from './assets/images/logo-universal.png'
import { LuUpload, LuX, LuHardDriveDownload, LuCornerDownLeft, LuCirclePlus, LuSettings2, LuLoader } from "react-icons/lu";
import { Button } from './components/ui/Button/Button';

// Wails injeta `window.go` automaticamente após o build
const { ConvertImageBase64 } = window.go?.main?.App ?? {};

const ALLOWED_TYPES = new Set([
    'image/webp',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/avif',
    'image/gif',
]);

const FORMAT_OPTIONS = ['jpeg', 'png', 'webp'];

// Converte File → base64 DataURL
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Dispara o download de um base64 DataURL no browser/Wails
function downloadBase64(base64Data, fileName) {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = fileName;
    link.click();
}

function App() {
    const [isHovered, setIsHovered] = useState(false);
    const [files, setFiles] = useState([]);           // [{ id, file, convertTo, status, result }]
    const [globalFormat, setGlobalFormat] = useState('webp');
    const [openDropdown, setOpenDropdown] = useState(null); // id do item com dropdown aberto

    // ─── Handlers de drag & drop / input ────────────────────────────────────
    const handleDragOver = (e) => { e.preventDefault(); setIsHovered(true); };
    const handleDragLeave = (e) => { e.preventDefault(); setIsHovered(false); };

    const processFiles = useCallback((rawFiles) => {
        const valid = [];
        rawFiles.forEach(file => {
            if (ALLOWED_TYPES.has(file.type)) {
                valid.push(file);
            } else {
                alert(`"${file.name}" não é uma imagem suportada.`);
            }
        });

        const objects = valid.map((file, i) => ({
            id: Date.now() + i,
            file,
            convertTo: globalFormat,
            status: 'idle',   // idle | converting | done | error
            result: null,     // ConvertResult do backend
        }));

        setFiles(prev => [...prev, ...objects]);
    }, [globalFormat]);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsHovered(false);
        processFiles(Array.from(e.dataTransfer.files));
    };

    const handleInput = (e) => {
        e.preventDefault();
        processFiles(Array.from(e.target.files));
        e.target.value = '';
    };

    // ─── Conversão de um único arquivo ──────────────────────────────────────
    async function convertFile(item) {
        setFiles(prev => prev.map(f =>
            f.id === item.id ? { ...f, status: 'converting', result: null } : f
        ));

        try {
            const base64Data = await fileToBase64(item.file);
            // Chama o método Go exposto pelo Wails
            const result = await ConvertImageBase64(base64Data, item.file.name, item.convertTo);

            setFiles(prev => prev.map(f =>
                f.id === item.id ? { ...f, status: 'done', result } : f
            ));
        } catch (err) {
            console.error(err);
            setFiles(prev => prev.map(f =>
                f.id === item.id ? { ...f, status: 'error', result: null } : f
            ));
            alert(`Erro ao converter "${item.file.name}": ${err}`);
        }
    }

    // ─── Converter todos ────────────────────────────────────────────────────
    async function convertAll() {
        const pending = files.filter(f => f.status !== 'done');
        for (const item of pending) {
            await convertFile(item);
        }
    }

    // ─── Limpar lista ───────────────────────────────────────────────────────
    function clearList() {
        setFiles([]);
    }

    // ─── Remover item ───────────────────────────────────────────────────────
    function removeFile(id) {
        setFiles(prev => prev.filter(f => f.id !== id));
    }

    // ─── Alterar formato de um item específico ──────────────────────────────
    function setItemFormat(id, format) {
        setFiles(prev => prev.map(f =>
            f.id === id ? { ...f, convertTo: format, status: 'idle', result: null } : f
        ));
        setOpenDropdown(null);
    }

    // Fecha dropdown ao clicar fora
    useEffect(() => {
        const close = () => setOpenDropdown(null);
        document.addEventListener('click', close);
        return () => document.removeEventListener('click', close);
    }, []);

    // ─── Render ─────────────────────────────────────────────────────────────
    return (
        <>
            <section className='nav'>
                <a href='#' className='nav_logo' draggable='false'>
                    <img src={Logo} width={'60px'} draggable='false' />
                </a>
                <span className='nav_buttons'>
                    <a href='#' className='highlight'>Precisa de ajuda?</a>
                    <a href='#' className='button'>Contato</a>
                </span>
            </section>

            <section className='header'>
                <div className='header_wrapper container'>
                    {files.length > 0 ? (
                        <div className='files_container'>
                            {/* ── Painel lateral / superior ── */}
                            <div className='files_settings'>
                                {/* Mini drop zone para adicionar mais */}
                                <div
                                    className='file_dropper_box'
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <div className='dropper_img_wrap'><LuUpload /></div>
                                    <h3>Adicionar Mais</h3>
                                    <p>ou <span className='highlight'>solte</span> arquivos aqui</p>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        id='file-input'
                                        multiple
                                        onChange={handleInput}
                                    />
                                </div>

                                {/* Formato global */}
                                <div className='global_format'>
                                    <span>Formato padrão:</span>
                                    <div className='format_tabs'>
                                        {FORMAT_OPTIONS.map(fmt => (
                                            <button
                                                key={fmt}
                                                className={`format_tab ${globalFormat === fmt ? 'active' : ''}`}
                                                onClick={() => setGlobalFormat(fmt)}
                                            >
                                                {fmt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className='files_buttons'>
                                    <Button
                                        variant='tertiary'
                                        onClick={clearList}
                                        children={<><LuCornerDownLeft />Limpar Lista</>}
                                    />
                                </div>

                                <Button
                                    variant='secondary'
                                    onClick={convertAll}
                                    children={<><LuHardDriveDownload />Converter Todos</>}
                                />
                            </div>

                            {/* ── Lista de arquivos ── */}
                            <ul
                                className='files_box'
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                {files.map((item) => {
                                    const { id, file, convertTo, status, result } = item;
                                    const isDone = status === 'done';
                                    const isConverting = status === 'converting';

                                    return (
                                        <li className={`file ${status}`} key={id}>
                                            <img
                                                src={URL.createObjectURL(file)}
                                                draggable={false}
                                                className='image'
                                            />

                                            <div className='file_description'>
                                                <p className='text_overflow file_name'>{file.name}</p>
                                                <p className='text_overflow file_type'>
                                                    {file.type} · {(file.size / 1024).toFixed(1)} KB
                                                    {isDone && result && (
                                                        <span className='converted_size'>
                                                            {' '}→ {(result.sizeBytes / 1024).toFixed(1)} KB
                                                        </span>
                                                    )}
                                                </p>
                                                {status === 'error' && (
                                                    <p className='error_msg'>Falha na conversão</p>
                                                )}
                                            </div>

                                            <span className='buttons'>
                                                {/* Seletor de formato por item */}
                                                <p className='text'>Converter para</p>
                                                <div
                                                    className='dropdown_wrapper'
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    <Button
                                                        children={convertTo.toUpperCase()}
                                                        onClick={() =>
                                                            setOpenDropdown(openDropdown === id ? null : id)
                                                        }
                                                        disabled={isConverting}
                                                    />
                                                    {openDropdown === id && (
                                                        <ul className='dropdown'>
                                                            {FORMAT_OPTIONS.map(fmt => (
                                                                <li
                                                                    key={fmt}
                                                                    className={fmt === convertTo ? 'active' : ''}
                                                                    onClick={() => setItemFormat(id, fmt)}
                                                                >
                                                                    {fmt.toUpperCase()}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>

                                                {/* Botão de ação principal */}
                                                {isConverting && (
                                                    <Button disabled children={<LuLoader className='spin' />} />
                                                )}

                                                {!isConverting && !isDone && (
                                                    <>
                                                        {/* Converter individualmente */}
                                                        <Button
                                                            onClick={() => convertFile(item)}
                                                            children={<LuHardDriveDownload />}
                                                            title='Converter'
                                                        />
                                                        {/* Remover */}
                                                        <Button
                                                            onClick={() => removeFile(id)}
                                                            children={<LuX />}
                                                            title='Remover'
                                                        />
                                                    </>
                                                )}

                                                {isDone && result && (
                                                    <Button
                                                        variant='success'
                                                        onClick={() => downloadBase64(result.base64Data, result.fileName)}
                                                        children={<><LuHardDriveDownload />Baixar</>}
                                                        title='Baixar imagem convertida'
                                                    />
                                                )}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ) : (
                        /* ── Drop zone inicial ── */
                        <div>
                            <div
                                className={`header_dropper_box ${isHovered ? 'hovered' : ''}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className='dropper_img_wrap'><LuUpload /></div>
                                <h3>Selecionar Imagem(ns)</h3>
                                <p>Arraste & Solte ou <span className='highlight'>Escolha</span></p>
                                <input
                                    type='file'
                                    accept='image/*'
                                    id='file-input'
                                    multiple
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default App;
