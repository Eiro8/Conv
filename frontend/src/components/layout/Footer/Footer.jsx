import React, { useCallback } from 'react'
import styles from './footer.module.css'

import FooterLogo from '../../../assets/images/BigLogo.png'
import Carousel from '../Carousel/Carousel.jsx'

import ConversorIMG from '../../../assets/images/conversor.png'
import SoonToCome from '../../../assets/images/soon.png'

const Footer = () => {

    const Options = { loop: true }
    const Slides = [
        {
            title: "Conversor de Imagens",
            image: ConversorIMG,
            link: "#"
        },
        {
            title: "Compressor de Vídeo ( em breve )",
            image: SoonToCome,
            link: "#"
        },
        {
            title: "Simplificador de Documento com IA ( em breve )",
            image: SoonToCome,
            link: "#"
        }
    ];


    return (
        <section className={styles.footer}>
            <div className={`${styles.footer_wrapper} container`}>
                <div className={styles.brand}>
                    <img className={styles.logo} src={FooterLogo} draggable={'false'} />
                    <h2 className={styles.description}>Um conversor de imagens leve para desktop, desenvolvido com Go, React e Wails.</h2>
                </div>
                <div className={styles.carousel_wrap}>
                    <Carousel options={Options} slides={Slides} />
                </div>
            </div>
            <span className={styles.link}>
                <p>Github.com/Eiro8</p>
            </span>
            <span className={styles.copyright}>
                <p>ⓒ Copyright</p>
            </span>
        </section>
    )
}

export default Footer