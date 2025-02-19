UNAME = $(shell uname -s)

green := \033[32m
yellow := \033[33m
reset := \033[0m
red := \033[31m

ifeq ($(UNAME), Darwin)
	DOCKER_COMPOSE = sudo docker-compose
else
	DOCKER_COMPOSE = sudo docker compose
endif

all: up

up:
	@echo "$(yellow)===============================$(reset)"
	@echo "$(yellow)======= Building images =======$(reset)"
	@echo "$(yellow)===============================$(reset)"
	@${DOCKER_COMPOSE} up --build
	@echo "$(yellow)=========================================$(reset)"
	@echo "$(yellow)======= Images build successfully =======$(reset)"
	@echo "$(yellow)=========================================$(reset)"

up_background: npm
	@echo "$(green)==================================$(reset)"
	@echo "$(green)======= Lifting containers =======$(reset)"
	@echo "$(green)==================================$(reset)"
	@${DOCKER_COMPOSE} up  --build -d
	@echo "$(green)================================$(reset)"
	@echo "$(green)======= Containers ready =======$(reset)"
	@echo "$(green)================================$(reset)"

down:
	@echo "$(red)===================================$(reset)"
	@echo "$(red)======= Dropping containers =======$(reset)"
	@echo "$(red)===================================$(reset)"
	@${DOCKER_COMPOSE} down
	@echo "$(red)===============================================$(reset)"
	@echo "$(red)======= Containers dropped successfully =======$(reset)"
	@echo "$(red)===============================================$(reset)"

hard_down:
	@echo "$(red)===============================================$(reset)"
	@echo "$(red)======= Dropping containers and volumes =======$(reset)"
	@echo "$(red)===============================================$(reset)"
	@${DOCKER_COMPOSE} down -v
	@echo "$(red)===========================================================$(reset)"
	@echo "$(red)======= Containers and volumes dropped successfully =======$(reset)"
	@echo "$(red)===========================================================$(reset)"

start:
	@echo "$(green)===================================$(reset)"
	@echo "$(green)======= Starting containers =======$(reset)"
	@echo "$(green)===================================$(reset)"
	@${DOCKER_COMPOSE} start
	@echo "$(green)==================================$(reset)"
	@echo "$(green)======= Containers started =======$(reset)"
	@echo "$(green)==================================$(reset)"


stop:
	@echo "$(red)===================================$(reset)"
	@echo "$(red)======= Stopping containers =======$(reset)"
	@echo "$(red)===================================$(reset)"
	@${DOCKER_COMPOSE} stop
	@echo "$(red)==================================$(reset)"
	@echo "$(red)======= Containers stopped =======$(reset)"
	@echo "$(red)==================================$(reset)"

remove_all: hard_down
	@sudo docker system prune -a
	@if [ -n "$(shell docker images -q)" ]; then \
    		docker rmi -f $(shell docker images -q); \
    	else \
    		echo "No images to delete."; \
	fi

re: remove_all up

info:
	docker system df


npm:
	cat .env.example > .env && cat notification-service/.env.example > notification-service/.env && cat app-service/.env.example > app-service/.env
	sudo rm -rf app-service/dist
	sudo rm -rf app-service/node_modules
	sudo rm -rf notification-service/dist
	sudo rm -rf notification-service/node_modules
	npm install --prefix app-service
	npm install --prefix notification-service
	npm i -C app-service
	npm i -C notification-service

.PHONY: all up up_background down hard_down start stop remove_all re info npm