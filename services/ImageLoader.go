package services

import (
	"file/helper"
	"file/models"
	"fmt"
)

/*
Itera sobre todos arquivos, e após limpar o path ( troca \\ por /), e verificar a

extensão do arquivo ( png, jpeg etc...), o adiciona em uma array de models.ImageStruct
*/
func LoadImages(imagePath string) models.ImageStruct {

	sourceImage, format, ok := helper.OpenAndDecode(imagePath)
	if ok != nil {
		fmt.Printf("Ocorreu um erro: %v", ok)
		return models.ImageStruct{}

	}

	var erro error = helper.CheckImageFormat(format)
	if erro != nil {
		fmt.Printf("O formato %v não é aceito pelo sistema.", format)
		return models.ImageStruct{}

	}
	ImageSize, err := helper.GetByteSize(imagePath)
	if err != nil {
		fmt.Printf("Ocorreu um erro ao pegar os bytes: %v", err)
		return models.ImageStruct{}
	}

	thumbBase64 := helper.GenerateThumbnailBase64(sourceImage, 0, 0, 150, 100)

	imgStruct, ok := helper.CreateImageStruct(format, imagePath, thumbBase64, ImageSize)
	if ok != nil {
		fmt.Printf("Ocorreu um erro ao criar o struct da imagem.\n\n %v", ok)
		return models.ImageStruct{}
	}

	return imgStruct
}
