const logger = require('morgan');
const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

// parse requests of logger
app.use(logger('dev'))
// configuration cors
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bem-vindo ao compactar fotos." });
});

require("./app/routers/auth.router")(app);
require("./app/routers/compress.router")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App ouvindo na porta ${PORT}.`);
});