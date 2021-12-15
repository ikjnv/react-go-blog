package server

import (
	"errors"
	"fmt"
	"ikjnv/react-go-blog/internal/store"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
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

func customErrors(c *gin.Context) {
	c.Next()
	if len(c.Errors) > 0 {
		for _, err := range c.Errors {
			switch err.Type {
			case gin.ErrorTypePublic:
				if !c.Writer.Written() {
					c.AbortWithStatusJSON(c.Writer.Status(), gin.H{"error": err.Error()})
				}
			case gin.ErrorTypeBind:
				errMap := make(map[string]string)
				if errs, ok := err.Err.(validator.ValidationErrors); ok {
					for _, fieldErr := range []validator.FieldError(errs) {
						errMap[fieldErr.Field()] = customValidationError(fieldErr)
					}
				}

				status := http.StatusBadRequest
				if c.Writer.Status() != http.StatusOK {
					status = c.Writer.Status()
				}
				c.AbortWithStatusJSON(status, gin.H{"error": errMap})
			default:
				log.Error().Err(err.Err).Msg("Other error")
			}
		}

		if !c.Writer.Written() {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": InternalServerError})
		}
	}
}

func customValidationError(err validator.FieldError) string {
	switch err.Tag() {
	case "required":
		return fmt.Sprintf("%s is required.", err.Field())
	case "min":
		return fmt.Sprintf("%s must be longer than or equal to %s characters.", err.Field(), err.Param())
	case "max":
		return fmt.Sprintf("%s can NOT be longer than %s characters.", err.Field(), err.Param())
	default:
		return err.Error()
	}
}
