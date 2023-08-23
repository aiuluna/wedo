import babel from '@rollup/plugin-babel'

export default function getCompare(opt) {
	return babel({
		// babelHelpers: 'runtime',
		babelrc: false,
		extensions: ['.ts', '.js'],
		presets: [
			[
				'@babel/preset-env',
				{
					targets: {
						node: '0.12',
					},
					// modules: '',
					loose: true, // 松散模式，如果有js的奇怪特性代码，就设置为false
					// useBuiltIns: 'usage',
				},
			],
			'@babel/preset-typescript',
		],
		// plugins: [
		// 	[
		// 		'@babel/plugin-transform-runtime',
		// 		{
		// 			corejs: 3,
		// 		},
		// 	],
		// ],
		exclude: 'node_modules/**',
	})
}
