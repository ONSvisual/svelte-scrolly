import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default [
	{
		input: 'src/main.js',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'app',
			file: 'public/build/bundle.js'
		},
		plugins: [
			svelte({
				// enable run-time checks when not in production
				dev: !production,
				// we'll extract any component CSS out into
				// a separate file - better for performance
				css: css => {
					css.write('bundle.css');
				}
			}),
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),

			// In dev mode, call `npm run start` once
			// the bundle has been generated
			!production && serve(),

			// Watch the `public` directory and refresh the
			// browser on changes when not in production
			!production && livereload('public'),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser()
		],
		watch: {
			clearScreen: false
		}
	},
	{
		// Output legacy code bundle for ES5 / IE11 / Chromium 59 support
		input: 'src/main.js',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'app',
			file: 'public/build/bundle.legacy.js'
		},
		plugins: [
			svelte({
				dev: false,
				//output in legacy mode ES5 compatible) to support IE11
				legacy: true
			}),
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),

			// compile to ES 2015 in oder to support IE11 & Chromium 59+
			babel({
				extensions: ['.js', '.mjs', '.html', '.svelte'],
				runtimeHelpers: true,
				exclude: [
					'node_modules/@babel/**',
					'node_modules/core-js/**',
					'node_modules/mapbox-gl/**'
				],
				presets: [
					[
						'@babel/preset-env',
						{
							targets: {
								ie: '11',
								chrome: '59',
							},
							useBuiltIns: 'usage',
							corejs: 3
						}
					]
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					[
						'@babel/plugin-transform-runtime',
						{
							useESModules: true
						}
					]
				]
			}),
			terser()
		],
		watch: {
			clearScreen: false
		}
	}
].slice(0, production ? 2 : 1);