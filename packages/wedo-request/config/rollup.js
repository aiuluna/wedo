import babel from '@rollup/plugin-babel'

const getCompiler = () => {
	return babel({
		babelHelpers: 'runtime',
		babelrc: false,
		extensions: ['.js', '.ts'],
		presets: [
			[
				'@babel/preset-env',
				{
					targets: {
						browsers: 'last 2 version,>1%,ie >= 8,Chrome >= 45,safari >= 10',
						node: '10',
					},
					modules: false,
					loose: true,
				},
			],
			[
				'@babel/preset-typescript',
				{
					allExtensions: true,
				},
			],
		],
		plugins: [
			[
				'@babel/plugin-transform-runtime',
				{
					corejs: 3,
				},
			],
			['@babel/plugin-transform-typescript'],
		],
		exclude: 'node_modules/**',
	})
}

export { getCompiler }
