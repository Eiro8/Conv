

/**
 * formata bytes para GB/MB/KB/Bytes (ex: 6000000 => "6 MB" )
 * @param {number} size tamanho em bytes
 * @returns {string}
 *  */
export default function bytesParser(size) {
    let kilobyte = 1024;
    let megabyte = kilobyte * 1024;
    let gigabyte = megabyte * 1024;
    let fileSize = ""

    if (size >= gigabyte) {
        fileSize = `${(size / gigabyte).toFixed(1)} GB`
    } else if (size >= megabyte) {
        fileSize = `${(size / megabyte).toFixed(1)} MB`
    } else if (size >= kilobyte) {
        fileSize = `${(size / kilobyte).toFixed(1)} KB`
    } else {
        fileSize = `${size} bytes`
    }
    return fileSize
}