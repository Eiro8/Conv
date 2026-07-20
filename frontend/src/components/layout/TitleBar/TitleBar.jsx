import React from 'react'
import styles from './TitleBar.module.css'
import Logo from '../../../assets/images/SquaredLogo.png'
import { Square, Minus, X, ArrowBigRightDash } from 'lucide-react'
import { handleMinimize, handleMaximize, handleClose } from '../../../services/windowService.js'

const TitleBar = (props) => {
    const { activeTool, appIcon, appName } = props;


    return (
        <section className={styles.titleBar}>
            <div className={styles.titleBar_wrap}>
                <div className={styles.app_info}>
                    <div className={styles.brand}>
                        <img src={appIcon} className={styles.brand_logo} />
                        <p className={styles.info}>{appName} <ArrowBigRightDash /> {activeTool}</p>
                    </div>
                    <div className={styles.uninteractable_overlay} draggable={'false'}></div>
                </div>
                <span className={styles.buttons}>
                    <button className={styles.button} onClick={handleMinimize}>
                        <span className={styles.svg}><Minus /></span></button>
                    <button className={styles.button} onClick={handleMaximize}>
                        <span className={styles.svg}><Square /></span>
                    </button>
                    <button className={styles.button} onClick={handleClose}>
                        <span className={styles.svg}><X /></span>
                    </button>
                </span>
            </div>
        </section >
    )
}

export default TitleBar