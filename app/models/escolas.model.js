const sql = require("./db.js");

// constructor
const Escolas = function(escolas) {
  this.email = escolas.email;
  this.name = escolas.name;
  this.active = escolas.active;
};

Escolas.create = (newEscolas, result) => {
  sql.query("INSERT INTO escolas SET ?", newEscolas, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created escolas: ", { id: res.insertId, ...newEscolas });
    result(null, { id: res.insertId, ...newEscolas });
  });
};
Escolas.findByIdProv = (escolasId, result) => {
  sql.query(`SELECT * FROM escola WHERE idprovincia = ${escolasId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
/*
    if (res.length) {
      console.log("found escolas: ", res[0]);
      result(null, res[0]);
      return;
    } */
    console.log("escolas: ", res);
    result(null, res);
    // not found Escolas with the id
    //result({ kind: "not_found" }, null);
  });
};
Escolas.findById = (escolasId, result) => {
  sql.query(`SELECT * FROM escola WHERE id = ${escolasId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found escolas: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Escolas with the id
    result({ kind: "not_found" }, null);
  });
};

Escolas.getAll = result => {
  sql.query("SELECT * FROM escola", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("escolas: ", res);
    result(null, res);
  });
};

Escolas.updateById = (id, escolas, result) => {
  sql.query(
    "UPDATE escolas SET email = ?, name = ?, active = ? WHERE id = ?",
    [escolas.email, escolas.name, escolas.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Escolas with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated escolas: ", { id: id, ...escolas });
      result(null, { id: id, ...escolas });
    }
  );
};

Escolas.remove = (id, result) => {
  sql.query("DELETE FROM escolas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Escolas with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted escolas with id: ", id);
    result(null, res);
  });
};

Escolas.removeAll = result => {
  sql.query("DELETE FROM escolas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} escolas`);
    result(null, res);
  });
};

module.exports = Escolas;
