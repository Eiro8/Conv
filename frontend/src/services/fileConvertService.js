import { ConvertImage } from "../../wailsjs/go/main/App";

/**
 * 
 * @param {object[]} imageObjectArray 
 * @returns 
 */

let unconvertedArr = []

async function handleConvert(imageObjectArray) {
    try {
        imageObjectArray.forEach((file, index) => {
            const { IsConverted, FilePath, ConvertTo } = file;
            if (!IsConverted) {
                unconvertedArr.push(
                    { ID: index, FilePath, ConvertTo }
                )
            }
            else {
                return file
            }
        })
        const AlteredFiles = await ConvertImage(unconvertedArr);
        return AlteredFiles
    }
    catch (error) {
        console.log(error)
        return new Error(`Um erro ocorreu ao converter o arquivo: \n \n${error}`)
    }
}