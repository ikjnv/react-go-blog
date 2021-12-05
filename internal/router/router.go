package router

import (
	"github.com/gin-gonic/gin"
)

func SetRouter() *gin.Engine {
	router := gin.Default()

	api := router.Group("/api/v1")
	{
		api.GET("/hello", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{"msg": "Hello, World!"})
		})

		// sign up and sign in go below
	}

	return router
}
