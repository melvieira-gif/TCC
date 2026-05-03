const express = require('express')
const path = require('path')
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors')
const mysql = require('mysql2/promise')
const conexao = require('./db.js')
// Importando biblioteca de hash e salt
const bcrypt = require('bcrypt');
app.use(express.json())
app.use(cors())


app.use(express.static ('public'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post("/contato", async (req,res)=>{
    try {


        console.log("CHegou na rota !")

        const{nome, email, comentario} = req.body

        if(comentario.length <10){
            return res.json({resposta: "preencha o comentario"})
        }else if(email.length <6){
            return res.json({resposta: "Preencha o email"})
        }else if(nome.length <6){
            return res.json({resposta: "preencha o nome"})
        }
        // MYSQL - NOME TABELA CONTATO 
        let sql = `INSERT INTO contato (nome, email, comentario) VALUES (?,?,?)`
        let [resu2] = await conexao.query(sql,[nome, email, comentario])

        //verificando se tem mensagem
        if(resu2.affectedRows == 1){
            return res.json({resposta: "mensgame feita com sucesso"})
        }else{
            return res.json({resposta:"está sem mensagem"})
        }

    } catch (error) {
        console.log(error)
    }
})

//SENHA
app.get("/hash", async (req,res)=>{
    try {
        let {senha} = req.body
        senha = senha.trim()
        senha = senha.replace(("ㅤ", ""))

        if(senha==""){
            return res.send("Preencha uma senha ")
        }else if(senha.length < 6){
            return res.send("A senha tem que conter menos")
        }


        const hash = crypto.createHash("sha256").update(senha).digest("hex")
        res.send(` Usuario cadastrado com Sucesso ${hash} `)
        

    } catch (error) {
       console.log(`O seu erro foi ${error}`) 
    }
})

app.post("/cadastro", async (req,res)=>{
    try {
        // garante que todos os campos existem
       const {
           nome = "",
           email = "",
           telefone = "",
           senha = ""
           } = req.body || {};
           const senhaTrim = senha.trim().replace("ㅤ", "");
           // tratativas para ver se esta tudo correto
    if (senhaTrim === ""){
        return res.json({
            "resposta": "Preencha uma senha"
        })
    } 
    if (senhaTrim.length < 6){
        return res.json({"resposta": "A senha tem que conter menos"});
    }
    if (email.length < 6){
        return res.json({"resposta": "Preencha o email"});
    }
    if (nome.length < 6){
        return res.json({"resposta": "Preencha o seu nome completo"});
    }
    if (telefone.length <= 13){
        return res.json({"resposta": "Prencha o seu telefone (XX)XXXXX-XXXX"});
    }

    // verificar email existente
    const sqlSelect = `SELECT * FROM cadastro WHERE email = ?`;
    const [rows] = await conexao.query(sqlSelect, [email]);
    
    // criar hash da senha
    const crypto = require("crypto");
    const hash = crypto.createHash("sha256").update(senhaTrim).digest("hex");

    // inserir novo usuário
    const sqlInsert = `INSERT INTO cadastro (nome, email, telefone, senha) VALUES (?,?,?,?)`;
    const [resul2] = await conexao.query(sqlInsert, [nome, email, telefone, hash]);

    if (resul2.affectedRows === 1){
        return res.json({"resposta":"Cadastro feito com sucesso!"});
    } 
    return res.json({"resposta":"Erro ao fazer o cadastro"});    

    
    } catch (error) {
        console.log(error)
        return res.json({erro: "Erro interno no servidor"});
    }
})


app.post("/login", async (req,res) =>{
    try {
        const {email, senha} = req.body
        const emailTrim = email?.trim()
        const senhaTrim = senha?.trim()

        let sql = `SELECT * FROM cadastro WHERE email=?`
        const [resultado] = await conexao.query(sql, [emailTrim])

        if (resultado.length == 0){
            return res.json ({"resposta":"email não cadastrado"})
        }

        const hashdoBanco = resultado[0].senha
        const crypto = require("crypto")
        const hash = crypto.createHash("sha256").update(senhaTrim).digest("hex")
        
        if (hash === hashdoBanco) {
            return res.json ({
                "resposta":"Login feito com sucesso"
            })
        } else {
            return res.json ({
                "resposta":"Seu email ou senha estão incorretos"
            })
        }

    } catch (error) {
        console.log (`O erro é ${error}`)
    }
})

app.post("/CadastroAulas", async (req,res) =>{
    try {
        const {materia, duracao, qtd_aulas} = req.body
        let sql = `INSERT INTO aulas (materia, duracao, qtd_aulas) VALUES (?,?,?)`
        let [resuAulas] = await conexao.query(sql, [materia, duracao, qtd_aulas])

        if(resuAulas.affectedRows == 1){
            return res.json({resposta:"Aulas cadastradas com sucesso"})
        }else{
            return res.json({resposta:"Erro ao cadastrar aulas"})
        }

    } catch (error) {
        console.log(error)
        return res.json({resposta:"erro no servidor"})
    }
})

app.listen(3000, () =>{
    console.log("servidor rodando na porta 3000")
    console.log(`Abre o link http://192.168.2.66:3000`)
})

