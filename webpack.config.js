//@ts-check

'use strict';

const path = require('path');

const config = {
	target: 'node',
	node: {
		__dirname: false,
		__filename: false,
	},
	entry: './src/main.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'extension.js',
		libraryTarget: "commonjs2",
		devtoolModuleFilenameTemplate: "../[resource-path]",
	},
	devtool: 'source-map',
	externals: {
		vscode: "commonjs vscode" ,
		'yeoman-environment': "commonjs yeoman-environment"
	},
	resolve: { 
		extensions: ['.ts', '.js']
	},
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			use: [{
				loader: 'ts-loader',
			}
			]
		}]
	},
}

module.exports = config;