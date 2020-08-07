const sql = require("./db.js");

// constructor
const Questoes = function(questoes) {
    this.avaliacao_id= questoes.avaliacao_id;
    this.pergunta= questoes.pergunta;
    this.resposta= questoes.resposta;
    this.cotacao= questoes.cotacao;
    this.idordem= questoes.idordem;
    this.alternativa1= questoes.alternativa1;
    this.alternativa2= questoes.alternativa2;
    this.alternativa3= questoes.alternativa3;
    this.idareatematica= questoes.idareatematica;
    this.id= questoes.id;

};

Questoes.create = (newQuestoes, result) => {
  sql.query("INSERT INTO questoes SET ?", newQuestoes, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created questoes: ", { id: res.insertId, ...newQuestoes });
    result(null, { id: res.insertId, ...newQuestoes });
  });
};

Questoes.findByIdAval = (questoesId, result) => {
  sql.query(`SELECT * FROM questoes WHERE avaliacao_id = ${questoesId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("questoes: ", res);
    result(null, res);
  });
};
Questoes.findById = (questoesId, result) => {
  sql.query(`SELECT * FROM questoes WHERE id = ${questoesId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found questoes: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Questoes with the id
    result({ kind: "not_found" }, null);
  });
};

Questoes.getAll = result => {
  sql.query("SELECT * FROM questoes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("questoes: ", res);
    result(null, res);
  });
};

Questoes.updateById = (questoesId, questoes, result) => {

  sql.query(
    "UPDATE questoes SET pergunta = ?, resposta = ?, cotacao = ?,idordem=?, alternativa1=?,alternativa2=?,alternativa3=?, idareatematica=? WHERE id = ?",
    [questoes.pergunta, questoes.resposta, questoes.cotacao,questoes.idordem,questoes.alternativa1,questoes.alternativa2,questoes.alternativa3,questoes.idareatematica,  questoesId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Questoes with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated questoes: ", { id: questoesId, ...questoes });
      result(null, { id: questoesId, ...questoes });
    }
  );
};

Questoes.remove = (id, result) => {
  sql.query("DELETE FROM questoes WHERE id= ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Questoes with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted questoes with id: ", id);
    result(null, res);
  });
};

Questoes.removeAll = result => {
  sql.query("DELETE FROM questoes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} questoes`);
    result(null, res);
  });
};

module.exports = Questoes;
