package services

import (
	"bytes"
	"encoding/base64"
	"file/helper"
	"file/models"
	"fmt"
	"image"
	"log"
	"os"
	"strings"

	"github.com/HugoSmits86/nativewebp"
	"golang.org/x/image/draw"
)

/*
Itera sobre todos arquivos, e após limpar o path ( troca \\ por /), e verificar a

extensão do arquivo ( png, jpeg etc...), o adiciona em uma array de models.ImageStruct
*/
func PathToImageStruct(images []string) []models.ImageStruct {

	structArr := make([]models.ImageStruct, 0, len(images))

	for _, imgPath := range images {
		imgPath = strings.ReplaceAll(imgPath, "\\", "/")

		file, err := os.Open(imgPath)
		if err != nil {
			log.Fatalf("erro aconteceu na linha 61: %v", err)
		}
		defer file.Close()

		sourceImage, format, err := image.Decode(file)

		ok := helper.CheckFormat(format)
		if ok != nil {
			fmt.Printf("O formato %v não é aceito pelo sistema.", format)
			continue
		}

		//* Tamanho da imagem definido para 80:45
		thumbImage := image.NewRGBA(image.Rect(
			0, 0, 150, 150,
		))

		//*Resize de fullImage escrito em thumbImage
		draw.NearestNeighbor.Scale(thumbImage, thumbImage.Rect, sourceImage, sourceImage.Bounds(), draw.Over, nil)

		//* Buffer pra armazenamento em memoria
		buffer := new(bytes.Buffer)
		nativewebp.Encode(buffer, thumbImage, nil)

		Base64Str := base64.StdEncoding.EncodeToString(buffer.Bytes())

		imgStruct, ok := helper.CreateImageStruct(format, imgPath, Base64Str)
		if ok != nil {
			continue
		}
		structArr = append(structArr, imgStruct)
	}

	return structArr
}
