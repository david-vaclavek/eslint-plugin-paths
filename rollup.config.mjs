import copy from 'rollup-plugin-copy';
import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';

export default [
	{
		input: 'src/index.ts',
		output: {
			dir: 'dist',
			format: 'cjs',
		},
		plugins: [
			typescript(),
			copy({
				targets: [
					{
						src: 'LICENSE',
						dest: 'dist',
					},
					{
						src: 'CHANGELOG',
						dest: 'dist',
					},
					{
						src: 'README.md',
						dest: 'dist',
					},
					{
						src: 'package.json',
						dest: 'dist',
						transform(content) {
							const ignoredProps = ['devDependencies', 'scripts'];

							const json = JSON.parse(content.toString());
							return JSON.stringify(
								{
									...Object.fromEntries(
										Object.entries(json).filter(
											([key]) => !ignoredProps.includes(key),
										),
									),
									main: 'index.js',
								},
								null,
								4,
							);
						},
					},
				],
			}),
		],
	},
	{
		// Generate declaration file
		input: 'src/index.ts',
		output: {
			file: 'dist/index.d.ts',
			format: 'cjs',
		},
		plugins: [dts()],
	},
];
