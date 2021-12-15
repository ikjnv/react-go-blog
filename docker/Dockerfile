FROM node:14 AS frontendBuilder

WORKDIR /react-go-blog

COPY assets/ .

WORKDIR /react-go-blog/assets
RUN npm install
RUN npm run build

FROM golang:1.17.1 AS backendBuilder

WORKDIR /go/src/react-go-blog

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o app/app app/main.go
RUN CGO_ENABLED=0 GOOS=linux go build -o migrations/migrations migrations/*.go

FROM alpine:3.14

RUN addgroup -S deploy && adduser -S deploy -G deploy

ARG ROOT_DIR=/home/deploy/react-go-blog

WORKDIR ${ROOT_DIR}

RUN chown deploy:deploy ${ROOT_DIR}

COPY --from=frontendBuilder --chown=deploy:deploy /react-go-blog/build ./assets/build

COPY --from=backendBuilder --chown=deploy:deploy /go/src/react-go-blog/migrations/migrations ./migrations/
COPY --from=backendBuilder --chown=deploy:deploy /go/src/react-go-blog/app/app .

USER deploy

CMD [ "./react-go-blog", "-env", "prod" ]
