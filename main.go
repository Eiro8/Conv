package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "Conv",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		DragAndDrop: &options.DragAndDrop{
			EnableFileDrop:     true,
			DisableWebViewDrop: false,
		},
		MinWidth:         300,
		MinHeight:        300,
		WindowStartState: options.Minimised, //* deixa a tela maximisada ao iniciar o app
		Frameless:        true,              //* deixa sem frame em volta
		AlwaysOnTop:      false,             //*Mantém o frame no topo das outras abas, mesmo quando perdeo  foco.
		Windows:          &windows.Options{},
		//! AlwaysOnTop ( removido por enquanto para melhor experiencia de desenvolvimento)
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
