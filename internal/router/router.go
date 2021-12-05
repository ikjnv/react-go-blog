package router

import (
	"ikjnv/react-go-blog/internal/user"

	"github.com/gin-gonic/gin"
)

func SetRouter() *gin.Engine {
	router := gin.Default()

	router.RedirectTrailingSlash = true

	api := router.Group("/api/v1")
	{
		api.GET("/hello", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{"msg": "Hello, World!"})
		})

		api.POST("/signup", user.SignUp)

		api.POST("/signin", user.SignIn)
	}

	return router
}
