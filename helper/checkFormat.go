package helper

import "errors"

var AllowedFileType map[string]string = map[string]string{
	"webp": "webp",
	"jpeg": "jpeg",
	"jpg":  "jpg",
	"png":  "png",
	"avif": "avif",
}

func CheckFormat(format string) error {
	_, ok := AllowedFileType[format]
	if ok {
		return nil
	} else {
		return errors.New("Um erro ocorreu em CheckFormat():")
	}
}
