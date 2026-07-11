import { ParseImagePaths } from "../../wailsjs/go/main/App";

/**
    * Recebe uma lista de caminhos de imagens e processa todos para gerar objetos de imagem
    * uteis para a aplicação
    * 
    * @param {string[]} pathArray Array de caminhos ate as imagens que devem ser convertidas
    * @returns {object[]} Objetos criados a partir dos caminhos
    */
export default async function CreateImageObject(pathArray) {
    try {
        let ImageObjects = await ParseImagePaths(pathArray);
        return ImageObjects
    } catch (error) {
        console.log(new Error(`Ocorreu um erro ao processar suas imagens: ${error.message}`))
        return new Error(`Ocorreu um erro ao processar suas imagens: ${error.message}`)
    }
}