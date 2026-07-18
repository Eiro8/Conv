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
    const [convertPercentage, setConvertPercentage] = useState(convertQuality)


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
                            <span className={styles.close_button}>
                                <Button children={<LuX />} onClick={() => setOpen(false)} />
                            </span>
                            <h3 className={styles.config_title}>Configurações</h3>
                            <form className={styles.options_box} ref={ConfigForm}>
                                <div className={styles.options_wrapper}>
                                    <div className={styles.option}>
                                        <label className={styles.config_label} htmlFor={"directory-input"}>Salvar em:</label>
                                        <span className={styles.inputBox}>
                                            <button className={styles.config_button} id={"directory-input"} type={"Button"} onClick={handleDirectorySelector} ><LuFile /></button>
                                            <input className={styles.config_input} id={"directory-input"} type='text' name={"save_directory"} placeholder="ex: C:\User\CR7\GOAT" value={saveDirectory} onChange={handleDirectorySelectorInput} ></input>
                                        </span>
                                    </div>
                                    <div className={styles.option}>
                                        <label className={styles.config_label} htmlFor={"options-range"}>Qualidade de conversão:</label>
                                        <span className={styles.rangeBox}>
                                            <input className={styles.config_range} id={"options-range"} name="quality_range" type='range' min={0} max={100} step={1} defaultValue={convertPercentage} onChange={(e) => { setConvertPercentage(e.target.value) }}></input>
                                            <span className={styles.config_percentage}>{convertPercentage}%</span>
                                        </span>
                                    </div>
                                </div>
                                <button className={styles.button} id={"submit-button"} type="submit" name="submit_button" onClick={handleSubmit}>Salvar</button>
                            </form>
                        </div>
                    </div>
                ) : (null)}
        </>
    )
}

export default SettingsButton