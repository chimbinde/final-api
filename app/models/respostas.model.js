const sql = require("./db.js");

// constructor
const Respostas = function(respostas) {

  this.alternativa=respostas.alternativa;
  this.questoes_id=respostas.questoes_id;
  this.vezes=respostas.vezes;

  this.questoes_avaliacao_id=respostas.questoes_avaliacao_id;
  
  this.questoes_avaliacao_iddisciplinas=respostas.questoes_avaliacao_iddisciplinas;

  this.idaluno=respostas.idaluno;

  this.questoes_avaliacao_idpessoa=respostas.questoes_avaliacao_idpessoa;
};

Respostas.create = (newRespostas, result) => {
  sql.query("INSERT INTO respostas SET ?", newRespostas, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created respostas: ", { id: res.insertId, ...newRespostas });
    result(null, { id: res.insertId, ...newRespostas });
  });
};

Respostas.findByIdAval = (avaliacao_id,idpessoa,iddisciplinas, vezes,idestudante, result) => {
   //:avaliacao_id/:idpessoa/:iddisciplinas/:vezes/:idestudante"
    sql.query(`SELECT * FROM respostas 
                       WHERE questoes_avaliacao_id= ${avaliacao_id} 
                         and questoes_avaliacao_idpessoa = ${idpessoa} 
                         and questoes_avaliacao_iddisciplinas = ${iddisciplinas} 
                         and vezes = ${vezes} 
                         and idaluno = ${idestudante}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      /*
      vezes = ${vezes} and
      if (res.length) {
        console.log("found respostas: ", res[0]);
        result(null, res[0]);
        return;
      } */  
      console.log("respostas: ", res);
      result(null, res);
    });
  };

Respostas.findById = (respostasId, result) => {
  sql.query(`SELECT * FROM respostas WHERE id = ${respostasId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found respostas: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Respostas with the id
    result({ kind: "not_found" }, null);
  });
};
Respostas.findByIdQuestao = (iddisc,idpessoa,idavaliacao, vezes,idnum, result) => {
      //app.get("/respostas/findquestao/:iddisc/:idpessoa/:idavaliacao/:vezes/:idnum", respostas.findOneQuestao);
  sql.query(`SELECT * FROM respostas WHERE questoes_id = ${idnum} and  idpessoa = ${idpessoa} and iddisciplinas = ${iddisc} and avaliacao_id = ${idavaliacao}  and vezes= ${vezes}  `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found respostas: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Respostas with the id
    result({ kind: "not_found" }, null);
  });
};

Respostas.getAll = result => {
  sql.query("SELECT * FROM respostas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("respostas: ", res);
    result(null, res);
  });
};

Respostas.updateById = (iddisc,questoes_id, idpessoa, idavaliacao,vezes
    , respostas, result) => {
  sql.query(
    "UPDATE respostas SET alternativa = ? WHERE iddisciplinas = ? and questoes_id =? and idpessoa=? and avaliacao_id=? and vezes =? ",
    [respostas.alternativa,iddisc,questoes_id, idpessoa, idavaliacao,vezes],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Respostas with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated respostas: ", { id: iddisc, ...respostas });
      result(null, { id: iddisc, ...respostas });
    }
  );
};

Respostas.remove = (iddisciplinas,iddocente, idavaliacao, questoes_id,vezes,idpessoa, result) => {
  //:iddisciplinas/:iddocente/:idavaliacao/:questoes_id/:vezes/:idpessoa
  sql.query(`DELETE FROM respostas 
                   WHERE questoes_avaliacao_iddisciplinas = ?
                     and questoes_avaliacao_idpessoa =? 
                     and questoes_avaliacao_id=? 
                     and questoes_id=? 
                     and vezes =?
                     and idaluno =?
                     `, [iddisciplinas,iddocente, idavaliacao, questoes_id,vezes,idpessoa], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Respostas with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted respostas with id: ", iddisciplinas);
    result(null, res);
  });
};

Respostas.removeAll = result => {
  sql.query("DELETE FROM respostas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} respostas`);
    result(null, res);
  });
};

module.exports = Respostas;
