package main

import (
	"context"
	"fmt"

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

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) FileInfo(name string, filetype string, filesize int) string {

	fmt.Printf("O arquivo foi recebido! vi que seu nome é %v, o tipo é %v e ele tem %v de tamanho!", name, filetype, filesize)
	return "ok"
}

func (a *App) OpenFileDialog() ([]string, error) {

	images, err := runtime.OpenMultipleFilesDialog(
		a.ctx,
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

	return images, err //* retorna uma array de string contendo o path da imagem, e um erro, caso aconteça.
}
