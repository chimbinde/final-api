const sql = require("./db.js");

// constructor
const Avaliacao = function (avaliacao) {
  this.idpessoa = avaliacao.idpessoa;
  this.iddisciplinas = avaliacao.iddisciplinas;
  this.id = avaliacao.id;
  this.descricao = avaliacao.descricao;
};

Avaliacao.create = (newAvaliacao, result) => {

  let sqlstring = `INSERT INTO avaliacao
  (
    idpessoa,iddisciplinas,id,datacriada,dataeditada,descricao
  )
  VALUES
  (
    `+newAvaliacao.idpessoa+`, `+newAvaliacao.iddisciplinas+`, 
    (
      ifnull(
        (select max(a.id) as val from avaliacao  a
          where a.iddisciplinas= `+newAvaliacao.iddisciplinas+`
          and a.idpessoa=`+newAvaliacao.idpessoa+`),
          0)  + 1
    ),
     now(),now(),'`+newAvaliacao.descricao+`'
  );`;
//console.log(sqlstring);
  //retrun;
  sql.query(sqlstring, newAvaliacao, (err, res) => {
    // sql.query("INSERT INTO avaliacao SET ?", newAvaliacao, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created avaliacao: ", { id: res.insertId, ...newAvaliacao });
    result(null, { id: res.insertId, ...newAvaliacao });
  });
};

Avaliacao.findById = (avaliacaoId, result) => {
  sql.query(`SELECT * FROM avaliacao WHERE id = ${avaliacaoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found avaliacao: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Avaliacao.findByIdAvalDisc = (iddisc, result) => {
  sql.query(`SELECT * FROM avaliacao WHERE  iddisciplinas=${iddisc}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Avaliacao ", res);
    result(null, res);
  });
};

Avaliacao.findByIdAvalPessoa = (idpessoa, result) => {
  sql.query(`SELECT * FROM avaliacao a, disciplinas d WHERE d.iddisciplinas = a.iddisciplinas and a.idpessoa = ${idpessoa}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Avaliacao ", res);
    result(null, res);
  });
};

Avaliacao.findByIdAval = (idpessoa, iddisc, result) => {
  sql.query(`SELECT * FROM avaliacao WHERE idpessoa = ${idpessoa} and iddisciplinas=${iddisc}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Avaliacao ", res);
    result(null, res);
  });
};

Avaliacao.getAll = result => {
  sql.query("SELECT * FROM avaliacao", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Avaliacao ", res);
    result(null, res);
  });
};

Avaliacao.updateById = (id, idpessoa, iddisciplinas,avaliacao, result) => {


  let stringsql="UPDATE avaliacao SET descricao = '"+avaliacao.descricao+"' WHERE id = "+id+" and idpessoa= "+idpessoa+" and iddisciplinas="+iddisciplinas;
  //console.log(stringsql);
  //return;
  sql.query(stringsql ,
    [avaliacao.descricao, id, idpessoa,iddisciplinas],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Avaliacao with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Avaliacao: ", { id: id, ...avaliacao });
      result(null, { id: id, ...avaliacao });
    }
  );
};
Avaliacao.remove = (id,iddisc, idp, result) => {
  sql.query("DELETE FROM avaliacao WHERE idpessoa = ? and iddisciplinas =? and id = ?", [idp,iddisc, id], (err, res) => {
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

    console.log("deleted Avaliacao with id: ", id);
    result(null, res);
  });
};

Avaliacao.removeAll = result => {
  sql.query("DELETE FROM avaliacao", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Avaliacao`);
    result(null, res);
  });
};

module.exports = Avaliacao;
