package server

import (
	"ikjnv/react-go-blog/internal/store"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func createPost(ctx *gin.Context) {
	post := new(store.Post)

	if err := ctx.Bind(post); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := currentUser(ctx)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := store.AddPost(user, post); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"msg": "Post create successfully", "data": post})
}

func indexPosts(ctx *gin.Context) {
	user, err := currentUser(ctx)

	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := store.FetchUserPosts(user); err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"msg":  "Posts fetched successfully",
		"data": user.Posts,
	})
}

// file upload
func fileUpload(ctx *gin.Context) {
	file, err := ctx.FormFile("file")

	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error while uploading file": err.Error()})
		return
	}

	dir, err := os.Getwd()
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := ctx.SaveUploadedFile(file, dir+"/"+file.Filename); err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"message": "Unable to save the file"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "The file has been successfully saved!"})
}

// fetch all posts
func fetchAll(ctx *gin.Context) {
	posts := new(store.Posts)

	if err := ctx.Bind(posts); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	posts, err := store.FetchAllPosts()
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"Error while fetching all posts\nError:": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"msg":   "Fetched all posts",
		"posts": posts,
	})
}

func updatePost(ctx *gin.Context) {
	jsonPost := new(store.Post)

	if err := ctx.Bind(jsonPost); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := currentUser(ctx)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	dbPost, err := store.FetchPost(jsonPost.ID)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if user.ID != dbPost.UserID {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	jsonPost.ModifiedAt = time.Now()
	if err := store.UpdatePost(jsonPost); err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"msg": "Post updated successfully", "data": jsonPost})
}

func getPost(ctx *gin.Context) {
	paramID := ctx.Param("id")
	id, err := strconv.Atoi(paramID)

	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Not valid ID"})
		return
	}

	post, err := store.FetchPost(id)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"msg":  "Success",
		"data": post,
	})
}

func deletePost(ctx *gin.Context) {
	paramID := ctx.Param("id")
	id, err := strconv.Atoi(paramID)

	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Not valid ID"})
		return
	}

	user, err := currentUser(ctx)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	post, err := store.FetchPost(id)
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if user.ID != post.UserID {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if err := store.DeletePost(post); err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"msg": "Post deleted successfully"})
}
