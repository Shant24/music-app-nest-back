APP_NAME=music-app-nest-back
DOCKERFILE=./Dockerfile
BUILD_DIR=./
PORT=7002
NETWORK=apps-network
PWD=$(shell pwd)

.PHONY: build run log stop rm-container rm-image clear

# Build the Docker image
build:
	docker rmi $(APP_NAME) || true
	docker build -t $(APP_NAME) ${BUILD_DIR} -f $(DOCKERFILE)

# Start a Docker container
run:
	docker run -d --rm --name $(APP_NAME) --network $(NETWORK) -p $(PORT):3000 -v "$(PWD)/../static-datas:/app/static-datas" $(APP_NAME)

# Show a Docker logs
log:
	docker logs $(APP_NAME) || true

# Stop the Docker container
stop:
	docker stop $(APP_NAME) || true

# Remove the Docker container
rm-container:
	docker rm $(APP_NAME) || true

# Remove the Docker image
rm-image:
	docker rmi $(APP_NAME) || true

# Stop, remove container and image
clear: stop rm-container rm-image
