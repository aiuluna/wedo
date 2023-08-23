import typescript from '@rollup/plugin-typescript'
import getCompare from './rollup.babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
	input: 'src/main.ts',
	output: {
		file: 'lib/index.js',
		format: 'cjs',
    sourcemap: true,
	},
	plugins: [
		typescript(),
		resolve({
      modulesOnly: true
    }),
		json(),
		commonjs({
			namedExports: {
				'node_modules/chalk/source/index.js': 'chalk',
			},
		}),
		getCompare(),
    sourcemaps()
	],
}
