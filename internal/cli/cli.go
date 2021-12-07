package cli

import (
	"flag"
	"fmt"
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

func Parse() {
	flag.Usage = usage
	env := flag.String("env", "dev", `Sets environments. Possible values are "dev" and "prod"`)
	flag.Parse()
	logging.ConfigureLogger(*env)
	if *env == "prod" {
		logging.SetGinLogToFile()
	}
}
