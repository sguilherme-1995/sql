var firebase = require('firebase-admin')
var user = require('readline-sync')
var chalk = require('chalk');
var serviceAccount = require("./credenciais.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://jogo-24ebd.firebaseio.com"
})
var dataBase = firebase.database()
var pontuacoesUsuariosRef = dataBase.ref('jogo')
var jogador = (nome, pontuacao) => ({ nome, pontuacao })
var pontuacaoUsuarioRef = nome => dataBase.ref(`jogo/${nome}`)

function buscaPontuacoes(callback) {
    pontuacoesUsuariosRef.on('value', snapshot => {
        var pontuacoes = snapshot.val()
        Object.entries(pontuacoes).forEach(([chave, pontuacao]) => console.log('>>', pontuacao.nome, ' => ', pontuacao.pontuacao,'<<'))
        // process.exit()
        jogo()
    }, callback)
}
function criaPontuacaoDeJogador(jogador, callback) {
    var pontuacaoUsuario = pontuacaoUsuarioRef(jogador.nome)

    pontuacaoUsuario.set({
        nome: jogador.nome,
        pontuacao: jogador.pontuacao
    }, buscaPontuacoes(callback))
}
function jogo(callback){
// console.clear()
console.log(chalk.black.bgGreen.bold('========================= JOGO DE DIGITAR ========================='))

var nome = user.question('Digite seu nome: ').toUpperCase()
var entrada = user.question('Digite o maximo de letras possiveis e pressione enter:\n')
var pontuacao = entrada.length

var novoJogador = jogador(nome, pontuacao)

criaPontuacaoDeJogador(novoJogador, callback)
console.log(chalk.black.bgBlue.bold('========================= OBRIGADO POR JOGAR! ========================='))

}
jogo(jogo)