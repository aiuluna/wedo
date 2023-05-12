import typescript from '@rollup/plugin-typescript'
import { getCompiler } from './rollup'

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/cjs/index.js',
		format: 'cjs',
	},
	plugins: [typescript(), getCompiler()],
}
