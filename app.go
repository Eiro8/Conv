package main

import (
	"context"
	"file/models"
	"file/services"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) ConvertImage(path string, extension string) (models.ConversionInfo, error) {
	convertedFileInfo, err := services.Convert(path, extension)
	return convertedFileInfo, err
}

func (a *App) SaveFile(tempPath, name, format string) error {
	return services.SaveImage(tempPath, name, format, a.ctx)
}

func (a *App) SelectImage(ImagesPath []string) []models.ImageStruct {

	imagePaths, err := runtime.OpenMultipleFilesDialog(a.ctx, runtime.OpenDialogOptions{})
	if err != nil {
		return nil
	}
	return services.LoadImages(imagePaths)
}
