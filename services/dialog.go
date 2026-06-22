package services

import (
	"encoding/base64"
	"file/helper"
	"file/models"
	"fmt"
	"image"
	"log"
	"os"
	"strings"
)

func SelectImage(images []string) []models.ImageStruct {

	structArr := make([]models.ImageStruct, 0, len(images))

	for _, v := range images {
		v = strings.ReplaceAll(v, "\\", "/")

		file, err := os.Open(v)
		if err != nil {
			log.Fatalf("erro aconteceu na linha 61: %v", err)
		}
		defer file.Close()

		bytes, err := os.ReadFile(v)
		if err != nil {
			fmt.Printf("Erro ao ler o arquivo: %v\n", err)
			continue
		}

		Base64Str := base64.StdEncoding.EncodeToString(bytes)

		_, format, err := image.Decode(file)

		ok := helper.CheckFormat(format)
		if ok != nil {
			fmt.Printf("A imagem não tem formato aceito pelo sistema.")
			continue
		}
		ImgStruct, ok := helper.CreateImageStruct(format, v, Base64Str)
		if ok != nil {
			continue
		}
		structArr = append(structArr, ImgStruct)
	}

	return structArr
}
