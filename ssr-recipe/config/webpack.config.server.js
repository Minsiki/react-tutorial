const paths = require("./paths");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");
const webpackNodeExternals = require("webpack-node-externals");
const getClientEnvironment = require("./env");
const webpack = require("webpack");

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

module.exports = {
    mode: "production", // mode: production -> optimization option enable
    entry: paths.ssrIndexJs, // entry path
    target: "node", // env -> node
    output: {
        path: paths.ssrBuild, // build path
        filename: "server.js", // filename
        chunkFilename: "js/[name].chunk.js", // chunk filename
        publicPath: paths.publicUrlOrPath, // dynamic file path
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)/,
                        include: paths.appSrc,
                        loader: require.resolve("babel-loader"),
                        options: {
                            customize: require.resolve("babel-preset-react-app/webpack-overrides"),
                            plugins: [
                                [
                                    require.resolve("babel-plugin-named-asset-import"),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent: "@svgr/webpack?-svgo![path]",
                                            },
                                        },
                                    },
                                ],
                            ],
                            cacheDirectory: true,
                            cacheCompression: false,
                            compact: false,
                        },
                    },
                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        loader: require.resolve("css-loader"),
                        options: {
                            onlyLocals: true,
                        },
                    },
                    {
                        test: cssModuleRegex,
                        exclude: cssModuleRegex,
                        loader: require.resolve("css-loader"),
                        options: {
                            module: true,
                            onlyLocals: true,
                            getLocalIdent: getCSSModuleLocalIdent,
                        },
                    },
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: [
                            {
                                loader: require.resolve("css-loader"),
                                options: {
                                    onlyLocals: true,
                                },
                            },
                        ],
                    },
                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: [
                            {
                                loader: require.resolve("css-loader"),
                                options: {
                                    module: true,
                                    onlyLocals: true,
                                    getLocalIdent: getCSSModuleLocalIdent,
                                },
                            },
                            require.resolve("sass-loader"),
                        ],
                    },
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve("url-loader"),
                        options: {
                            emitFile: false,
                            name: "static/media/[name].[hash:8].[ext]",
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        modules: ["node_modules"],
    },
    externals: [webpackNodeExternals()],
    plugins: [new webpack.DefinePlugin(env.stringified)],
};
