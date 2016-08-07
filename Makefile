build: node_modules
	npm run postinstall
build-production: node_modules
	npm run bundle-production
node_modules:
	npm -s install
test: node_modules
	npm test
start:
	npm start
watch: node_modules
	npm run watch
.PHONY: test watch
