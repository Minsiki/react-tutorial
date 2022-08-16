import ReactDomServer from "react-dom/server";
import React from "react";
const html = ReactDomServer.renderToString(<div>Hello Server side rendering!</div>);

console.log(html);
