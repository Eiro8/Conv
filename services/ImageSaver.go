package services

import (
	"context"
	"io"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func SaveImage(tempPath, name, desiredFormat string, ctx context.Context) error {
	path, err := runtime.SaveFileDialog(ctx, runtime.SaveDialogOptions{
		Title:            "Salvar Imagem Convertida",
		DefaultDirectory: "",
		DefaultFilename:  name + "." + desiredFormat,
		Filters: []runtime.FileFilter{
			{DisplayName: "Imagem " + desiredFormat, Pattern: "*." + desiredFormat},
		},
	})

	if err != nil {
		return err
	}
	if path == "" {
		return nil
	}

	source, err := os.Open(tempPath)
	if err != nil {
		return err
	}
	defer source.Close()

	destination, err := os.Create(path)
	if err != nil {
		return err
	}
	defer destination.Close()

	_, err = io.Copy(destination, source)
	if err != nil {
		return err
	}

	err = os.Remove(tempPath)
	if err != nil {
		return err
	}
	return nil
}
