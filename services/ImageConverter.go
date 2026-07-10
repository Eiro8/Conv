package services

import (
	"file/helper"
	"file/models"
	"fmt"
	"image/jpeg"
	"image/png"
	"os"
	"strings"

	"github.com/HugoSmits86/nativewebp"
)

func Convert(path, extension string, conversionQuality int) (models.ConversionInfo, error) {

	imgfile, _, err := helper.OpenAndDecode(path)

	temp, err := os.CreateTemp("", "*."+strings.ToLower(extension))
	if err != nil {
		return models.ConversionInfo{}, err
	}
	JPGMAP := map[int]int{
		0: 0,
		1: 25,
		2: 50,
		3: 75,
		4: 100,
	}

	WEBPMAP := map[int]int{
		0: 0,
		1: 1,
		2: 3,
		3: 5,
		4: 6,
	}

	PNGMAP := map[int]png.CompressionLevel{
		0: png.BestSpeed,
		1: 3,
		2: png.DefaultCompression,
		3: 7,
		4: png.BestCompression,
	}

	PNGEncoder := png.Encoder{
		CompressionLevel: PNGMAP[conversionQuality],
	}

	switch extension {
	case "PNG":
		err := PNGEncoder.Encode(temp, imgfile)
		if err != nil {
			return models.ConversionInfo{}, err
		}
	case "JPG":

		err = jpeg.Encode(temp, imgfile, &jpeg.Options{
			Quality: JPGMAP[conversionQuality],
		})
		if err != nil {
			return models.ConversionInfo{}, err

		}
	case "JPEG":
		err = jpeg.Encode(temp, imgfile, &jpeg.Options{
			Quality: JPGMAP[conversionQuality],
		})
		if err != nil {
			return models.ConversionInfo{}, err

		}
	case "WEBP":
		err = nativewebp.Encode(temp, imgfile, &nativewebp.Options{
			UseExtendedFormat: true,
			CompressionLevel:  nativewebp.CompressionLevel(WEBPMAP[conversionQuality]),
		})
		if err != nil {
			return models.ConversionInfo{}, err
		}
	}
	defer temp.Close()
	newPath := temp.Name()
	newSize, err := helper.GetByteSize(newPath)
	if err != nil {
		return models.ConversionInfo{}, err
	}
	MBSIZE := newSize / 1000000
	fmt.Printf("O SIZE EM MB %v", MBSIZE)
	return models.ConversionInfo{newPath, newSize}, nil
}
