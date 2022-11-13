#include <iostream>
#include "wasm.h"

int main() {
    std::cout << "Hello, World! in console" << std::endl;
    return 0;
}

EXTERN EMSCRIPTEN_KEEPALIVE void myFunction(int argc, char ** argv) {
    printf("MyFunction Called\n");
}
