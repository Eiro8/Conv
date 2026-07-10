package main

import (
	"context"
	"file/models"
	"file/services"
	"sync"

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

func (a *App) ConvertImage(ImagePath, extension string, convertQuality int) (models.ConversionInfo, error) {
	convertedFileInfo, err := services.Convert(ImagePath, extension, convertQuality)
	return convertedFileInfo, err
}

func (a *App) SaveFile(FileName, FileFormat, CurrentPath, DesiredPath string) error {
	return services.SaveImage(FileName, FileFormat, CurrentPath, DesiredPath, a.ctx)
}
func (a *App) GetInputPath() []string {
	imagePaths, err := runtime.OpenMultipleFilesDialog(a.ctx, runtime.OpenDialogOptions{})
	if err != nil {
		return nil
	}
	return imagePaths
}
func (a *App) ParseImagePaths(ImagesPath []string) []models.ImageStruct {
	pathsArray := make([]models.ImageStruct, 0, len(ImagesPath))
	var wg sync.WaitGroup
	for _, path := range ImagesPath {
		wg.Add(1)
		go func() {
			imgStruct := services.LoadImages(path)
			pathsArray = append(pathsArray, imgStruct)
			wg.Done()
		}()
	}
	wg.Wait()
	return pathsArray
}

func (a *App) OpenDirectoryDialog() (string, error) {
	dir, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		DefaultDirectory:           "",
		DefaultFilename:            "",
		Title:                      "Selecione a pasta a qual deseja salvar seus arquivos",
		ShowHiddenFiles:            false,
		CanCreateDirectories:       true,
		TreatPackagesAsDirectories: false,
	})
	return dir, err
}
