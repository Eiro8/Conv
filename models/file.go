package models

//struct que representa as imagens do converter
type ImageStruct struct {
	ID       int
	FileName string
	FileType string
	FilePath string
	FileSize int64

	IsConverted   bool
	ConvertTo     string
	ConvertedPath string
	ConvertedSize int64
	Base64Preview string
}
