package server

import (
	"ikjnv/react-go-blog/internal/database"
	"ikjnv/react-go-blog/internal/router"
	"ikjnv/react-go-blog/internal/store"
)

func Start() {

	store.SetDBConnection(database.NewDBOptions())

	r := router.SetRouter()
	r.Run(":8080")
}
