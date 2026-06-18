package main

import (
	"context"
	"fmt"
	"image"
	"log"
	"os"
	"strings"

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

func (a *App) OpenFileDialog() []string {

	images, _ := runtime.OpenMultipleFilesDialog(
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
	newArr := make([]string, len(images), len(images))
	for _, v := range images {
		v = strings.ReplaceAll(v, "\\", "/")
		file, err := os.Open(v)
		if err != nil {
			log.Fatalf("erro aconteceu na linha 61: %v", err)
		}
		defer file.Close()

		_, format, err := image.Decode(file)
		if err != nil {
			log.Fatalf("erro aconteceu na linha 65: %v", err)
		}

		fmt.Printf("formato é %v\n", format)
	}
	return newArr //* retorna uma array de string contendo o path da imagem, e um erro, caso aconteça.
}
