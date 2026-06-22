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

func (a *App) SelectImage() []models.ImageStruct {

	images, err := runtime.OpenMultipleFilesDialog(a.ctx, runtime.OpenDialogOptions{})
	if err != nil {
		return nil
	}
	return services.SelectImage(images)
}

func OpenFileDialog(a context.Context) []string {

	images, _ := runtime.OpenMultipleFilesDialog(
		a,
		runtime.OpenDialogOptions{
			Title:            "Selecione os arquivos", //* Título da caixa
			DefaultDirectory: "",                      //* Default Directory aceita uma string, que se vazia meio que 'deixa' pro OS escolher aonde vai abrir o Dialog
			Filters: []runtime.FileFilter{ //* Filtros de arquivo
				{
					DisplayName: "Imagens (*.jpg;*.png;*.webp)", //* Informação do Filtro ex: "Imagens (jpeg,png,avif)"
					Pattern:     "*.jpg;*.webp;*.png",           //* lista de extensoes separadas por ponto e vírgula ex: "*.jpeg;*.png;*.avif;"
				},
			},
		},
	)
	return images
}

func (a *App) ConvertImage(path string, extension string) (string, error) {
	return services.Convert(path, extension)
}

func (a *App) SaveFile(tempPath, name, format string) error {
	return services.SaveFile(tempPath, name, format, a.ctx)
}
