import { getCompiler } from './rollup.js';
// import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/esm/index.js',
    format: 'es',
  },
  plugins: [
    typescript(),
    getCompiler()
  ]
};
