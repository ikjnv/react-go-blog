package conf

import (
	"log"
	"os"
	"strconv"
)

const (
	hostKey       = "RGB_HOST"
	portKey       = "RGB_PORT"
	dbHostKey     = "RGB_DB_HOST"
	dbPortKey     = "RGB_DB_PORT"
	dbNameKey     = "RGB_DB_NAME"
	dbUserKey     = "RGB_DB_USER"
	dbPasswordKey = "RGB_DB_PASSWORD"
	jwtSecretKey  = "RGB_JWT_SECRET"
)

type Config struct {
	Host       string
	Port       string
	DbHost     string
	DbPort     string
	DbName     string
	DbUser     string
	DbPassword string
	JwtSecret  string
	Env        string
}

func NewConfig(env string) Config {
	host, ok := os.LookupEnv(hostKey)
	if !ok || host == "" {
		log.Panic(hostKey)
	}

	port, ok := os.LookupEnv(portKey)
	if !ok || port == "" {
		if _, err := strconv.Atoi(port); err != nil {
			log.Panic(portKey)
		}
	}

	dbHost, ok := os.LookupEnv(dbHostKey)
	if !ok || dbHost == "" {
		log.Panic(dbHostKey)
	}

	dbPort, ok := os.LookupEnv(dbPortKey)
	if !ok || dbPort == "" {
		if _, err := strconv.Atoi(dbPort); err != nil {
			log.Panic(dbPortKey)
		}
	}

	dbName, ok := os.LookupEnv(dbNameKey)
	if !ok || dbName == "" {
		log.Panic(dbNameKey)
	}

	dbUser, ok := os.LookupEnv(dbUserKey)
	if !ok || dbUser == "" {
		log.Panic(dbUserKey)
	}

	dbPassword, ok := os.LookupEnv(dbPasswordKey)
	if !ok || dbPassword == "" {
		log.Panic(dbPasswordKey)
	}

	jwtSecret, ok := os.LookupEnv(jwtSecretKey)
	if !ok || jwtSecret == "" {
		log.Panic(jwtSecretKey)
	}

	return Config{
		Host:       host,
		Port:       port,
		DbHost:     dbHost,
		DbPort:     dbPort,
		DbName:     dbName,
		DbUser:     dbUser,
		DbPassword: dbPassword,
		JwtSecret:  jwtSecret,
		Env:        env,
	}
}

func NewTestConfig() Config {
	testConfig := NewConfig("dev")
	testConfig.DbName = testConfig.DbName + "_test"
	return testConfig
}
