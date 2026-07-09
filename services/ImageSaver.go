package services

import (
	"context"
	"io"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

var DirectoryPath = ""

// * Salva a imagem presente no caminho especificado no  utilizando o formato e nome informados.
func SaveImage(FileName, FileFormat, CurrentPath, DesiredPath string, ctx context.Context) error {
	if DesiredPath != "" {
		DirectoryPath = DesiredPath
	}
	print(DesiredPath)
	print(DirectoryPath)
	path, err := runtime.SaveFileDialog(ctx, runtime.SaveDialogOptions{
		Title:            "Salvar Imagem Convertida",
		DefaultDirectory: DirectoryPath,
		DefaultFilename:  FileName,
		Filters: []runtime.FileFilter{
			{DisplayName: "Imagem " + FileFormat, Pattern: "*." + FileFormat},
		},
	})
	if err != nil {
		return err
	}

	if path == "" {
		return nil
	}

	source, err := os.Open(CurrentPath)
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

	err = os.Remove(CurrentPath)
	if err != nil {
		return err
	}
	return nil
}
