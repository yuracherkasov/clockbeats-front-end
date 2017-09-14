const path = require('path');

const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HMRPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

//=========================================================
//  VARS
//---------------------------------------------------------
const NODE_ENV = process.env.NODE_ENV;
const DEVELOPMENT = NODE_ENV === 'development';
const PRODUCTION = NODE_ENV === 'production';

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || '3000';

//=========================================================
//  LOADERS
//---------------------------------------------------------
const rules = {
	js: {
		test: /\.js$/,
		exclude: /(node_modules(?!\/rxjs))/,
		loader: 'babel-loader',
	},

	json: {
		test: /\.json$/,
		loader: 'json-loader',
	},

	css: {
		test: /\.css$/,
		loader: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: ['css-loader', 'resolve-url-loader', 'postcss-loader'],
		}),
	},

	scss: {
		test: /\.scss$/,
		loader: ExtractTextPlugin.extract({
			fallback: 'style-loader',
			use: ['css-loader', 'resolve-url-loader', 'postcss-loader', 'sass-loader'],
		}),
	},

	fonts: {
		test: /\.(eot|svg|ttf|woff|woff2)$/,
		loader: 'file-loader',
		query: {
			name: `[name].[ext]`,
			publicPath: '/assets/fonts/',
		}
	},

	images: {
		test: /\.(svg|png|jpg|jpeg|gif)$/,
		loader: 'file-loader',
		query: {
			limit: 10000,
			name: `[name].[ext]`,
			publicPath: '/assets/images/',
		}
	}
};

//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = {};

config.entry = {
	polyfills: ['babel-polyfill', './src/application/polyfills.js'],
	main: ['./src/application/index.js'],
};

config.output = {
	filename: 'assets/js/[name].js',
	path: path.resolve('./dist'),
	publicPath: '/',
};

config.resolve = {
	extensions: ['.js', '.json'],
	modules: [
		path.resolve('./src'),
		'node_modules',
	]
};

config.module = {
	rules: [
		rules.js,
		rules.css,
		rules.json,
		rules.scss,
		rules.fonts,
		rules.images,
	]
};

config.plugins = [
	new LoaderOptionsPlugin({
		debug: !PRODUCTION,
		cache: !PRODUCTION,
		minimize: PRODUCTION,
		options: {
			postcss: [
				autoprefixer({
					browsers: ['last 3 versions'],
				})
			],
			sassLoader: {
				outputStyle: PRODUCTION ? 'compressed' : 'expanded',
				precision: 10,
				sourceComments: false,
				sourceMap: PRODUCTION,
			},
			cssLoader: {
				minimize: true,
				sourceMap: true,
			}
		}
	}),
	new DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
	}),
	new OccurrenceOrderPlugin(true),
	new NamedModulesPlugin(),
	new CommonsChunkPlugin({
		name: 'polyfills',
		chunks: ['polyfills'],
	}),
	// This enables tree shaking of the vendors modules
	new CommonsChunkPlugin({
		name: 'vendor',
		chunks: ['main'],
		minChunks: module => /node_modules/.test(module.resource),
	}),
	new CommonsChunkPlugin({
		name: ['polyfills', 'vendor'].reverse(),
	}),
	new CopyWebpackPlugin([
		{
			from: './src/assets',
			to: 'assets',
			ignore: ['**/*.scss'],
		}
	]),
	new ExtractTextPlugin({
		filename: 'assets/css/[name].css',
		disable: !PRODUCTION,
		allChunks: true,
	}),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		hash: false,
		inject: 'body',
		chunksSortMode: 'dependency',
		template: './src/index.html',
	})
];


//=====================================
//  DEVELOPMENT
//-------------------------------------
if (DEVELOPMENT) {
	config.devtool = 'cheap-module-source-map';

	config.entry.main.unshift(
		'react-hot-loader/patch',
		`webpack-dev-server/client?http://${HOST}:${PORT}`,
		'webpack/hot/only-dev-server',
	);

	config.plugins.push(
		new HMRPlugin(),
		new ProgressPlugin(),
	);

	config.devServer = {
		contentBase: path.resolve(__dirname, 'dist'),
		historyApiFallback: true,
		host: HOST,
		hot: true,
		port: PORT,
		stats: {
			cached: true,
			cachedAssets: true,
			children: false,
			chunks: false,
			chunkModules: false,
			colors: true,
			modules: false,
			hash: false,
			reasons: true,
			timings: true,
			version: false,
		}
	};
}


//=====================================
//  PRODUCTION
//-------------------------------------
if (PRODUCTION) {
	config.devtool = 'hidden-source-map';

	config.plugins.push(
		new WebpackMd5Hash(),
		new UglifyJsPlugin({
			sourceMap: true,
			comments: false,
			beautify: false,
			compress: {
				unused: true,
				dead_code: true,
				screw_ie8: true,
				warnings: false,
			},
			mangle: {
				screw_ie8: true,
				keep_fnames: true,
			},
			output: {
				comments: false,
				screw_ie8: true
			},
		})
	);
}

module.exports = config;