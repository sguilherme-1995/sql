var readline = require('readline-sync')
var aluno_repositorio = require('./aluno-repository')
const cTable = require('console.table');
var db = require('./db')

db.getDb().then(async database => {
    var choice = "";
    var repositorio = aluno_repositorio(database);
    do{
        console.log('--------------------------ESCOLHA--------------------------')
        console.log("Insira A para inserir")
        console.log("Insira B para mostrar")
        console.log("Insira C para sair")
        choice = await readline.question("Escolha : ")
        if(choice === "A") {
            console.clear()
            console.log('--------------------------CADASTRO ALUNO--------------------------')
            var aluno = {
                nome : readline.question("Insira nome do aluno : "),
                idade : readline.questionInt("Insira idade do aluno  : "),
            }
            await repositorio.insereAluno(aluno).then(p => {
                console.clear()
                console.log("Aluno inserido com sucesso")
            }).catch(p => {
                console.log("Não foi possível inserir o aluno")
            })

        } else if(choice === "B"){
            console.clear()
            await repositorio.mostraAlunos().then(p => {
                console.table(p)
            })
        } else if(choice !== "C") {
            console.clear()
            console.log("Opção invalida tente novamente ")
            console.log()
        }


    } while(choice !== "C")
});

