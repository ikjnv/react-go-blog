package server

import (
	"fmt"
	"ikjnv/react-go-blog/internal/conf"
	"ikjnv/react-go-blog/internal/store"
	"log"
	"time"

	"github.com/cristalhq/jwt/v3"
)

var (
	jwtSigner   jwt.Signer
	jwtVerifier jwt.Verifier
)

func jwtSetup(conf conf.Config) {
	var err error
	key := []byte(conf.JwtSecret)

	jwtSigner, err = jwt.NewSignerHS(jwt.HS256, key)
	if err != nil {
		fmt.Println("Error creating JWT signer")
		log.Panic(err)
	}

	jwtVerifier, err = jwt.NewVerifierHS(jwt.HS256, key)
	if err != nil {
		fmt.Println("Error creating JWT verifier")
		log.Panic(err)
	}
}

func generateJWT(user *store.User) string {
	claims := &jwt.RegisteredClaims{
		ID:        fmt.Sprint(user.ID),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24 * 7)),
	}

	builder := jwt.NewBuilder(jwtSigner)
	token, err := builder.Build(claims)
	if err != nil {
		fmt.Println("Error building JWT")
	}
	return token.String()
}
