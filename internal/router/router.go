package router

import (
	"ikjnv/react-go-blog/internal/user"

	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func SetRouter() *gin.Engine {
	router := gin.Default()

	router.Use(CORSMiddleware())

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
