import typescript from '@rollup/plugin-typescript';
import { banner, getCompiler } from './rollup.js';

export default {
  input: 'src/index.ts',
  output: {
    file: 'es/index.js',
    format: 'es',
    banner
  },
  plugins: [
    typescript(),
    getCompiler(),
  ]
};
