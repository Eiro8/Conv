import React from 'react'
import { useState } from 'react'
import styles from './filecard.module.css'
import { Button } from '../../../../components/ui/Button/Button'
import { LuX, LuHardDriveDownload, LuChevronDown, LuArrowLeftFromLine, LuArrowRight } from "react-icons/lu";
/**
 * formata bytes para GB/MB/KB/Bytes (ex: 6000000 => "6 MB" )
 * @param {number} size tamanho em bytes
 * @returns {string}
 *  */
function bytesParser(size) {
    let kilobyte = 1024;
    let megabyte = kilobyte * 1024;
    let gigabyte = megabyte * 1024;
    let fileSize = ""

    if (size >= gigabyte) {
        fileSize = `${(size / gigabyte).toFixed(1)} GB`
    } else if (size >= megabyte) {
        fileSize = `${(size / megabyte).toFixed(1)} MB`
    } else if (size >= kilobyte) {
        fileSize = `${(size / kilobyte).toFixed(1)} KB`
    } else {
        fileSize = `${size} bytes`
    }
    return fileSize
}

const FileCard = ({
    file,
    allowedFileTypes,
    handleCloseButton,
    handleSave,
    saveDirectory,
    ...props
}) => {
    const { ID, FileName, FileSize, FileType, IsConverted, ConvertedPath, ConvertedSize, Base64Preview } = file;
    let { ConvertTo } = file;
    //* Receber o size em bytes para melhorar
    const [open, setOpen] = useState(false);
    const [selector, setSelector] = useState(ConvertTo);

    const src = `data:image/${FileType};charset=utf-8;base64,${Base64Preview}` //* blob do arquivo em Base64
    let oldSize = bytesParser(FileSize);
    let newSize = bytesParser(ConvertedSize);

    return (
        <li className={styles.file}>
            <img className={styles.image} src={src} draggable={false} />
            <div className={styles.description}>
                <p className={`${styles.name} text_overflow`}>{FileName}</p>
                <span className={styles.info}>
                    <p className={`${styles.type} text_overflow`}>{FileType}, <span>{oldSize}</span></p>
                    {IsConverted ? (<><LuArrowRight /><span className={styles.newInfo}>{newSize}</span><span className={styles.newInfo}>{selector}</span></>) : (null)}
                </span>


            </div>


            <span className={styles.buttons}>
                {!IsConverted ? (
                    <>
                        <p className={styles.text}>Converter para</p>
                        <Button variant={styles.dropdown} children={<>{selector}<span className={styles.rotateOnClick}><LuChevronDown /></span></>} onClick={() => { setOpen(!open); }} />
                    </>
                ) : null}

                {/*//* o Dropdown */}
                {open ? (
                    <ul className={styles.format_options}>
                        {Array.from(allowedFileTypes).map(format => (
                            <li
                                key={format}
                                onClick={() => {
                                    setOpen(false);
                                    setSelector(format);
                                }}
                                className={styles.format_option}>
                                {format}
                            </li>
                        ))}
                    </ul>
                ) : null}
                {IsConverted == true ?
                    (
                        <Button variant={"primary"} onClick={() => { handleSave(FileName, selector, ConvertedPath, saveDirectory) }} children={<LuHardDriveDownload />} />
                    )
                    :
                    (<Button variant={"primary"} onClick={() => { handleCloseButton(ID) }} children={<LuX />} />)}
            </span>
        </li>
    )
}

export default FileCard