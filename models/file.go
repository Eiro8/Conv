package models

//struct que representa as imagens do converter
type ImageStruct struct {
	FileName string
	FileType string
	FilePath string
	FileSize int64

	ConvertedPath string
	ConvertedSize int64
	Base64Preview string
}
