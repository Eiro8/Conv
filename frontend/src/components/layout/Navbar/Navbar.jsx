import Logo from '../../../assets/images/Logo.png'
import styles from './Navbar.module.css'
import React, { useEffect, useRef } from 'react'


const Navbar = ({ currentTool }) => {



    return (
        <>
            <section className={styles.nav}>
                <p className={styles.tool}>{currentTool}</p>
            </section >
        </>
    )
}

export default Navbar
