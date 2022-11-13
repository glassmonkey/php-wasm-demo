dist/main.js: src
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


.PHONY: build
build: dist/main.js
	cp dist/main.js public/main.js
	cp dist/main.wasm public/main.wasm