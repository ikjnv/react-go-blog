package main

import (
	"ikjnv/react-go-blog/internal/cli"
	"ikjnv/react-go-blog/internal/conf"
	"ikjnv/react-go-blog/internal/server"
)

func main() {
	env := cli.Parse()
	server.Start(conf.NewConfig(env))
}
