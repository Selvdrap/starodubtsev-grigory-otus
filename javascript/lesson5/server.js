const http = require("http");

const host = "127.0.0.1";
const port = 8080;

const server = http.createServer((req, res) => {
  setTimeout(() => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    let body = [];
    req
      .on("data", chunk => {
        body.push(chunk);
      })
      .on("end", () => {
        body = Math.pow(Buffer.concat(body), 2).toString();
        res.end(body);
      });
  }, 100);
});

server.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}/`);
});
