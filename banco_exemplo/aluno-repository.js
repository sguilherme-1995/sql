var db = require('./db')

module.exports = function(database) {
    return {
        criaTabela : async function(){
            return new Promise(async (resolve, reject) => {
                await database.run('CREATE TABLE IF NOT EXISTS alunos(nome text, idade integer)');
                resolve()
            })
        },
        insereAluno : async function(aluno) {
            return new Promise(async (resolve, reject) => {
                await database.run(`INSERT INTO alunos(nome, idade) VALUES(?, ?)`, [aluno.nome, aluno.idade], function(err) {
                    if (err) {
                        reject(err)
                    }
                    console.log(`Aluno inserido com sucesso linha ${this.lastID}`);
                    resolve(this.lastID)
                });
            })

        },
        mostraAlunos :  async function(){
            return new Promise(async (resolve, reject) => {
                var alunos = []
                let sql = `SELECT * FROM alunos`;
                var alunos = []
                await database.all(sql, [], (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    rows.forEach((row) => {
                        alunos.push({
                            nome : row.nome,
                            idade : row.idade
                        })
                    });
                    resolve(alunos)
                });
            })
        }
    }
}