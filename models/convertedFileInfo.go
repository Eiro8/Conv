package models

//struct que representa dados do arquivo convertido. path(url => string) e tamanho (bytes)
type ConversionInfo struct {
	ID            uint16
	ConvertedPath string
	ConvertedSize int64
}
