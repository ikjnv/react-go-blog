package server

import (
	"ikjnv/react-go-blog/internal/store"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SignUp(ctx *gin.Context) {
	user := ctx.MustGet(gin.BindKey).(*store.User)
	if err := store.AddUser(user); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	ctx.JSON(http.StatusOK, gin.H{
		"msg": "Signed up successfully",
		"jwt": generateJWT(user),
	})
}

func SignIn(ctx *gin.Context) {
	user := new(store.User)

	if err := ctx.Bind(user); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := store.Authenticate(user.Username, user.Password)

	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"msg":      "Signed in successfully",
		"username": user.Username,
		"jwt":      generateJWT(user),
	})
}
