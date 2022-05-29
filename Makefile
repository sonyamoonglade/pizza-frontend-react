build:
	docker build -t zharpizza-front .
push-h:
	heroku container:push web --app zharpizza-front
release-h:
	heroku container:release web --app zharpizza-front

open-h:
	heroku open --app zharpizza-front

logs-h:
	heroku logs --tail --app zharpizza-front

unrelease-h:
	heroku container:rm web --app zharpizza-front

deploy:
	heroku container:login && $(MAKE) build && $(MAKE) push-h && $(MAKE) release-h