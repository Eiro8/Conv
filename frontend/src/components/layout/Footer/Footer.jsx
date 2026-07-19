import React, { useCallback } from 'react'
import { useState, useRef } from 'react'
import styles from './footer.module.css'

import useEmblaCarousel from 'embla-carousel-react'

import { Button } from '../../ui/Button/Button.jsx'
import FooterLogo from '../../../assets/images/BigLogo.png'
import Image from '../../../assets/images/gapple.jpg'
import Carousel from '../Carousel/Carousel.jsx'

import ConversorIMG from '../../../assets/images/conversor.png'


const Footer = () => {

    const Options = { loop: true }
    const Slides = [
        {
            title: "Conversor de Imagens",
            image: ConversorIMG,
            link: "#"
        },
        {
            title: "Compressor de Imagens",
            image: ConversorIMG,
            link: "#"
        },
        {
            title: "Simplificador de Documento",
            image: ConversorIMG,
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
            <span className={styles.disclaimer}>
                <p>Github.com/Eiro8</p>
                <p>@C Copyright</p>
            </span>
        </section>
    )
}

export default Footer