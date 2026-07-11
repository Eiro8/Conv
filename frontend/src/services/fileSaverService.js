import { SaveFile } from "../../wailsjs/go/main/App"

/**
     * Salva o arquivo no diretório selecionado
     * 
     * @param {string} name - Nome do arquivo
     * @param {string} format - Formato do arquivo
     * @param {string} path - Caminho do arquivo
     * @param {string} saveDirectory - Caminho aonde o arquivo será salvo, se {@link saveDirectory} for igual a "", 
     * o SO lidará com aonde o arquivo será salvo.
     * @returns 
     */
export default async function saveFile(name, format, path, saveDirectory) {
    try {
        SaveFile(name, format, path, saveDirectory)
    } catch (error) {
        return new Error(error.message)
    }
}