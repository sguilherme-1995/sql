var db = require('./db')

module.exports = function (database) {
    return {
        criarTabela : async function(){
            return new Promise(async(resolve, reject) => {
                await database.run('CREATE TABLE IF NOT EXISTS carros(nome TEXT, cor TEXT, ano INTEGER, valor INTEGER)')
                resolve()
            })
        },
        insereCarro : async function(carros){
            return new Promise(async (resolve, reject) => {
                await database.run(`INSERT INTO carros(nome, cor, ano, valor) VALUES(?, ?, ?, ?)`, [carros.nome, carros.cor, carros.ano, carros.valor], function(err) {
                    if(err) {
                        reject(err)
                    }
                    console.log(`Carro inserido com sucesso na linha ${this.lastID}`)
                    resolve(this.lastID)
                });
            })
        },
        deletaCarro : async function(nome){
            return new Promise(async (resolve, reject) => {
                await database.run(`DELETE FROM carros WHERE nome=?`, [nome], function(err) {
                    if(err) {
                        reject(err)
                    }
                    console.log(`Carro deletado com sucesso na linha ${this.lastID}`)
                    resolve(this.lastID)
                });
            })
        },
        maisCaroCarro : async function(){
            return new Promise(async (resolve, reject) => {
                await database.all(`SELECT MAX (valor) FROM carros`, function(err, resultado) {
                    if(err) {
                        reject(err)
                    }
                    
                    resolve(resultado)
                });
            })
        },        
        maisBaratoCarro : async function(){
            return new Promise(async (resolve, reject) => {
                await database.all(`SELECT MIN (valor) FROM carros`, function(err, resultado) {
                    if(err) {
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        maisBaratoProMaisCaroCarro : async function(){
            return new Promise(async (resolve, reject) => {
                await database.all(`SELECT nome, valor FROM carros ORDER BY valor`, function(err, resultado) {
                    if(err) {
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        maisCaroProMaisBaratoCarro : async function(){
            return new Promise(async (resolve, reject) => {
                await database.all(`SELECT nome, valor FROM carros ORDER BY valor DESC`, function(err, resultado) {
                    if(err) {
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        numeroDeMaiorProMenorCarro : async function(){
            return new Promise(async (resolve, reject) => {
                await database.all(`SELECT nome, ano FROM carros ORDER BY ano DESC`, function(err, resultado) {
                    if(err) {
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        numeroDeMenorProMaiorCarro : async function(){
            return new Promise(async (resolve, reject) => {
                await database.all(`SELECT nome, ano FROM carros ORDER BY valor`, function(err, resultado) {
                    if(err) {
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        corDoCarro : async function(nome){
            return new Promise(async (resolve, reject) => {
                await database.all(`SELECT * FROM carros WHERE cor=?`, [nome], function(err, resultado) {
                    if(err) {
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        anoDoCarro : async function(nome){
            return new Promise(async (resolve, reject) => {
                await database.all(`SELECT * FROM carros WHERE ano=?`, [nome], function(err, resultado) {
                    if(err) {
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        numeroDeCarro : async function(){
            return new Promise(async (resolve, reject) => {
                await database.all(`SELECT count (nome) FROM carros`, function(err, resultado) {
                    if(err) {
                        reject(err)
                    }
                    resolve(resultado)
                });
            })
        },
        mostraCarros : async function(){
            return new Promise(async (resolve, reject) => {
                var carros = []
                let sql = `SELECT * FROM carros`
                var carros = []
                await database.all(sql, [], (err, rows) =>{
                    if(err){
                        reject(err)
                    }
                    rows.forEach((row) => {
                        carros.push({
                            nome : row.nome,
                            cor : row.cor,
                            ano : row.ano,
                            valor : row.valor
                        })
                    });
                    resolve(carros)
                });
            })
        }
    }
}