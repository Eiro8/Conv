package main

import (
	"context"
	"errors"
	"fmt"
	"image"
	"log"
	"os"
	"path/filepath"
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

type ImageStuct struct {
	FileName string
	FileType string
	FilePath string
}

var AllowedFileType map[string]string = map[string]string{
	"webp": "webp",
	"jpeg": "jpeg",
	"jpg":  "jpg",
	"png":  "png",
	"avif": "avif",
}

func (a *App) SelectImage() []ImageStuct {

	images := a.OpenFileDialog()

	structArr := make([]ImageStuct, len(images))

	for _, v := range images {
		v = strings.ReplaceAll(v, "\\", "/")

		file, err := os.Open(v)
		if err != nil {
			log.Fatalf("erro aconteceu na linha 61: %v", err)
		}
		defer file.Close()

		_, format, err := image.Decode(file)

		ok := CheckFormat(format)
		if ok != nil {
			fmt.Printf("A imagem não tem formato aceito pelo sistema.")
			continue

		} else {
			ImgStruct, ok := CreateImageStruct(format, v)
			if ok != nil {
				continue
			}
			structArr = append(structArr, ImgStruct)
		}

	}

	return structArr
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
	return images
}

func CheckFormat(format string) error {
	_, ok := AllowedFileType[format]
	if ok {
		return nil
	} else {
		return errors.New("Um erro ocorreu em CheckFormat():")
	}
}

func CreateImageStruct(format string, path string) (ImageStuct, error) {
	name := filepath.Base(path)
	if name == "" {
		return ImageStuct{}, errors.New("Não há nenhuma imagem nesse local, selecione novamente.")
	}
	var newImg ImageStuct = ImageStuct{
		name, format, path,
	}
	return newImg, nil
}
