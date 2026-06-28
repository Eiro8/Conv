package models

type ImageStruct struct {
	FileName string
	FileType string
	FilePath string
	FileSize int64

	ConvertedPath string
	Base64Preview string
}
