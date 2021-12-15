package server

import (
	"bytes"
	"encoding/json"
	"ikjnv/react-go-blog/internal/conf"
	"ikjnv/react-go-blog/internal/store"
	"log"
	"net/http"
	"net/http/httptest"
	"strings"

	"github.com/gin-gonic/gin"
)

func testSetup() *gin.Engine {
	gin.SetMode(gin.TestMode)
	store.ResetTestDatabase()
	cfg := conf.NewConfig("dev")
	jwtSetup(cfg)
	return SetRouter(cfg)
}

func userJSON(user store.User) string {
	body, err := json.Marshal(map[string]interface{}{
		"Username": user.Username,
		"Password": user.Password,
	})
	if err != nil {
		log.Panic("Error marshalling JSON body")
	}
	return string(body)
}

func jsonRes(body *bytes.Buffer) map[string]interface{} {
	jsonValue := &map[string]interface{}{}
	err := json.Unmarshal(body.Bytes(), jsonValue)
	if err != nil {
		log.Panic("Error unmarshalling JSON body")
	}
	return *jsonValue
}

func performRequest(router *gin.Engine, method, path, body string) *httptest.ResponseRecorder {
	req, err := http.NewRequest(method, path, strings.NewReader(body))
	if err != nil {
		log.Panic("Error creating new request")
	}
	rec := httptest.NewRecorder()
	req.Header.Add("Content-Type", "application/json")
	router.ServeHTTP(rec, req)
	return rec
}
