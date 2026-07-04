package services

import (
	"file/helper"
	"file/models"
	"image/jpeg"
	"image/png"
	"os"
	"strings"

	"github.com/HugoSmits86/nativewebp"
)

func Convert(path string, extension string) (models.ConversionInfo, error) {

	imgfile, _, err := helper.OpenAndDecode(path)

	temp, err := os.CreateTemp("", "*."+strings.ToLower(extension))
	if err != nil {
		return models.ConversionInfo{}, err
	}

	defer temp.Close()
	switch extension {
	case "PNG":
		err = png.Encode(temp, imgfile)
		if err != nil {
			return models.ConversionInfo{}, err
		}
	case "JPG":
		err = jpeg.Encode(temp, imgfile, nil)
		if err != nil {
			return models.ConversionInfo{}, err

		}
	case "JPEG":
		err = jpeg.Encode(temp, imgfile, nil)
		if err != nil {
			return models.ConversionInfo{}, err

		}
	case "WEBP":
		err = nativewebp.Encode(temp, imgfile, nil)
		if err != nil {
			return models.ConversionInfo{}, err
		}
	}

	newPath := temp.Name()
	newSize, err := helper.GetByteSize(newPath)
	if err != nil {
		return models.ConversionInfo{}, err
	}

	return models.ConversionInfo{newPath, newSize}, nil
}
