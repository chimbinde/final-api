const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')

const app = express();
app.use(cors(
  { 
    origin: 'http://localhost:3001'
  }
));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bem vindo a nossa API." });
});

require("./app/routes/customer.routes.js")(app);
require("./app/routes/pessoa.routes.js")(app);
require("./app/routes/disciplina.routes.js")(app);
require("./app/routes/profdisc.routes.js")(app);
require("./app/routes/alunodisc.routes.js")(app);
require("./app/routes/avaliacao.routes.js")(app);
require("./app/routes/questoes.routes.js")(app);
require("./app/routes/alunoavaliacao.routes.js")(app);
require("./app/routes/respostas.routes.js")(app);
require("./app/routes/escolas.routes.js")(app);
require("./app/routes/pais.routes.js")(app);
require("./app/routes/provincia.routes.js")(app);
require("./app/routes/categoriadisc.routes.js")(app);
require("./app/routes/areatematica.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
