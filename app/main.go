package main

import (
	"ikjnv/react-go-blog/internal/conf"
	"ikjnv/react-go-blog/internal/server"
)

func main() {
	server.Start(conf.NewConfig())
}
