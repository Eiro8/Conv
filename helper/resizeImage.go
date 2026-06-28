package helper

import (
	"bytes"
	"encoding/base64"
	"image"

	"github.com/HugoSmits86/nativewebp"
	"golang.org/x/image/draw"
)

/*
Um retangulo feito por (0, 0, 100, 50) cria uma caixa que inicia no canto superior direito e tem 100 pixels de largura e 50 pixeis de altura.
a função retorna a imagem redimensionada como Image.image e seu valor em base64 string.
*/
func GenerateThumbnailBase64(sourceImage image.Image, x0, y0, x1, y1 int) string {
	thumbImage := image.NewRGBA(image.Rect(
		x0, y0, x1, y1,
	))
	draw.NearestNeighbor.Scale(thumbImage, thumbImage.Rect, sourceImage, sourceImage.Bounds(), draw.Over, nil)
	buffer := new(bytes.Buffer)
	nativewebp.Encode(buffer, thumbImage, nil)
	Base64Str := base64.StdEncoding.EncodeToString(buffer.Bytes())

	return Base64Str
}
