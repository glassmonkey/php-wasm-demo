export { PHP, startPHP } from './php';
export type {
	PHPOutput,
	PHPRequest,
	PHPResponse,
	JavascriptRuntime,
	ErrnoError,
} from './php';

import PHPServer from './php-server';
export { PHPServer };
export type { PHPServerConfigation, PHPServerRequest } from './php-server';

import PHPBrowser from './php-browser';
export { PHPBrowser };

export { DEFAULT_BASE_URL, getPathQueryFragment } from '../php-wasm/utils';

import PHP_JS_HASH from '../../public/php-8.2'
/**
 * Hash of the emscripten-compiled php.js file. Used for cache busting in
 * web browsers.
 *
 * @public
 */
export const phpJsHash = PHP_JS_HASH;
