import React from 'react'
import { useState } from 'react'
import styles from './filecard.module.css'
import { Button } from '../../../../components/ui/Button/Button'
import { LuX, LuHardDriveDownload, LuChevronDown } from "react-icons/lu";

const FileCard = ({
    file,
    allowedFileTypes,

    handleCloseButton,
    handleSave,
    ...props
}) => {
    const { id, name, type, src, path, isConverted, convertPath, convertTo, size } = file;

    const [fileSize, setFileSize] = useState({
        size: size / 1000,
        format: "KB"
    });
    const [open, setOpen] = useState(false);
    const [selector, setSelector] = useState(convertTo);


    //* Receber o size em bytes para melhorar conversão
    if (size.size >= 1000) {
        setSize(prev => ({
            size: prev.size / 1000,
            format: "MB",
        }))
    } else if (size.size >= 10000) {
        setSize(prev => ({
            size: prev.size / 10000,
            format: "GB",
        }))
    }

    return (
        <li className={styles.file}>
            <img className={styles.image} src={src} draggable={false} />
            <div className={styles.description}>
                <p className={`${styles.name} text_overflow`}>{name}</p>
                <p className={`${styles.type} text_overflow`}>{type}, <span>{fileSize.size}{fileSize.format}</span></p>
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