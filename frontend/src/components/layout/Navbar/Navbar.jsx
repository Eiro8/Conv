import Logo from '../../../assets/images/Logo.png'
import styles from './Navbar.module.css'
import React from 'react'

const Navbar = () => {
    return (
        <section className={styles.nav}>
            <a href='#' className={styles.nav_logo} draggable='false'>
                <img src={Logo} width={'60px'} draggable='false' ></img>
            </a>
            <span className={styles.nav_buttons}>
                <a href='https://github.com/Eiro8/Conv/issues' target='blank' rel="noopener noreferrer" className={styles.highlight}>
                    Precisa de ajuda?
                </a>
                <a href='#' className={styles.button}>
                    Contato ( em breve )
                </a>
            </span>
        </section >
    )
}

export default Navbar
