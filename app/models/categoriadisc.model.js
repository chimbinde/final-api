const sql = require("./db.js");

// constructor
const Categoriadisc = function(categoriadisc) {
  this.email = categoriadisc.email;
  this.name = categoriadisc.name;
  this.active = categoriadisc.active;
};

Categoriadisc.create = (newCategoriadisc, result) => {
  sql.query("INSERT INTO categoriadisc SET ?", newCategoriadisc, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created categoriadisc: ", { id: res.insertId, ...newCategoriadisc });
    result(null, { id: res.insertId, ...newCategoriadisc });
  });
};

Categoriadisc.findById = (categoriadiscId, result) => {
  sql.query(`SELECT * FROM categoriadisc WHERE id = ${categoriadiscId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found categoriadisc: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Categoriadisc with the id
    result({ kind: "not_found" }, null);
  });
};

Categoriadisc.getAll = result => {
  sql.query("SELECT * FROM categoriadisc", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("categoriadisc: ", res);
    result(null, res);
  });
};

Categoriadisc.updateById = (id, categoriadisc, result) => {
  sql.query(
    "UPDATE categoriadisc SET email = ?, name = ?, active = ? WHERE id = ?",
    [categoriadisc.email, categoriadisc.name, categoriadisc.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Categoriadisc with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated categoriadisc: ", { id: id, ...categoriadisc });
      result(null, { id: id, ...categoriadisc });
    }
  );
};

Categoriadisc.remove = (id, result) => {
  sql.query("DELETE FROM categoriadisc WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Categoriadisc with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted categoriadisc with id: ", id);
    result(null, res);
  });
};

Categoriadisc.removeAll = result => {
  sql.query("DELETE FROM categoriadisc", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} categoriadisc`);
    result(null, res);
  });
};

module.exports = Categoriadisc;
