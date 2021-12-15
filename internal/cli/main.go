package cli

import (
	"ikjnv/react-go-blog/internal/conf"
	"ikjnv/react-go-blog/internal/server"
)

func main() {
	env := Parse()
	server.Start(conf.NewConfig(env))
}
