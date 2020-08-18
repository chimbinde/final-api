const sql = require("./db.js");

// constructor
const Areatematica = function(areatematica) {
  this.idareatematica = areatematica.idareatematica;
  this.areatematica = areatematica.areatematica;
  this.iddisciplinas = areatematica.iddisciplinas;
};

Areatematica.create = (newAreatematica, result) => {
  sql.query("INSERT INTO areatematica SET ?", newAreatematica, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created areatematica: ", { id: res.insertId, ...newAreatematica });
    result(null, { id: res.insertId, ...newAreatematica });
  });
};

Areatematica.findById = (iddisciplinas, result) => {
  sql.query(`SELECT * FROM areatematica a, disciplinas d WHERE d.iddisciplinas=a.iddisciplinas and a.iddisciplinas = ${iddisciplinas}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("areatematica: ", res);
    result(null, res);

    // not found Areatematica with the id
   // result({ kind: "not_found" }, null);
  });
};

Areatematica.getAll = result => {
  sql.query("SELECT * FROM areatematica", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("areatematica: ", res);
    result(null, res);
  });
};

Areatematica.updateById = (id, areatematica, result) => {
  sql.query(
    "UPDATE areatematica SET email = ?, name = ?, active = ? WHERE id = ?",
    [areatematica.email, areatematica.name, areatematica.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Areatematica with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated areatematica: ", { id: id, ...areatematica });
      result(null, { id: id, ...areatematica });
    }
  );
};

Areatematica.remove = (id, result) => {
  sql.query("DELETE FROM areatematica WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Areatematica with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted areatematica with id: ", id);
    result(null, res);
  });
};

Areatematica.removeAll = result => {
  sql.query("DELETE FROM areatematica", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} areatematica`);
    result(null, res);
  });
};

module.exports = Areatematica;
