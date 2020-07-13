install: install-deps

start:
	node bin/gendiff.js

install-deps:
	npm ci

# install: 
# 	npm install

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test