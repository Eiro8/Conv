import { useEffect, useState } from 'react'

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
    handleFormat,
    ...props
}) => {

    const {
        ID,
        FileName,
        FileSize,
        FileType,
        IsConverted,
        ConvertedPath,
        ConvertedSize,
        Base64Preview,
        ConvertTo
    } = file;


    const [open, setOpen] = useState(false);
    const [isConverting, setIsConverting] = useState(false);


    const src = `data:image/${FileType};charset=utf-8;base64,${Base64Preview}`

    let oldSize = bytesParser(FileSize);
    let newSize = bytesParser(ConvertedSize);


    useEffect(() => {

        const handleConvert = (eventID) => {
            if (eventID === ID) {
                setIsConverting(true)
            }
        }

        EventsOn("startedConvert", handleConvert)

        return () => {
            EventsOff("startedConvert");
        };

    }, [ID])


    return (
        <li className={styles.file}>

            <img
                className={styles.image}
                src={src}
                draggable={false}
            />


            <div className={styles.description}>

                <p className={`${styles.name} text_overflow`}>
                    {FileName}
                </p>


                <span className={styles.info}>

                    <p className={`${styles.type} text_overflow`}>
                        {FileType}, <span>{oldSize}</span>
                    </p>


                    {IsConverted && (
                        <>
                            <LuArrowRight />
                            <span className={styles.newInfo}>
                                {newSize}
                            </span>

                            <span className={styles.newInfo}>
                                {ConvertTo}
                            </span>
                        </>
                    )}

                </span>

            </div>



            {isConverting && !IsConverted ? (

                <span className={styles.loading}>
                    <img
                        className={styles.LoadingSVG}
                        src={LoadingSVG}
                        draggable={false}
                    />
                </span>

            ) : (

                <span className={styles.buttons}>


                    {!IsConverted && (

                        <>
                            <p className={styles.text}>
                                Converter para
                            </p>


                            <Button
                                variant={styles.dropdown}
                                onClick={() => setOpen(prev => !prev)}
                            >
                                <>
                                    {ConvertTo}

                                    <span className={styles.rotateOnClick}>
                                        <LuChevronDown />
                                    </span>
                                </>
                            </Button>


                        </>

                    )}



                    {open && (

                        <ul className={styles.format_options}>

                            {Array.from(allowedFileTypes).map(format => (

                                <li
                                    key={format}
                                    className={styles.format_option}

                                    onClick={() => {

                                        setOpen(false);

                                        handleFormat(ID, format);

                                    }}

                                >

                                    {format}

                                </li>

                            ))}

                        </ul>

                    )}




                    {IsConverted ? (

                        <Button
                            variant={"primary"}
                            onClick={() =>
                                saveFile(
                                    FileName,
                                    ConvertTo,
                                    ConvertedPath,
                                    saveDirectory
                                )
                            }
                        >
                            <LuHardDriveDownload />
                        </Button>


                    ) : (

                        <Button
                            variant={"primary"}
                            onClick={() => handleCloseButton(ID)}
                        >
                            <LuX />
                        </Button>

                    )}


                </span>

            )}

        </li>
    )
}


export default FileCard