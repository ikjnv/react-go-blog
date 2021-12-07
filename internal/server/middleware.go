package server

import (
	"errors"
	"ikjnv/react-go-blog/internal/store"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

func authorization(ctx *gin.Context) {
	authHeader := ctx.GetHeader("Authorization")

	if authHeader == "" {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
		return
	}

	headerParts := strings.Split(authHeader, " ")
	if len(headerParts) != 2 {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header format is not valid"})
		return
	}

	if headerParts[0] != "Bearer" {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is missing Bearer part"})
		return
	}

	userID, err := verifyJWT(headerParts[1])
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	user, err := store.FetchUser(userID)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	ctx.Set("user", user)
	ctx.Next()
}

func currentUser(ctx *gin.Context) (*store.User, error) {
	var err error
	_user, exists := ctx.Get("user")

	if !exists {
		err = errors.New("Current context user is not set")
		log.Error().Err(err).Msg("")
		return nil, err
	}

	user, ok := _user.(*store.User)
	if !ok {
		log.Error().Err(err).Msg("")
		return nil, err
	}

	return user, nil
}
