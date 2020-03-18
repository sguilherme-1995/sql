var readline = require('readline-sync')
var carroRepositorio = require('./carro-repository')
const cTable = require('console.table')
var db = require('./db')


db.getDb().then(async database => {
    var choice = "";
    var repositorio = carroRepositorio(database);
    do{
        console.log('--------------------------ESCOLHA--------------------------')
        console.log("Insira A para inserir")
        console.log("Insira B para mostrar")
        console.log("Insira C para deletar")
        console.log("Insira D para sair")
        choice = await readline.question("Escolha : ")
        if(choice.toUpperCase() === "A") {
            console.clear()
            console.log('--------------------------CADASTRO ALUNO--------------------------')
            var carro = {
                nome : readline.question("Insira nome do carro : "),
                cor : readline.question("Insira a cor do carro : "),
                ano : readline.questionInt("Insira o ano do carro : "),
                valor : readline.questionInt("Insira o valor do carro : "),
            }
            await repositorio.insereCarro(carro).then(p => {
                console.clear()
                console.log("Carro inserido com sucesso")
            }).catch(erro => {
                console.log("Não foi possível inserir o carro"+erro)
            })

        } else if(choice.toUpperCase() === "B"){
            console.clear()
            await repositorio.mostraCarros().then(p => {
                console.table(p)
            })
        } else if(choice.toUpperCase() === "C"){
            console.clear()
            var ent = readline.question("Qual o nome do carro que deseja deletar? ")
            await repositorio.deletaCarro(ent).then(p => {
                console.table(p)
            })
        } else if(choice.toUpperCase() !== "D") {
            console.clear()
            console.log("Opção invalida tente novamente ")
            console.log()
        }


    } while(choice.toUpperCase() !== "D")
});




