.PHONY: help init clean build

export TAG=$(shell git describe --always --tags --dirty)

NODE_ENV?=local

a: down clean build up

init: # Install js packages
	cd web && \
	npm ci

clean: ## Remove stuff
	cd web && \
	npm run clean

build: ## Build web
	cd web && \
	npm run build

up: ## Run docker
	TAG=$(shell git describe --always --tags --dirty) docker-compose up -d --build

down:
	TAG=$(shell git describe --always --tags --dirty) docker-compose down

wish:
	cd web && \
	npm run clean && \
	npm run watch

start:
	cd web && \
	npm start
