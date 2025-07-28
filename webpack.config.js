const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.tsx",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        library: "wideUi",
        libraryTarget: "umd",
        umdNamedDefine: true,
        globalObject: "globalThis",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    externals: {
        react: "react",
        "react-dom": "react-dom",
        "@mui/material": "@mui/material", // исключаем MUI из бандла
        "@emotion/react": "@emotion/react", // исключаем Emotion из бандла
        "@emotion/styled": "@emotion/styled", // исключаем Emotion из бандла
    },
};
