package services

import (
	"context"
	"file/helper"
	"file/models"
	"fmt"
	"os"
	"strings"
	"sync"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func Convert(unconvertedFile models.UnconvertedFile, conversionQuality uint8, AppContext context.Context) (models.ConversionInfo, error) {

	var path string = unconvertedFile.FilePath
	var extension string = unconvertedFile.ConvertTo
	var ID uint16 = unconvertedFile.ID
	var OriginalID uint16 = unconvertedFile.OriginalID

	runtime.EventsEmit(AppContext, "startedConvert", OriginalID)
	imgfile, _, err := helper.OpenAndDecode(path)

	temp, err := os.CreateTemp("", "*."+strings.ToLower(extension))
	if err != nil {
		return models.ConversionInfo{}, err
	}

	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		helper.EncodeByExtension(extension, int(conversionQuality), temp, imgfile)
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

	return models.ConversionInfo{ID, newPath, newSize, extension}, nil
}
