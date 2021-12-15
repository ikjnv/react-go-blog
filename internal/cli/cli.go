package cli

import (
	"flag"
	"fmt"
	"ikjnv/react-go-blog/internal/logging"
	"os"
)

func usage() {
	fmt.Print(`This program runs React-Go-Blog backend server
		Usage:

		rgb [arguments]
		
		Supported arguments:
	`)
	flag.PrintDefaults()
	os.Exit(1)
}

func Parse() string {
	flag.Usage = usage
	env := flag.String("env", "dev", `Sets environments. Possible values are "dev" and "prod"`)
	flag.Parse()
	logging.ConfigureLogger(*env)
	if *env == "prod" {
		logging.SetGinLogToFile()
	}
	return *env
}
