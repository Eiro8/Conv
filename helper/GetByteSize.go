package helper

import (
	"os"
)

func GetByteSize(path string) (int64, error) {

	fileInfo, err := os.Stat(path)
	if err != nil {
		return 0, nil
	}
	newSize := fileInfo.Size()
	return newSize, err
}
