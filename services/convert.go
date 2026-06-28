package services

import (
	"file/helper"
	"image/jpeg"
	"image/png"
	"os"
	"strings"

	"github.com/HugoSmits86/nativewebp"
)

func Convert(path string, extension string) (string, error) {
	// al := time.Now()
	imgfile, _, _, err := helper.OpenAndDecode(path)
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
	// acu := time.Since(al)
	// fmt.Printf("tempo passado pra converter %v foi de: %v \n\n", path, acu)
	return temp.Name(), nil //* Retorna o path do arquivo já convertido
}
