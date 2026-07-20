import Logo from '../../../assets/images/Logo.png'
import styles from './Navbar.module.css'
import React from 'react'

const Navbar = ({ currentTool }) => {

    return (
        <section className={styles.nav}>
            <p className={styles.tool}>{currentTool}</p>
            <span className={styles.nav_buttons}>
                <a href='https://github.com/Eiro8/Conv/issues' target='blank' rel="noopener noreferrer" className={styles.highlight}>
                    Precisa de ajuda?
                </a>
            </span>
        </section >
    )
}

export default Navbar
