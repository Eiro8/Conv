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
func LoadImages(images []string) []models.ImageStruct {

	structArr := make([]models.ImageStruct, 0, len(images))

	for _, imgPath := range images {

		sourceImage, format, size, ok := helper.OpenAndDecode(imgPath)
		if ok != nil {
			fmt.Printf("Ocorreu um erro: %v", ok)
			continue
		}
		err := helper.CheckImageFormat(format)
		if err != nil {
			fmt.Printf("O formato %v não é aceito pelo sistema.", format)
			continue
		}
		thumbBase64 := helper.GenerateThumbnailBase64(sourceImage, 0, 0, 150, 150)
		imgStruct, ok := helper.CreateImageStruct(format, imgPath, thumbBase64, size)
		if ok != nil {
			fmt.Printf("Ocorreu um erro ao criar o struct da imagem.\n\n %v", ok)
			continue
		}
		structArr = append(structArr, imgStruct)
	}

	return structArr
}
