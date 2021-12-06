package main

import (
	"flag"
	"fmt"
	"ikjnv/react-go-blog/internal/database"
	"ikjnv/react-go-blog/internal/store"
	"os"

	"github.com/go-pg/migrations/v8"
)

const usageText = `This program runs commands in the DB. Supported commands are:
	- init - creates version info table in the DB.
	- up - runs all available migrations.
	- up [target] - runs available migrations up to the target.
	- down - reverts last migration.
	- reset - revets all migrations.
	- version - prints current db version.
	- set_version [version] = sets db version without running migrations

Usage:
	go run *.go <command> [args]
`

func main() {
	flag.Usage = usage
	flag.Parse()

	store.SetDBConnection(database.NewDBOptions())
	db := store.GetDBConnection()

	oldVersion, newVersion, err := migrations.Run(db, flag.Args()...)
	if err != nil {
		exitf(err.Error())
	}
	if newVersion != oldVersion {
		fmt.Printf("migrated from version %d to %d\n", oldVersion, newVersion)
	} else {
		fmt.Printf("version is %d\n", newVersion)
	}
}

func usage() {
	fmt.Print(usageText)
	flag.PrintDefaults()
	os.Exit(2)
}

func errorf(s string, args ...interface{}) {
	fmt.Fprintf(os.Stderr, s+"\n", args...)
}

func exitf(s string, args ...interface{}) {
	errorf(s, args...)
	os.Exit(1)
}
