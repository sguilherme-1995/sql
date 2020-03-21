var admin = require("firebase-admin");
var user = require('readline-sync')

var serviceAccount = require("./atividade-firebase-firebase-adminsdk-png4n-2b59d537b3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://atividade-firebase.firebaseio.com"
});
var nomeTabelaMensagens = 'Atividade-18'
var bancoDeDados = admin.database().ref(nomeTabelaMensagens)

function cadastrarAtividade(){
    var atividade = user.question("Qual a atividade?\n>>")
    var data = user.questionInt("Qual a data?\n>>")
    var tipo = user.question("Qual o tipo?\n>>")
    var titulo = user.question("Qual o titulo da atividade?\n>>")
    bancoDeDados.push({
        atividade: atividade,
        data: data,
        tipo: tipo,
        titulo: titulo
    })
    menu()
}


function mostrar(){
    bancoDeDados.on('value', snapshot => {
        console.log(snapshot.val())
        menu()
    })

}

function sair(){
    process.exit()
    
}

function menu(){
    console.log("Digite A para cadastrar")
    console.log("Digite B para mostrar")
    console.log("Digite C para sair")
    var choice = user.question("Escolha: ")
    if(choice.toUpperCase() === "A"){
        cadastrarAtividade()
    }else if(choice.toUpperCase() === "B"){
        mostrar()
    }else if(choice.toUpperCase() === "C"){
        sair()
    }else{
        console.log("dados errados")
    }
}
menu()