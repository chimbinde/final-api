const sql = require("./db.js");

// constructor
const Provincia = function(provincia) {
  this.idprovincia = provincia.email;
  this.nomeprovincia = provincia.name;
  this.pais_idpais=provincia.pais_idpais;

};

Provincia.create = (newProvincia, result) => {
  sql.query("INSERT INTO provincia SET ?", newProvincia, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created provincia: ", { id: res.insertId, ...newProvincia });
    result(null, { id: res.insertId, ...newProvincia });
  });
};

Provincia.findByIdPais = (provinciaId, result) => {
  sql.query(`SELECT * FROM provincia WHERE pais_idpais = ${provinciaId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("provincia: ", res);
    result(null, res);
    // not found Provincia with the id
   // result({ kind: "not_found" }, null);
  });
};

Provincia.findById = (provinciaId, result) => {
  sql.query(`SELECT * FROM provincia WHERE id = ${provinciaId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found provincia: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Provincia with the id
    result({ kind: "not_found" }, null);
  });
};

Provincia.getAll = result => {
  sql.query("SELECT * FROM provincia", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("provincia: ", res);
    result(null, res);
  });
};

Provincia.updateById = (id, provincia, result) => {
  sql.query(
    "UPDATE provincia SET email = ?, name = ?, active = ? WHERE id = ?",
    [provincia.email, provincia.name, provincia.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Provincia with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated provincia: ", { id: id, ...provincia });
      result(null, { id: id, ...provincia });
    }
  );
};

Provincia.remove = (id, result) => {
  sql.query("DELETE FROM provincia WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Provincia with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted provincia with id: ", id);
    result(null, res);
  });
};

Provincia.removeAll = result => {
  sql.query("DELETE FROM provincia", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} provincia`);
    result(null, res);
  });
};

module.exports = Provincia;
