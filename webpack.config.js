const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const webpackConfig = {
	mode: process.env.NODE_ENV || 'development',
	entry: {
		main: './src/main.js',
	},
	output: {
		path: path.join( __dirname, 'js' ),
		filename: 'front.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				],
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin( { filename: '../css/front.css' } ),
	]
};
module.exports = webpackConfig;
