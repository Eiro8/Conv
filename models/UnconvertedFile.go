package models

type UnconvertedFile struct {
	ID         uint16
	OriginalID uint16
	FilePath   string
	ConvertTo  string
}
