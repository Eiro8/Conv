import { Browser } from '@wailsio/runtime'

/**
 * utiliza do runtime do wails para abrir uma instancia do navegador
 *  padrão do usuario e abrir o link definido.
 * @param {string} linkUrl url a ser aberta fora do wails 
 */
export const openLink = ({ linkUrl }) => {
    Browser.OpenURL(linkUrl)
}

export default openLink