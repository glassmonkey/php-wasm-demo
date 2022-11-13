PHP_7.4_BRANCH     ?=php-7.4.33

dist/main.js: src ext/php7.4-src
	docker run \
	  --rm \
	  -v $(PWD)/src:/src \
	  -v $(PWD)/dist:/dist \
	  emscripten/emsdk \
	  emcc main.cpp -o /dist/main.js  -s NO_EXIT_RUNTIME=1 -s "EXPORTED_RUNTIME_METHODS=['ccall']"

dist/debug.html: src
	docker run \
	  --rm \
	  -v $(PWD)/src:/src \
	  -v $(PWD)/dist:/dist \
	  emscripten/emsdk \
	  emcc main.cpp -o /dist/debug.html  -s NO_EXIT_RUNTIME=1 -s "EXPORTED_RUNTIME_METHODS=['ccall']"

ext/php7.4-src:
	git clone https://github.com/php/php-src.git ext/php7.4-src \
		--branch ${PHP_7.4_BRANCH}   \
		--single-branch          \
		--depth 1

.PHONY: build
build: dist/main.js
	cp dist/main.js public/main.js
	cp dist/main.wasm public/main.wasm

clean:
	rm -fR ext/php*