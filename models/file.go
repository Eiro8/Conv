package models

type ImageStruct struct {
	FileName string
	FileType string
	FilePath string
	FileSize int64

	ConvertedPath string
	ConvertedSize int64
	Base64Preview string
}
