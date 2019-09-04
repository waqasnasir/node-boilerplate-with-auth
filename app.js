const http = require("http");
const fs = require("fs");

// hello world with http server
// const server = http.createServer((req, res) => {
//   console.log(req.url);
//   res.write("Hi there hello from http server");
//   res.end();
// });

// serving static files using http server
const server = http.createServer((req, res) => {

  // for html 
  // const readStream = fs.createReadStream("./static/example.html");
  // res.writeHead(200, { "Content-type": "html" });

  // //for image 
  //   const readStream = fs.createReadStream("./static/stars.png");
  //   res.writeHead(200, { "Content-type": "image" });

  // for json
  const readStream = fs.createReadStream("./static/data.json");
  res.writeHead(200, { "Content-type": "application/json" }); 
  readStream.pipe(res);
});

server.listen(5000, () => console.log("server is listening at 5000"));


// semantic versioning
// ^ => major.x.x
// ~ => major.minor.x


