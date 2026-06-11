import React from 'react'
import { LuLoader } from "react-icons/lu";
import styles from './button.module.css'

export const Button = (
    {
        children,
        isLoading = false,
        variant = "primary",
        ref,
        ...props
    }
) => {



    return (
        <button
            className={isLoading ? 'loading-animation' : `button-${variant}`}
            lassName={`button-${variant} ${isLoading ? "loading-animation" : ""}`}
            disabled={isLoading || props.disabled}
            ref={ref}
            {...props}>
            {isLoading ? <LuLoader /> : children}
        </button>
    )
}
