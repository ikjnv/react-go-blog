package user

import (
	"ikjnv/react-go-blog/internal/store"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SignUp(ctx *gin.Context) {
	user := new(store.User)
	if err := ctx.Bind(user); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"err": err.Error()})
		return
	}
	store.Users = append(store.Users, user)
	ctx.JSON(http.StatusOK, gin.H{
		"msg": "Signed up successfully",
		"jwt": "12345",
	})
}

func SignIn(ctx *gin.Context) {
	user := new(store.User)
	if err := ctx.Bind(user); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"err": err.Error()})
		return
	}
	for _, u := range store.Users {
		if u.Username == user.Username && u.Password == user.Password {
			ctx.JSON(http.StatusOK, gin.H{
				"msg": "Signed in successfully",
				"jwt": "1234124",
			})
		}
	}
}
