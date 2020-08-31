const fetch = require('node-fetch');
const fs = require('fs');

const gerarArquivo = fs.stat("./dados", erro => {
    if(erro) {
        fs.mkdir("./dados", erro => { if(erro) { throw erro }});
    } 

    const dado = "primeiro_nome,sobrenome,email,idade,genero,username,password,hash\n";
    const arquivo = "./dados/usuarios.csv";

    fs.writeFile(arquivo, dado, erro => { if(erro) { throw erro; }});
});

async function gerarUsuario() {
    try {
        gerarArquivo;

        const resposta = await fetch('https://randomuser.me/api/?results=100');
    
        if(resposta.ok) {
            const usuario = await resposta.json();
            const arquivo = "./dados/usuarios.csv";
    
            usuario.results.forEach(usuario => {
                const dados = fs.createWriteStream(arquivo, {flags: "a"});
    
                dados.write(`${usuario.name.first}, ${usuario.name.last}, ${usuario.email}, ${usuario.dob.age}, ${usuario.gender}, ${usuario.login.username}, ${usuario.login.password}, ${usuario.login.md5}\n`);
            });    
        }

        console.log("Feito! :D")
    } catch (erro){
        if(erro) {
            console.log("Esse foi o erro: " + erro)
        }
    }   
}

gerarUsuario();
