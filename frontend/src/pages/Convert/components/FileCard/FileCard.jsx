import React from 'react'
import { useState } from 'react'
import styles from './filecard.module.css'
import { Button } from '../../../../components/ui/Button/Button'
import { LuX, LuHardDriveDownload, LuChevronDown, LuArrowLeftFromLine, LuArrowRight } from "react-icons/lu";

function convertSize(size) {
    let kilobyte = 1024;
    let megabyte = kilobyte * 1024;
    let gigabyte = megabyte * 1024;
    let fileSize = ""

    if (size >= gigabyte) {
        fileSize = `${(size / gigabyte).toFixed(1)} MB`
    } else if (size >= megabyte) {
        fileSize = `${(size / megabyte).toFixed(1)} KB`
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
    ...props
}) => {
    const { id, name, type, src, path, isConverted, convertPath, convertTo, size = "SIX SEVENNN ( erro )" } = file;
    //* Receber o size em bytes para melhorar
    const [open, setOpen] = useState(false);
    const [selector, setSelector] = useState(convertTo);
    let convertedFileSize = 232;

    let oldSize = convertSize(size);
    let newSize = convertSize(convertedFileSize)


    return (
        <li className={styles.file}>
            <img className={styles.image} src={src} draggable={false} />
            <div className={styles.description}>
                <p className={`${styles.name} text_overflow`}>{name}</p>
                <span className={styles.info}>
                    <p className={`${styles.type} text_overflow`}>{type}, <span>{oldSize}</span></p>
                    {isConverted ? (<p className={styles.newType}><LuArrowRight />{newSize}</p>) : (null)}
                </span>


            </div>


            <span className={styles.buttons}>
                {!isConverted ? (
                    <>
                        <p className={styles.text}>Converter para</p>
                        <Button variant={styles.dropdown} children={<>{selector}<span className={styles.rotateOnClick}><LuChevronDown /></span></>} onClick={() => { setOpen(!open) }} />
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
                {isConverted == true ?
                    (<Button variant={"primary"} onClick={() => { handleSave(path, name, selector) }} children={<LuHardDriveDownload />} />)
                    :
                    (<Button variant={"primary"} onClick={() => { handleCloseButton(id) }} children={<LuX />} />)}
            </span>
        </li>
    )
}

export default FileCard