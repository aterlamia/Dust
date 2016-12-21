CURRENT_DIRECTORY := $(shell pwd)

start:
	docker-compose up -d

stop:
	docker-compose stop

status:
	docker-compose ps

ssh:
	docker exec -i -t  dust_web_1 /bin/zsh

restart:
	docker-compose stop web
	docker-compose start web

.PHONY: start stop status ssh restart
