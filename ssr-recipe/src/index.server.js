import ReactDomServer from "react-dom/server";
const html = ReactDomServer.renderToString(<div>Hello Server side rendering!</div>);

console.log(html);
