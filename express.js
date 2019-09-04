const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => res.send("hello from express"));
app.get("/example/:name/:id", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  res.send(req.params.name + ":" + req.params.id);
});

/// serving static file
app.use(express.static(path.join(__dirname, 'static')))
app.get('/getfile', (req, res)=> {
  res.sendFile(path.join(__dirname, 'static/example.html'))
})
app.get('/getimage', (req, res)=> {
  res.sendFile(path.join(__dirname, 'static/stars.png'))
})


app.listen(4000, () => console.log("server started at 4000"));
