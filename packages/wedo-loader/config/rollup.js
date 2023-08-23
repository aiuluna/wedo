import babel from '@rollup/plugin-babel'
import pkg from '../package.json' assert { type: "json" };

// import path from 'path'

const { name, version } = pkg;

const banner = `/*!
  * ${name} ${version}
  * Licensed under MIT
  */
`
const getCompiler = (opt) => {
  return babel({
    // babelHelpers: 'bundled',
    babelHelpers: 'runtime',
    extensions: ['.js', '.ts'],
    babelrc: false,
    presets: [
      '@babel/preset-typescript',
      ['@babel/preset-env',
        {
          targets: {
            node: '0.12'
          },
          modules: false,
          loose: true,
          // useBuiltIns: ''
        }
      ]
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 3
        }
      ]
    ],
    exclude: 'node_modules/**'
  })
}

export { banner, getCompiler }