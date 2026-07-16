import { ConvertImage } from "../../wailsjs/go/main/App";

/**
 * Recebe uma array de {@link ImageStruct}, converte os objetos ao formato desejado e retorna informaçoes sobre a conversão
 * @param {object[]} imageObjectArray
 * @param {number} convertQuality quanto o arquivo sera convertido de 0 - 100 
 * @returns {object[]} Array de objeto contendo {ID, NewPath, NewSize}
 */

export default async function convertImageObjects(imageObjectArray, convertQuality) {
    try {
        let unconvertedArray = []
        imageObjectArray.forEach((file, index) => {
            const { IsConverted, FilePath, ConvertTo, ID } = file;
            if (!IsConverted) {
                unconvertedArray.push(
                    {
                        ID: parseInt(index, 10),
                        OriginalID: ID,
                        FilePath: FilePath,
                        ConvertTo: ConvertTo,
                    }
                )
            }
            else {
                return
            }
        })
        const AlteredFilesObj = await ConvertImage(unconvertedArray, convertQuality)
        return AlteredFilesObj
    }
    catch (error) {
        console.log(error)
        return new Error(`Um erro ocorreu ao converter o arquivo: \n \n${error}`)
    }
}