package helper

import (
	"os"
)

func ValidatePath(path string) error {
	_, err := os.Stat(path)
	if err != nil {
		return err
	}
	return err
}
