package helper

import (
	"fmt"
	"image"
	"os"
)

// Decodifica uma imagem pelo seu path e retorna a imagem em image.Image e seu formato
func OpenAndDecode(path string) (image.Image, string, error) {
	file, err := os.Open(path)
	if err != nil {
		fmt.Printf("Um erro ocorreu ao abrir a imagem: %v \n", err)
		return nil, "", err
	}
	defer file.Close()

	sourceImage, format, err := image.Decode(file)
	if err != nil {
		fmt.Printf("Um erro ocorreu ao decodificar a imagem: %v \n", err)
		return nil, "", err
	}
	return sourceImage, format, nil
}
