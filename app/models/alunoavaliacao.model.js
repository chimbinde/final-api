const sql = require("./db.js");

// constructor
const Alunoavaliacao = function(alunoavaliacao) {
  this.iddisciplinas = alunoavaliacao.iddisciplinas;
  this.idpessoa = alunoavaliacao.idpessoa;
  this.avaliacao_id = alunoavaliacao.avaliacao_id;

  this.nota = alunoavaliacao.nota;
  this.vezes = alunoavaliacao.vezes;

  this.avaliacao_iddisciplinas = alunoavaliacao.avaliacao_iddisciplinas; 
  this.avaliacao_idpessoa = alunoavaliacao.avaliacao_idpessoa;

};
Alunoavaliacao.create = (newAlunoavaliacao, result) => {
  let sqlstring=`INSERT INTO aluno_avaliacao(iddisciplinas,idpessoa,avaliacao_id,nota,vezes,inicio,fim,fechada, avaliacao_idpessoa,avaliacao_iddisciplinas)
                      VALUES(`+newAlunoavaliacao.iddisciplinas+`,`+newAlunoavaliacao.idpessoa+`,`+newAlunoavaliacao.avaliacao_id+`,
                      0,                     
                      (
                        ifnull(
                          (select max(a.vezes) as val from aluno_avaliacao  a
                            where a.avaliacao_iddisciplinas= `+newAlunoavaliacao.avaliacao_iddisciplinas+`
                            and a.avaliacao_idpessoa=`+newAlunoavaliacao.avaliacao_idpessoa+`
                            and a.idpessoa=`+newAlunoavaliacao.idpessoa+`
                            and a.avaliacao_id=`+newAlunoavaliacao.avaliacao_id+`),
                            0)  + 1
                      ) 
                      ,now(),null,0,`+newAlunoavaliacao.avaliacao_idpessoa+`,`+newAlunoavaliacao.avaliacao_iddisciplinas+`); `

//console.log(sqlstring);
//return;
  sql.query(sqlstring, newAlunoavaliacao, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created alunoavaliacao: ", { id: res.insertId, ...newAlunoavaliacao });
    result(null, { id: res.insertId, ...newAlunoavaliacao });
  });
};

Alunoavaliacao.findById = (alunoavaliacaoId, result) => {
  sql.query(`SELECT * FROM aluno_avaliacao WHERE idpessoa = ${alunoavaliacaoId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found alunoavaliacao: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Alunoavaliacao with the id
    result({ kind: "not_found" }, null);
  });
};
Alunoavaliacao.findById_pessoa = (alunoavaliacaoId, result) => {
  const sqlstring =`SELECT * FROM aluno_avaliacao aa, avaliacao a
                    WHERE a.iddisciplinas=aa.avaliacao_iddisciplinas 
                      and a.idpessoa=aa.avaliacao_idpessoa
                      and a.id=aa.avaliacao_id
                      and aa.idpessoa =${alunoavaliacaoId};`;
  sql.query(sqlstring, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("alunoavaliacao: ", res);
    result(null, res);
  });
};
////"/alunoavaliacao/tempo/:ava_iddisciplinas/:ava_iddocente/:ava_id/:vezes/:idpessoa"
Alunoavaliacao.findByIdAvalTempo = (ava_iddisciplinas,ava_iddocente,ava_id,vezes,idpessoa, result) => {
     let sqlstring=`select TIMESTAMPDIFF(MINUTE, (select a.inicio 
                      from aluno_avaliacao a 
                     where a.avaliacao_iddisciplinas =`+ava_iddisciplinas+` 
                       and a.avaliacao_idpessoa =`+ava_iddocente+` 
                       and a.avaliacao_id=`+ava_id+` 
                       and vezes=`+vezes+` 
                       and idpessoa=`+idpessoa+`), now() ) as minutos;`;

 // console.log(sqlstring);
 // return;
  sql.query(sqlstring, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("alunoavaliacao: ", res);
    result(null, res);
  });
};

Alunoavaliacao.findByIdAval = (idpessoa,iddisc, result) => {
    sql.query(`SELECT * FROM aluno_avaliacao WHERE idpessoa = ${idpessoa} and iddisciplinas = ${iddisc}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("alunoavaliacao: ", res);
      result(null, res);
    });
  };


Alunoavaliacao.getAll = result => {
  sql.query("SELECT * FROM aluno_avaliacao", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("alunoavaliacao: ", res);
    result(null, res);
  });
};
//req.params.iddisc,req.params.idpessoa,req.params.avaliacao_id,req.params.vezes,
Alunoavaliacao.updateById = (iddisc, idpessoa, avaliacao_id,vezes,nota,alunoavaliacao,result) => {
  sql.query(
    "UPDATE aluno_avaliacao SET nota = ? WHERE iddisciplinas = ? and idpessoa=? and avaliacao_id=? and vezes=?",
    [alunoavaliacao.nota, iddisc, idpessoa, avaliacao_id,vezes],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Alunoavaliacao with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated aluno_avaliacao: ", { id: iddisc, ...alunoavaliacao });
      result(null, { id: iddisc, ...alunoavaliacao });
    }
  );
};

Alunoavaliacao.removeAval = (idpessoa, result) => {
  sql.query(`UPDATE aluno_avaliacao SET fechada = 1  WHERE  idpessoa = ${idpessoa} ; `,  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} alunoavaliacao`);
    result(null, res);
  });
};


Alunoavaliacao.remove = (iddisc, idpessoa, avaliacao_id,vezes, result) => {
  sql.query("DELETE FROM aluno_avaliacao WHERE iddisciplinas = ? and idpessoa=? and avaliacao_id=? and vezes=? ", [iddisc, idpessoa, avaliacao_id,vezes], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Alunoavaliacao with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted aluno_avaliacao with id: ", idpessoa);
    result(null, res);
  });
};

Alunoavaliacao.removeAll = result => {
  sql.query("DELETE FROM aluno_avaliacao", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} alunoavaliacao`);
    result(null, res);
  });
};

module.exports = Alunoavaliacao;
