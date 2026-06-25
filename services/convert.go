package services

import (
	"image"
	"image/jpeg"
	"image/png"
	"os"
	"strings"

	"github.com/HugoSmits86/nativewebp"
)

func Convert(path string, extension string) (string, error) {
	img, err := os.Open(path)
	if err != nil {
		return "Ocorreu um erro ao ler o arquivo: ", err
	}
	defer img.Close()

	imgfile, _, err := image.Decode(img)
	temp, err := os.CreateTemp("", "*."+strings.ToLower(extension))
	if err != nil {
		return "Erro ao criar arquivo:", err
	}
	defer temp.Close()

	switch extension {
	case "PNG":
		err = png.Encode(temp, imgfile)
		if err != nil {
			return "", err
		}
	case "JPG":
		err = jpeg.Encode(temp, imgfile, nil)
		if err != nil {
			return "", err
		}
	case "JPEG":
		err = jpeg.Encode(temp, imgfile, nil)
		if err != nil {
			return "", err
		}
	case "WEBP":
		err = nativewebp.Encode(temp, imgfile, nil)
		if err != nil {
			return "", err
		}
	}

	return temp.Name(), nil //* Retorna o path do arquivo já convertido
}
