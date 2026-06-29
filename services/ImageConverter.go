package services

import (
	"file/helper"
	"image/jpeg"
	"image/png"
	"os"
	"strings"

	"github.com/HugoSmits86/nativewebp"
)

func Convert(path string, extension string) (string, int64, error) {

	imgfile, _, err := helper.OpenAndDecode(path)

	temp, err := os.CreateTemp("", "*."+strings.ToLower(extension))
	if err != nil {
		return "Erro ao criar arquivo:", 0, err
	}

	defer temp.Close()
	switch extension {
	case "PNG":
		err = png.Encode(temp, imgfile)
		if err != nil {
			return "", 0, err
		}
	case "JPG":
		err = jpeg.Encode(temp, imgfile, nil)
		if err != nil {
			return "Erro ao criar arquivo:", 0, err
		}
	case "JPEG":
		err = jpeg.Encode(temp, imgfile, nil)
		if err != nil {
			return "Erro ao criar arquivo:", 0, err
		}
	case "WEBP":
		err = nativewebp.Encode(temp, imgfile, nil)
		if err != nil {
			return "Erro ao criar arquivo:", 0, err
		}
	}

	newPath := temp.Name()
	newSize, err := helper.GetByteSize(newPath)
	if err != nil {
		return "Erro ao capturar tamanho do arquivo convertido:", 0, err
	}

	//*Retorna o path do arquivo já convertido
	return newPath, newSize, nil
}
