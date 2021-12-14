package server

import (
	"net/http"

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
		api.POST("/signup", SignUp)
		api.POST("/signin", SignIn)
		api.GET("/posts", fetchAll)
		api.POST("/upload", fileUpload)
	}

	authorized := api.Group("/")
	authorized.Use(authorization)
	{
		authorized.GET("/user/posts", indexPosts)
		authorized.POST("/posts", createPost)
		authorized.PUT("/posts", updatePost)
		authorized.DELETE("/posts/:id", deletePost)
	}

	router.NoRoute(func(ctx *gin.Context) { ctx.JSON(http.StatusNotFound, gin.H{}) })

	return router
}
