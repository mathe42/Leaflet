// Config file for running Rollup in "normal" mode (non-watch)

import rollupGitVersion from 'rollup-plugin-git-version'
import json from 'rollup-plugin-json'
import gitRev from 'git-rev-sync'
import pkg from '../package.json'
import esbuild from 'rollup-plugin-esbuild'
import buble from '@rollup/plugin-buble';

let { version } = pkg;
let release;

// Skip the git branch+rev in the banner when doing a release build
if (process.env.NODE_ENV === 'release') {
	release = true;
} else {
	release = false;
	const branch = gitRev.branch();
	const rev = gitRev.short();
	version += '+' + branch + '.' + rev;
}

const banner = `/* @preserve
 * Leaflet ${version}, a JS library for interactive maps. http://leafletjs.com
 * (c) 2010-2021 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */
`;

const outro = `var oldL = window.L;
exports.noConflict = function() {
	window.L = oldL;
	return this;
}

// Always export us to window global (see #2364)
window.L = exports;`;


const releasePlugin = release ? json() : rollupGitVersion()

const minify = false

export default [
	{
		input: 'src/Leaflet.js',
		output: [
			{
				file: 'dist/leaflet-src.esm.js',
				format: 'es',
				banner: banner,
				sourcemap: true,
				freeze: false
			}
		],
		plugins: [
			releasePlugin,
			esbuild({
				target: 'es2017',
				minify: minify,
				minifyIdentifiers: minify,
				minifySyntax: minify,
				minifyWhitespace: minify
			})
		]
	},
	{
		input: 'src/Leaflet.js',
		output: [
			{
				file: 'dist/leaflet-es6.js',
				format: 'es',
				sourcemap: true,
				freeze: false
			}
		],
		plugins: [
			releasePlugin,
			esbuild({
				target: 'es6',
				minify: minify,
				minifyIdentifiers: minify,
				minifySyntax: minify,
				minifyWhitespace: minify
			})
		]
	},
	{
		input: 'dist/leaflet-es6.js',
		output: {
			file: pkg.main,
			format: 'umd',
			name: 'L',
			banner: banner,
			outro: outro,
			sourcemap: true,
			freeze: false
		},
		plugins: [
			buble()
		]
	}
];



// export default {
// 	input: 'src/Leaflet.js',
// 	output: [
// 		{
// 			file: pkg.main,
// 			format: 'umd',
// 			name: 'L',
// 			banner: banner,
// 			outro: outro,
// 			sourcemap: true,
// 			legacy: true, // Needed to create files loadable by IE8
// 			freeze: false
// 		},
// 		{
// 			file: 'dist/leaflet-src.esm.js',
// 			format: 'es',
// 			banner: banner,
// 			sourcemap: true,
// 			freeze: false
// 		}
// 	],
// 	plugins: [
// 		release ? json() : rollupGitVersion()
// 	]
// };
