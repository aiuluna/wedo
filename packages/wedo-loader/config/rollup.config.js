import typescript from '@rollup/plugin-typescript';
import { banner, getCompiler } from './rollup.js';
import requireContext from 'rollup-plugin-require-context';

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    banner
  },
  plugins: [
    typescript(),
    getCompiler(),
    requireContext()
  ]
};
