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
                    <div className={styles.carousel__slider}>
                        <h2>Conversor de Imagens</h2>
                        <div></div>
                    </div>
                    <div className={styles.carousel__slider}>
                        <h2>Compressor de Imagens</h2>
                        <div></div>
                    </div>
                    <div className={styles.carousel__slider}>
                        <h2>Leitor de PDF</h2>
                        <div></div>
                    </div>
                </div>
            </div>
            <div className={styles.carousel__buttons}>
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            </div>
            <div className="embla__dots">
                {scrollSnaps.map((_, index) => (
                    <DotButton

                        key={index}
                        onClick={() => onDotButtonClick(index)}
                        className={'embla__dot'.concat(
                            index === selectedIndex ? ' embla__dot--selected' : ''
                        )}
                    />
                ))}
            </div>
        </div>
    )
}

export default Carousel
