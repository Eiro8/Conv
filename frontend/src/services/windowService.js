import { Window } from '@wailsio/runtime'
import { WindowMinimise, Quit, WindowToggleMaximise } from '../../wailsjs/runtime/runtime'

export const handleMinimize = () => {
    WindowMinimise()
}

export const handleMaximize = () => {
    WindowToggleMaximise()
}

export const handleClose = () => {
    Quit()
}

export default { handleMinimize, handleMaximize, handleClose }