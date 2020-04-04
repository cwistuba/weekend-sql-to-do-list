const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

//routes
const itemRouter = require("./routes/item.router");

app.use(express.static("server/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/items", itemRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
