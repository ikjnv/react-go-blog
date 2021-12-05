package server

import (
	"ikjnv/react-go-blog/internal/router"
)

func Start() {
	r := router.SetRouter()
	r.Run(":8080")
}
