package models

//struct que representa dados do arquivo convertido. path(url => string) e tamanho (bytes)
type ConversionInfo struct {
	NewPath string
	NewSize int64
}
