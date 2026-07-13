import { OpenDirectoryDialog } from "../../wailsjs/go/main/App";

/**
 * Abre o filemanager do sistema em busca de um diretorio. Retorna o caminho do diretorio selecionado
 * @returns {Promise<string>} string com path do diretorio
 */
export default async function DirectoryDialog() {
    return await OpenDirectoryDialog()
}