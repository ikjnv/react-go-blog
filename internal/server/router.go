package server

import (
	"ikjnv/react-go-blog/internal/conf"
	"ikjnv/react-go-blog/internal/store"
	"net/http"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func SetRouter(cfg conf.Config) *gin.Engine {
	router := gin.Default()
	router.RedirectTrailingSlash = true

	// serve static files to frontend in server is started in production mode
	if cfg.Env == "prod" {
		router.Use(static.Serve("/", static.LocalFile("./assets/build", true)))
	}

	api := router.Group("/api/v1")
	api.Use(customErrors)
	{
		api.POST("/signup", gin.Bind(store.User{}), SignUp)
		api.POST("/signin", gin.Bind(store.User{}), SignIn)
		api.GET("/posts", fetchAll)
		api.POST("/upload", fileUpload)
		api.GET("/posts/:id", getPost)
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
