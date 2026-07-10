package services

import (
	"file/helper"
	"file/models"
	"fmt"
	"os"
	"strings"
	"sync"
)

func Convert(path, extension string, conversionQuality int) (models.ConversionInfo, error) {

	imgfile, _, err := helper.OpenAndDecode(path)

	temp, err := os.CreateTemp("", "*."+strings.ToLower(extension))
	if err != nil {
		return models.ConversionInfo{}, err
	}

	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		helper.EncodeByExtension(extension, conversionQuality, temp, imgfile)
		wg.Done()
	}()

	defer temp.Close()
	newPath := temp.Name()
	wg.Wait()
	newSize, err := helper.GetByteSize(newPath)
	if err != nil {
		fmt.Printf("um erro ocorreu: %v", err)
		return models.ConversionInfo{}, err
	}

	return models.ConversionInfo{newPath, newSize}, nil
}
