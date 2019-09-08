import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
// extended false means we are not going to handle nested object in body
app.use(bodyParser.urlencoded({ extended: false }));

app.get("*", (req, res) => {
  res.send("End point not found");
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
