package helper

import (
	"os"
)

// *Metodo responsável por retornar o tamanho de um arquivo em bytes a partir de seu path, ex: C:\\users\\ramos
func GetByteSize(path string) (int64, error) {

	fileInfo, err := os.Stat(path)
	if err != nil {
		return 0, nil
	}
	newSize := fileInfo.Size()
	return newSize, err
}
