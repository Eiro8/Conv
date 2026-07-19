import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from './CarouselButton'
import { DotButton, useDotButton } from './DotButton'

import styles from './carousel.module.css'

const Carousel = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)
    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <div className={styles.carousel}>
            <div className={styles.carousel__viewport} ref={emblaRef}>
                <div className={styles.carousel__container}>
                    {slides.map((item, index) => {
                        const { image, title, link } = item
                        return (
                            <div className={styles.carousel__slider} key={title.concat(index)} >
                                <div className={styles.slide_content} href={link}>
                                    <h2 className={styles.slide_title}>{title}</h2>
                                    <div
                                        style={{
                                            background: `url(${image})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover"
                                        }}></div>
                                </div>
                            </div>
                        )
                    })}



                </div>
            </div>
            <div className={styles.carousel__buttons}>
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
            <div className={styles.dots}>
                {scrollSnaps.map((_, index) => (
                    <DotButton
                        key={index}
                        onClick={() => onDotButtonClick(index)}
                        className={index === selectedIndex ? `${styles.dot + " " + styles.selected}` : styles.dot}
                    />
                ))}
            </div>
        </div >
    )
}

export default Carousel
