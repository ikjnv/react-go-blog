package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	// create default gin router with logger and recovery
	router := gin.Default()

	// create API route group
	api := router.Group("/api/v1")
	{
		api.GET("/hello", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{"msg": "Hello, World!"})
		})
	}

	router.Run(":7070")
}
