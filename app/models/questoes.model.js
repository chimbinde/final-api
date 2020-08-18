const sql = require("./db.js");

// constructor
const Questoes = function(questoes) {
    this.avaliacao_id= questoes.avaliacao_id;
    this.pergunta= questoes.pergunta;
    this.resposta= questoes.resposta;
    this.cotacao= questoes.cotacao;
    this.idordem= questoes.idordem;
    this.alternativa1= questoes.alternativa1;
    this.idpessoa= questoes.idpessoa;
    this.iddisciplina= questoes.iddisciplina;
    this.alternativa2= questoes.alternativa2;
    this.alternativa3= questoes.alternativa3;
    this.alternativa4= questoes.alternativa4;
    this.idareatematica= questoes.idareatematica;
    this.id= questoes.id;

};

Questoes.create = (newQuestoes, result) => {
 let  consulta  = 'INSERT INTO questoes';
      consulta += '(pergunta,resposta,cotacao,idordem,';
      consulta += 'alternativa1,alternativa2,alternativa3,idareatematica,id,';
      consulta += ' alternativa4,avaliacao_id,avaliacao_idpessoa,avaliacao_iddisciplinas)';
      consulta += ' VALUES("'+newQuestoes.pergunta+'","'+newQuestoes.resposta+'",';
      consulta +=' 1,"'+newQuestoes.id+'","'+newQuestoes.alternativa1+'","'+newQuestoes.alternativa2+'",';
      consulta +=' "'+newQuestoes.alternativa3+'","'+newQuestoes.idareatematica+'",';
      consulta +=' "'+newQuestoes.id+'","'+newQuestoes.alternativa4+'","'+newQuestoes.avaliacao_id+'",';
      consulta +=' '+newQuestoes.idpessoa+',"'+newQuestoes.iddisciplina+'")';

     // console.log(consulta);

    //  return;

  sql.query(consulta, newQuestoes, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created questoes: ", { id: res.insertId, ...newQuestoes });
    result(null, { id: res.insertId, ...newQuestoes });
  });
};

Questoes.findByIdAval = (questoesId,idpessoa, iddisciplinas,  result) => {
  sql.query(`SELECT * FROM questoes WHERE avaliacao_idpessoa = ${idpessoa} and avaliacao_iddisciplinas = ${iddisciplinas} and avaliacao_id = ${questoesId}  `, (err, res) => {
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

////:questoesId/:idpessoa/:iddisciplina/:avaliacao_id"
Questoes.updateById = (questoesId,idpessoa,iddisciplina,avaliacao_id, questoes, result) => {

  let stringSQL=` UPDATE questoes` ;
      stringSQL+=`   SET pergunta = '`+questoes.pergunta+`',` ;
      stringSQL+=`       resposta = '`+questoes.resposta+`',` ;
      stringSQL+=`        cotacao = 1,`;
      stringSQL+=`        idordem =`+questoesId+`, `;
      stringSQL+=`   alternativa1 ='`+questoes.alternativa1+`',`;
      stringSQL+=`   alternativa2 ='`+questoes.alternativa2+`',`;
      stringSQL+=`   alternativa3 ='`+questoes.alternativa3+`',`;
      stringSQL+=`   alternativa4 ='`+questoes.alternativa4+`',`;
      stringSQL+=` idareatematica =`+questoes.idareatematica+` `;
      stringSQL+=`       WHERE id = `+questoesId+``;
      stringSQL+=`         AND avaliacao_id =  `+avaliacao_id+``;
      stringSQL+=`         AND avaliacao_iddisciplinas =  `+iddisciplina+``;
      stringSQL+=`         AND avaliacao_idpessoa =  `+idpessoa+`;`;

  //console.log(stringSQL);
  //return;
  sql.query(stringSQL,
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
