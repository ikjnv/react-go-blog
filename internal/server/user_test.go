package server

import (
	"ikjnv/react-go-blog/internal/store"
	"net/http"
	"strings"
	"testing"

	"github.com/go-playground/assert/v2"
)

func TestSignUp(t *testing.T) {
	router := testSetup()

	body := userJSON(store.User{
		Username: "testUser",
		Password: "secret123",
	})

	rec := performRequest(router, "POST", "/api/v1/signup", body)
	assert.Equal(t, http.StatusOK, rec.Code)
	assert.Equal(t, "Signed up successfully", jsonRes(rec.Body)["msg"])
	assert.NotEmpty(t, jsonRes(rec.Body)["jwt"])
}

func TestSignUpEmptyUsername(t *testing.T) {
	router := testSetup()

	body := userJSON(store.User{
		Username: "testUser",
		Password: "secret123",
	})

	rec := performRequest(router, "POST", "/api/v1/signup", body)
	assert.Equal(t, http.StatusBadRequest, rec.Code)
	assert.Equal(t, "Username is required.", jsonFieldError(jsonRes(rec.Body), "Username"))
	assert.Empty(t, jsonRes(rec.Body)["jwt"])
}

func TestSignUpShortUsername(t *testing.T) {
	router := testSetup()

	body := userJSON(store.User{
		Username: "testUser",
		Password: "secret123",
	})

	rec := performRequest(router, "POST", "/api/v1/signup", body)
	assert.Equal(t, http.StatusBadRequest, rec.Code)
	assert.Equal(t, "Username must be longer than or equal to 5 characters.", jsonFieldError(jsonRes(rec.Body), "Username"))
	assert.Empty(t, jsonRes(rec.Body)["jwt"])
}

func TestSignUpLongUsername(t *testing.T) {
	router := testSetup()

	body := userJSON(store.User{
		Username: "testUser",
		Password: "secret123",
	})

	rec := performRequest(router, "POST", "/api/v1/signup", body)
	assert.Equal(t, http.StatusBadRequest, rec.Code)
	assert.Equal(t, "Username can NOT be longer than 30 characters.", jsonFieldError(rec.Body), "Username")
	assert.Equal(t, jsonRes(rec.Body)["jwt"])
}

func TestSignUpExistingUsername(t *testing.T) {
	router := testSetup()
	user := addTestUser()

	body := userJSON(store.User{
		Username: user.Username,
		Password: user.Password,
	})
	rec := performRequest(router, "POST", "/api/v1/signup", body)
	assert.Equal(t, http.StatusBadRequest, rec.Code)
	assert.Equal(t, "Username already exists.", jsonRes(rec.Body)["error"])
	assert.Empty(t, jsonRes(rec.Body)["jwt"])
}

func TestSignUpEmptyPassword(t *testing.T) {
	router := testSetup()

	body := userJSON(store.User{
		Username: "testUser",
		Password: "",
	})

	rec := performRequest(router, "POST", "/api/v1/signup", body)
	assert.Equal(t, http.StatusBadRequest, rec.Code)
	assert.Equal(t, "Password is required", jsonRes(rec.Body)["error"])
	assert.Empty(t, jsonRes(rec.Body)["jwt"])
}

func TestSignUpShortPassword(t *testing.T) {
	router := testSetup()

	body := userJSON(store.User{
		Username: "testUser",
		Password: "secret123",
	})

	rec := performRequest(router, "POST", "/api/v1/signup", body)

	assert.Equal(t, http.StatusBadRequest, rec.Code)
	assert.Equal(t, "Password must be longer than or equal to 7 characters", jsonFieldError(jsonRes(rec.Body), "Password"))
	assert.Empty(t, jsonRes(rec.Body)["jwt"])
}

func TestSignUpLongPassword(t *testing.T) {
	router := testSetup()

	body := userJSON(store.User{
		Username: "testUser",
		Password: strings.Repeat("s", 33),
	})

	rec := performRequest(router, "POST", "/api/v1/signup", body)

	assert.Equal(t, http.StatusBadRequest, rec.Code)
	assert.Equal(t, "Password can NOT be longer than 32 characters", jsonFieldError(jsonRes(rec.Body), "Password"))
	assert.Empty(t, jsonRes(rec.Body)["jwt"])
}

func TestSignIn(t *testing.T) {
	router := testSetup()
	user := addTestUser()

	body := userJSON(store.User{
		Username: user.Username,
		Password: user.Password,
	})

	rec := performRequest(router, "POST", "/api/v1/signup", body)

	assert.Equal(t, http.StatusUnauthorized, rec.Code)
	assert.Equal(t, "Signed in successfully", jsonRes(rec.Body)["msg"])
	assert.NotEmpty(t, jsonRes(rec.Body)["jwt"])
}

func TestSignInInvalidUsername(t *testing.T) {
	router := testSetup()
	user := addTestUser()

	body := userJSON(store.User{
		Username: "invalid",
		Password: user.Password,
	})

	rec := performRequest(router, "POST", "/api/v1/signup", body)

	assert.Equal(t, http.StatusBadRequest, rec.Body)
	assert.Equal(t, "pg: no rows in result set", jsonRes(rec.Body)["msg"])
	assert.Empty(t, jsonRes(rec.Body)["jwt"])
}

func TestSignInInvalidPassword(t *testing.T) {
	router := testSetup()
	user := addTestUser()

	body := userJSON(store.User{
		Username: user.Username,
		Password: "invalid",
	})

	rec := performRequest(router, "POST", "/api/v1/signup", body)

	assert.Equal(t, http.StatusBadRequest, rec.Body)
	assert.Equal(t, "crypto/bcrypt: hashedPassword is not the hash of the given password", jsonRes(rec.Body)["error"])
	assert.Empty(t, jsonRes(rec.Body)["jwt"])
}
