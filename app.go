package main

import (
	"context"
	"fmt"

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

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) FileInfo(name string, filetype string, filesize int) string {

	fmt.Printf("O arquivo foi recebido! vi que seu nome é %v, o tipo é %v e ele tem %v de tamanho!", name, filetype, filesize)
	return "ok"
}

func (a *App) OpenFileDialog() { //* consegui passar a array, mas vou usar dialog agr

	// runtime.OpenMultipleFilesDialog(
	// 	a.ctx,
	// 	runtime.OpenDialogOptions{
	// 		"/",
	// 		"gluglu",
	// 		"TitleHere",
	// 	},
	// )

	runtime.OpenMultipleFilesDialog(
		a.ctx,
		runtime.OpenDialogOptions{},
	)
}
