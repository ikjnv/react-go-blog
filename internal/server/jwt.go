package server

import (
	"encoding/json"
	"errors"
	"fmt"
	"ikjnv/react-go-blog/internal/conf"
	"ikjnv/react-go-blog/internal/store"
	"log"
	"strconv"
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

func verifyJWT(tokenStr string) (int, error) {
	token, err := jwt.Parse([]byte(tokenStr))

	if err != nil {
		fmt.Println("Error parsing token")
		return 0, err
	}

	if err := jwtVerifier.Verify(token.Payload(), token.Signature()); err != nil {
		fmt.Println("Error verifying token")
		return 0, err
	}

	var claims jwt.StandardClaims
	if err := json.Unmarshal(token.RawClaims(), &claims); err != nil {
		fmt.Println("Error unmarshalling JWT claims")
		return 0, err
	}

	if notExpired := claims.IsValidAt(time.Now()); !notExpired {
		return 0, errors.New("Token expired.")
	}

	id, err := strconv.Atoi(claims.ID)
	if err != nil {
		fmt.Println("Error converting claimds ID to number")
		return 0, errors.New("ID in token is not valid")
	}

	return id, err
}
