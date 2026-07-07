import React from 'react'
import { useState } from 'react'
import styles from './filecard.module.css'
import { Button } from '../../../../components/ui/Button/Button'
import { LuX, LuHardDriveDownload, LuChevronDown, LuArrowLeftFromLine, LuArrowRight } from "react-icons/lu";

//* formata bytes para GB/MB/KB/Bytes (ex: 6000000 => "6 MB" )
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
    ...props
}) => {
    const { id, name, type, src, path, isConverted, convertTo, size, convertSize } = file;
    //* Receber o size em bytes para melhorar
    const [open, setOpen] = useState(false);
    const [selector, setSelector] = useState(convertTo);
    let oldSize = bytesParser(size);
    let newSize = bytesParser(convertSize);

    return (
        <li className={styles.file}>
            <img className={styles.image} src={src} draggable={false} />
            <div className={styles.description}>
                <p className={`${styles.name} text_overflow`}>{name}</p>
                <span className={styles.info}>
                    <p className={`${styles.type} text_overflow`}>{type}, <span>{oldSize}</span></p>
                    {isConverted ? (<><LuArrowRight /><span className={styles.newInfo}>{newSize},</span><span className={styles.newInfo}>{convertTo}</span></>) : (null)}
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
                    (
                        <Button variant={"primary"} onClick={() => { handleSave(path, name, selector) }} children={<LuHardDriveDownload />} />
                    )
                    :
                    (<Button variant={"primary"} onClick={() => { handleCloseButton(id) }} children={<LuX />} />)}
            </span>
        </li>
    )
}

export default FileCard