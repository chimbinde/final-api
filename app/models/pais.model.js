const sql = require("./db.js");

// constructor
const Pais = function(pais) {
  this.idpais = pais.idpais;
  this.nomepais = pais.nomepais;
};

Pais.create = (newPais, result) => {
  sql.query("INSERT INTO pais SET ?", newPais, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created pais: ", { id: res.insertId, ...newPais });
    result(null, { id: res.insertId, ...newPais });
  });
};

Pais.findById = (paisId, result) => {
  sql.query(`SELECT * FROM pais WHERE id = ${paisId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pais: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Pais with the id
    result({ kind: "not_found" }, null);
  });
};

Pais.getAll = result => {
  sql.query("SELECT * FROM pais", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pais: ", res);
    result(null, res);
  });
};

Pais.updateById = (id, pais, result) => {
  sql.query(
    "UPDATE pais SET email = ?, name = ?, active = ? WHERE id = ?",
    [pais.email, pais.name, pais.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Pais with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated pais: ", { id: id, ...pais });
      result(null, { id: id, ...pais });
    }
  );
};

Pais.remove = (id, result) => {
  sql.query("DELETE FROM pais WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Pais with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted pais with id: ", id);
    result(null, res);
  });
};

Pais.removeAll = result => {
  sql.query("DELETE FROM pais", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} pais`);
    result(null, res);
  });
};

module.exports = Pais;
