package main

import (
	"context"
	"encoding/base64"
	"errors"
	"fmt"
	"image"
	"image/png"
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

type ImageStruct struct {
	FileName      string
	FileType      string
	FilePath      string
	ConvertedPath string
	Preview       string
}

var AllowedFileType map[string]string = map[string]string{
	"webp": "webp",
	"jpeg": "jpeg",
	"jpg":  "jpg",
	"png":  "png",
	"avif": "avif",
}

func (a *App) SelectImage() []ImageStruct {

	images := a.OpenFileDialog()

	structArr := make([]ImageStruct, 0, len(images))

	for _, v := range images {
		v = strings.ReplaceAll(v, "\\", "/")

		file, err := os.Open(v)
		if err != nil {
			log.Fatalf("erro aconteceu na linha 61: %v", err)
		}
		defer file.Close()

		bytes, err := os.ReadFile(v)
		if err != nil {
			fmt.Printf("Erro ao ler o arquivo: %v\n", err)
			continue
		}

		Base64Str := base64.StdEncoding.EncodeToString(bytes)

		_, format, err := image.Decode(file)

		ok := CheckFormat(format)
		if ok != nil {
			fmt.Printf("A imagem não tem formato aceito pelo sistema.")
			continue
		}
		ImgStruct, ok := CreateImageStruct(format, v, Base64Str)
		if ok != nil {
			continue
		}
		structArr = append(structArr, ImgStruct)
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

func CreateImageStruct(format string, path string, base64 string) (ImageStruct, error) {
	name := filepath.Base(path)
	if name == "" {
		return ImageStruct{}, errors.New("Não há nenhuma imagem nesse local, selecione novamente.")
	}
	var newImg ImageStruct = ImageStruct{
		name, format, path, "", base64,
	}
	return newImg, nil
}

type ConvertedImage struct {
	ID          int
	OutputPath  string
	IsConverted bool
}

func (a *App) ConvertImage(path string, extension string) (string, error) {

	img, err := os.Open(path)
	if err != nil {
		return "Ocorreu um erro ao ler o arquivo: ", err
	}

	imgfile, _, err := image.Decode(img)
	temp, err := os.CreateTemp("", "*.png")
	if err != nil {
		return "Erro ao criar arquivo:", err
	}
	defer temp.Close()
	png.Encode(temp, imgfile)

	return temp.Name(), nil
}
