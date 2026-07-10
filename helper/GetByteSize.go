package helper

import (
	"os"
)

// *Metodo responsável por retornar o tamanho de um arquivo em bytes a partir de seu path, ex: C:\\users\\ramos
func GetByteSize(path string) (int64, error) {

	info, err := os.Stat(path)
	if err != nil {
		return 0, nil
	}
	newSize := info.Size()
	return newSize, err
}
