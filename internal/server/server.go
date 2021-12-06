package server

import (
	"ikjnv/react-go-blog/internal/conf"
	"ikjnv/react-go-blog/internal/database"
	"ikjnv/react-go-blog/internal/store"
)

func Start(cfg conf.Config) {
	store.SetDBConnection(database.NewDBOptions(cfg))

	router := SetRouter()

	// Start listening and serving requests
	router.Run(":8080")
}
