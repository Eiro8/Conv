package helper

import (
	"errors"
	"file/models"
	"path/filepath"
)

// Cria o struct das Imagens
func CreateImageStruct(format string, path string, base64 string) (models.ImageStruct, error) {
	name := filepath.Base(path)
	if name == "" {
		return models.ImageStruct{}, errors.New("Não há nenhuma imagem nesse local, selecione novamente.")
	}
	var newImg models.ImageStruct = models.ImageStruct{
		name, format, path, "", base64,
	}
	return newImg, nil
}
