import { GetInputPath } from "../../wailsjs/go/main/App";

/**
 * Abre um openfiledialog() do runtimewails e retorna uma array de stirngs contendo os paths dos arquivos
 * @returns {Promise<Array<string>>}
 */
export default async function FileDialog() {
    return await GetInputPath();
}