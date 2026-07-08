package helper

import (
	"errors"
	"file/models"
	"path/filepath"
)

// * mantém a informação de qual ID e
var idCounter = 0

// Cria o struct das Imagens
func CreateImageStruct(format string, path string, base64 string, size int64) (models.ImageStruct, error) {
	name := filepath.Base(path)
	if name == "" {
		return models.ImageStruct{}, errors.New("Não há nenhuma imagem nesse local, selecione novamente.")
	}
	idCounter++
	var newImg models.ImageStruct = models.ImageStruct{
		idCounter, name, format, path, size, false, "", " ", 0, base64,
	}
	return newImg, nil
}
