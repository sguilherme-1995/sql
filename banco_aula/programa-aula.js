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
        console.log("Insira F para o carro de maior valor")
        console.log("Insira G para o carro de menor valor")
        console.log("Insira H para os carros de menor valor ao maior valor")
        console.log("Insira I para os carros de maior valor ao maior valor")
        console.log("Insira J para os carros por cor")
        console.log("Insira K para o numero de carros")
        console.log("Insira L o ano do carro")
        console.log("Insira M para os carros do maior pro menor")
        console.log("Insira N para os carros do menor pro maior")
        console.log("Insira S para sair")
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
        }else if(choice.toUpperCase() === "F"){
            console.clear()
            await repositorio.maisCaroCarro().then(p => {
                console.table(p)
            })        
        }else if(choice.toUpperCase() === "G"){
                console.clear()
                await repositorio.maisBaratoCarro().then(p => {
                    console.table(p)
                })
        }else if(choice.toUpperCase() === "H"){
            console.clear()
            await repositorio.maisBaratoProMaisCaroCarro().then(p => {
                console.table(p)
            })
        }else if(choice.toUpperCase() === "I"){
            console.clear()
            await repositorio.maisCaroProMaisBaratoCarro().then(p => {
                console.table(p)
            })
        }else if(choice.toUpperCase() === "J"){
                console.clear()
                var cor = readline.question("Qual a cor do carro que deseja procurar? \n")
                await repositorio.corDoCarro(cor).then(p => {
                    console.table(p)
                })
        }else if(choice.toUpperCase() === "K"){
            console.clear()
            await repositorio.numeroDeCarro().then(p => {
                console.table(p)
            })
        }else if(choice.toUpperCase() === "L"){
            console.clear()
            var ano = readline.question("Qual o ano do carro que deseja procurar? \n")
            await repositorio.anoDoCarro(ano).then(p => {
                console.table(p)
            })
        }else if(choice.toUpperCase() === "M"){
            console.clear()
            await repositorio.numeroDeMaiorProMenorCarro().then(p => {
                console.table(p)
            })
        }else if(choice.toUpperCase() === "N"){
            console.clear()
            await repositorio.numeroDeMenorProMaiorCarro().then(p => {
                console.table(p)
            })
        } else if(choice.toUpperCase() !== "S") {
            console.clear()
            console.log("Opção invalida tente novamente ")
            console.log()
        }


    } while(choice.toUpperCase() !== "S")
});




