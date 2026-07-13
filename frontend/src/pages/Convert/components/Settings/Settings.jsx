import React from "react"
import { useState, useRef } from 'react';

import { LuX, LuHardDriveDownload, LuCornerDownLeft, LuCirclePlus, LuSettings2, LuFile } from "react-icons/lu";
import { Button } from "../../../../components/ui/Button/Button";
import styles from './settings.module.css'


const SettingsButton = ({
    handleBackButton,
    handleDirectorySelector,
    handleImageInput,
    handleConvert,
    handleDirectorySelectorInput,
    handleConfigSubmit,
    convertQuality,
    saveDirectory,

    ...props
}) => {
    const [open, setOpen] = useState(false);
    const ConfigForm = useRef();


    function handleSubmit(e) {
        handleConfigSubmit(e, ConfigForm)
        setOpen(false)
    }
    return (
        <>
            <Button variant='primary' children={< LuSettings2 />} onClick={() => (setOpen(!open))} />
            {open ?
                (
                    <div className={styles.config_background}>
                        <div className={styles.config_options}>
                            <Button children={<LuX />} onClick={() => setOpen(false)} />
                            <form className={styles.options_box} ref={ConfigForm}>
                                <h2>Configurações</h2>
                                <span>
                                    <button type='button' onClick={handleDirectorySelector}><LuFile /></button>
                                    <input type='text' name={"save_directory"} placeholder="ex: C:\User\CR7\GOAT" value={saveDirectory} onChange={handleDirectorySelectorInput} ></input>
                                </span>
                                <input className="option_range" name="quality_range" type='range' min={0} max={100} step={1} defaultValue={convertQuality}></input>
                                <button type="submit" name="submit_button" onClick={handleSubmit}>Salvar</button>
                            </form>
                        </div>
                    </div>
                ) : (null)}
        </>
    )
}

export default SettingsButton