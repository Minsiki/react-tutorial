import ReactDOMServer from "react-dom/server";
import React from "react";
import express from "express";
import {StaticRouter} from "react-router-dom/server";
import App from "./App";
import fs from 'fs';
import path from 'path';

const manifest = JSON.parse(fs.readFileSync(path.resolve('../build/asset-manifest.json'), 'utf-8'));

const chunks = Object.keys(manifest.files)
.filter(key => /chunk\.js$/.exec(key))
.map(key => `<script src="${manifest.files[key]}"></script>`)
.join("");

function createPage(root) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta nane="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta name="theme-color" content="#000000" />
        <title>React App</title>
        <link href="${manifest.files['main.css']}" rel="stylesheet" />
    </head>
    <body>
        <noscript> You need to enable Javascript to run this app.</noscript>
        <div id="root">
            ${root}
        </div>
        <script src="${manifest.files['runtime~main.js']}"></script>
        <script src="${manifest.files['main.js']}"></script>
    </body>
    </html>
    `;
}

const app = express();
const serverRender = (req, res, next) => {
    const context = {};
    const jsx = (
        <StaticRouter location={req.url} context={context}>
            <App/>
        </StaticRouter>
    );
    const root = ReactDOMServer.renderToString(jsx);
    res.send(createPage(root));
};

const serve = express.static(path.resolve('./build'), {
    index: false
});

app.use(serve); // 항상 serverRender 전에 실행
app.use(serverRender);

app.listen(5000, () => {
    console.log("Running on http://localhost:5000");
})
