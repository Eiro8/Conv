package helper

import (
	"fmt"
	"image"
	"image/jpeg"
	"image/png"
	"os"

	"github.com/deepteams/webp"
)

// * Encodifica uma imagem em um arquivo vazio em base da extensão escolhida e qualidade de conversão.
func EncodeByExtension(extension string, conversionQuality int, temp *os.File, imgFile image.Image) {

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
	var err error
	switch extension {
	case "PNG":
		err := PNGEncoder.Encode(temp, imgFile)
		if err != nil {
			fmt.Errorf("Ocorreu um erro: %v", err)
		}
	case "JPG":
		err = jpeg.Encode(temp, imgFile, &jpeg.Options{
			Quality: conversionQuality,
		})
		if err != nil {
			fmt.Errorf("Ocorreu um erro: %v", err)

		}
	case "JPEG":
		err = jpeg.Encode(temp, imgFile, &jpeg.Options{
			Quality: conversionQuality,
		})
		if err != nil {
			fmt.Errorf("Ocorreu um erro: %v", err)

		}
	case "WEBP":
		err = webp.Encode(temp, imgFile, &webp.EncoderOptions{
			Lossless: false,
			Quality:  float32(100 - conversionQuality),
		})
		if err != nil {
			fmt.Errorf("Ocorreu um erro: %v", err)

		}
	}

}
