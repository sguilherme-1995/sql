var axios = require('axios').default;
var user = require('readline-sync')
var sqlite = require('sqlite3')
var db = new sqlite.Database('./corona.db', (erro)=> {
    if(erro){
        console.log("Erro ao conectar com o banco de dados")
    }
})



axios.get('https://api.covid19api.com/summary')
    .then((resultado) => {
        var paises = resultado.data.Countries;
        db.run('DELETE FROM corona',  erroDelete => {
            if(erroDelete){
                console.log(erroDelete)
            }
        paises.forEach(pais => {
        db.run('INSERT INTO corona (Country, TotalConfirmed, NewConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered) VALUES (?, ?, ?, ?, ?, ?, ?)', [pais.Country, pais.TotalConfirmed, pais.NewConfirmed, pais.NewDeaths, pais.TotalDeaths, pais.NewRecovered, pais.TotalRecovered], (erro) => {
                if(erro){
                    console.log(erro)
                }
            })
        
        }) 
        });
        
    })
    function paisUnico(nome){
        db.all('SELECT * FROM corona WHERE Country=?', nome ,(erro,resultado)=>{
            if(erro){
                console.log("Erro ao selecionar")
            }
            console.log(resultado)
        })
    }
    function paisesMaisInfec(){
        db.all('SELECT (Country),(TotalConfirmed) FROM corona ORDER BY TotalConfirmed DESC LIMIT 20',(erro,resultado) => {
            if(erro){
                console.log(erro)
            }
            console.log(resultado)
        })
    }
    function paisesMaisNovosInfec(){
        db.all('SELECT (Country),(NewConfirmed) FROM corona ORDER BY NewConfirmed DESC LIMIT 10',(erro,resultado) => {
            if(erro){
                console.log(erro)
            }
            console.log(resultado)
        })
    }
    function paisesMaisMortes(){
        db.all('SELECT (Country),(TotalDeaths) FROM corona ORDER BY TotalDeaths DESC LIMIT 10',(erro,resultado) => {
            if(erro){
                console.log(erro)
            }
            console.log(resultado)
        })
    }
    function paisesMenosMortes(){
        db.all('SELECT (Country),(TotalDeaths) FROM corona ORDER BY TotalDeaths LIMIT 10',(erro,resultado) => {
            if(erro){
                console.log(erro)
            }
            console.log(resultado)
        })
    }
    function paisesMaisRecuperados(){
        db.all('SELECT (Country),(TotalRecovered) FROM corona ORDER BY TotalRecovered DESC LIMIT 10',(erro,resultado) => {
            if(erro){
                console.log(erro)
            }
            console.log(resultado)
        })
    }
    function maiorMortalidade(){
        db.all('SELECT (TotalDeaths*100)/TotalConfirmed as Mortalidade FROM corona ORDER BY (TotalDeaths*100)/TotalConfirmed DESC LIMIT 10',(erro,resultado) => {
            if(erro){
                console.log(erro)
            }
            console.log(resultado)
        })
    }
    
    function maiorRecuperacao(){
        db.all('SELECT (TotalRecovered*100)/TotalConfirmed as Recuperados FROM corona ORDER BY (TotalRecovered*100)/TotalConfirmed DESC LIMIT 10',(erro,resultado) => {
            if(erro){
                console.log(erro)
            }
            console.log(resultado)
        })
    }
    
        var choice = "";
    // do{
        console.log("Digite A para saber informacoes de um Pais em expecifico")
        console.log("Digite B para saber os 20 Paises mais infectados")
        console.log("Digite C para saber os 10 Paises com mais novos infectados")
        console.log("Digite D para saber os 10 Paises com maior mortalidade")
        console.log("Digite E para saber os 10 Paises com menor mortalidade")
        console.log("Digite F para saber os 10 Paises com maior numero de recuperacao")
        console.log("Digite G para saber os 10 Paises com maior percentual de mortalidade")
        console.log("Digite H para saber os 10 Paises com maior percentual de recuperacao")
        console.log("Digite S para sair do programa")
        choice = user.question("Escolha : ")
        if(choice.toUpperCase() === "A"){
            var paisEnt = user.question("Qual o nome do pais que deseja?\n>>")
            paisUnico(paisEnt)
        }else if(choice.toUpperCase() === "B"){
            paisesMaisInfec()
        }else if(choice.toUpperCase() === "C"){
            paisesMaisNovosInfec()
        }else if(choice.toUpperCase() === "D"){
            paisesMaisMortes()
        }else if(choice.toUpperCase() === "E"){
            paisesMenosMortes()
        }else if(choice.toUpperCase() === "F"){
            paisesMaisRecuperados()
        }else if(choice.toUpperCase() === "G"){
            maiorMortalidade()
        }else if(choice.toUpperCase() === "H"){
            maiorRecuperacao()
        }


    // }while(choice.toUpperCase() !== "S")