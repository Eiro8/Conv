package helper

import (
	"fmt"
	"image"
	"os"
)

// Decodifica uma imagem pelo seu path e retorna a imagem em image.Image, seu formato e tamanho em bytes
func OpenAndDecode(path string) (image.Image, string, int64, error) {
	file, err := os.Open(path)
	if err != nil {
		fmt.Printf("Um erro ocorreu ao abrir a imagem: %v \n", err)
		return nil, "", 0, err
	}
	defer file.Close()
	fileInfo, err := os.Stat(path)
	if err != nil {
		fmt.Printf("Um erro ocorreu ao verificar o tamanho do arquivo: %v", err)
		return nil, "", 0, err
	}
	//!Tamanho em btytes
	fileSize := fileInfo.Size()

	sourceImage, format, err := image.Decode(file)

	if err != nil {
		fmt.Printf("Um erro ocorreu ao decodificar a imagem: %v \n", err)
		return nil, "", 0, err
	}
	return sourceImage, format, fileSize, nil
}
