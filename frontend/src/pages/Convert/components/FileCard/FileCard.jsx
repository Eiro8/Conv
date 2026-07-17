import React, { useEffect, useRef } from 'react'
import { useState } from 'react'

import styles from './filecard.module.css'
import LoadingSVG from '../../../../assets/svg/black-180-ring-with-bg.svg'


import bytesParser from '../../../../utils/ByteParser';
import saveFile from '../../../../services/fileSaverService';

import { Button } from '../../../../components/ui/Button/Button'
import { LuX, LuHardDriveDownload, LuChevronDown, LuArrowRight } from "react-icons/lu";
import { EventsOff, EventsOn } from '../../../../../wailsjs/runtime/runtime';

const FileCard = ({
    file,
    allowedFileTypes,
    handleCloseButton,
    saveDirectory,
    ...props
}) => {
    const { ID, FileName, FileSize, FileType, IsConverted, ConvertedPath, ConvertedSize, Base64Preview } = file;
    let { ConvertTo } = file;
    //* Receber o size em bytes para melhorar
    const [open, setOpen] = useState(false);
    const [selector, setSelector] = useState(ConvertTo);
    const [isConverting, setIsConverting] = useState(false);

    const src = `data:image/${FileType};charset=utf-8;base64,${Base64Preview}` //* blob do arquivo em Base64
    let oldSize = bytesParser(FileSize);
    let newSize = bytesParser(ConvertedSize);

    useEffect(() => {
        const handleConvert = (eventID) => {
            if (eventID === ID) {
                setIsConverting(true)
            }
        }

        // EventsOnce("startedConvert", handleConvert)
        EventsOn("startedConvert", handleConvert)

        return () => {
            EventsOff("startedConvert");
        };
    }, [])


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
            {isConverting && IsConverted == false ? (
                <span className={styles.loading}>
                    <img className={styles.LoadingSVG} src={LoadingSVG} draggable={false} />
                </span>
            ) : (
                <span className={styles.buttons}>
                    {!IsConverted ?
                        (
                            <>
                                <p className={styles.text}>Converter para</p>
                                <Button variant={styles.dropdown} children={<>{selector}<span className={styles.rotateOnClick}><LuChevronDown /></span></>} onClick={() => { setOpen(!open); }} />
                            </>
                        ) : null}

                    {/*//* o Dropdown */}
                    {open ?
                        (
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
                            <Button variant={"primary"} onClick={() => { saveFile(FileName, selector, ConvertedPath, saveDirectory) }} children={<LuHardDriveDownload />} />
                        )
                        :
                        (<Button variant={"primary"} onClick={() => { handleCloseButton(ID) }} children={<LuX />} />)}
                </span>
            )}
        </li >
    )
}

export default FileCard