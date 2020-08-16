const sql = require("./db.js");

// constructor
const Profdisc = function(profdisc) {
  this.idpessoa = profdisc.idpessoa;
  this.iddisciplinas = profdisc.iddisciplinas;
  this.anocadastro = profdisc.anocadastro;
};

Profdisc.create = (newProfdisc, result) => {
  sql.query("INSERT INTO prof_disc SET ?", newProfdisc, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Profdisc: ", { id: res.insertId, ...newProfdisc });
    result(null, { id: res.insertId, ...newProfdisc });
  });
};

Profdisc.findById = (profId, result) => {
  sql.query(`SELECT * FROM prof_disc pd, disciplinas d 
                     WHERE d.iddisciplinas = pd.iddisciplinas 
                       AND pd.idpessoa = ${profId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Profdisc: ", res);
    result(null, res);
  });
};

Profdisc.getAll = result => {
  sql.query("SELECT * FROM prof_disc", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Profdisc: ", res);
    result(null, res);
  });
};

Profdisc.updateById = (id, profdisc, result) => {
  sql.query(
    "UPDATE prof_disc SET email = ?, name = ?, active = ? WHERE id = ?",
    [profdisc.email, profdisc.name, profdisc.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated profdisc: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Profdisc.remove = (id,discId, result) => {
  sql.query("DELETE FROM prof_disc WHERE idpessoa = ? and iddisciplinas = ?  ", [id,discId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Profdisc with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Profdisc with id: ", id);
    result(null, res);
  });
};

Profdisc.removeAll = result => {
  sql.query("DELETE FROM prof_disc", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} profdisc`);
    result(null, res);
  });
};

module.exports = Profdisc;
