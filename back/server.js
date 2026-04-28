const express = require("express")
const app = express()
const porta = 3000
const cors = require('cors')
const mysql = require('mysql2/promise')
const conexao = require('./db.js')
// Importando biblioteca de hash e salt
const bcrypt = require('bcrypt');
app.use(express.json())
app.use(cors())
const jwt = require("jsonwebtoken")
const SECRET = "segredo_super_secreto"
function verificarToken(req,res,next){
    const token = req.headers["authorization"]
    if(!token){
        return res.status(401).json({erro:"Token não enviado"})
    }
    try{
        const decoded = jwt.verify(token, SECRET)
        req.usuario = decoded
        next()
    }catch{
        return res.status(401).json({erro:"Token inválido"})
    }
}

app.post("/contato", async (req,res)=>{
    try {
        console.log("Chegou na rota !")
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
           senha = "",
           telefone=""
           } = req.body || {};
           const senhaTrim = senha.trim().replace("ㅤ", "");
           // tratativas para ver se esta tudo correto
    if (senhaTrim === ""){
        return res.json({
            "resposta": "Preencha uma senha"
        })} 
    if (senhaTrim.length < 6){
        return res.json({"resposta": "A senha tem que conter menos"});
    }
    if (email.length < 6){
        return res.json({"resposta": "Preencha o email"});
    }
    if (nome.length < 6){
        return res.json({"resposta": "Preencha o seu nome completo"});
    }
    if (telefone.length <= 12){
        return res.json({"resposta": "Prencha o seu telefone (XX)XXXXX-XXXX"});
    }
    // verificar email existente
    const sqlSelect = `SELECT * FROM cadastro WHERE email = ?`;
    const [rows] = await conexao.query(sqlSelect, [email]);
    if (rows.length !== 0){
        return res.json({"resposta":"Email já esta cadastrado! Tente novamente"});
    }
    // criar hash da senha
    const hash = await bcrypt.hash(senhaTrim, 10)
    // inserir novo usuário
    const sqlInsert = `INSERT INTO cadastro (nome, email, senha, telefone) VALUES (?,?,?,?)`;
    const [resul2] = await conexao.query(sqlInsert, [nome, email, hash, telefone]);
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
        const senhaValida = await bcrypt.compare(senhaTrim, hashdoBanco)
        if (senhaValida) {
            const usuario = resultado[0]
            const token = jwt.sign(
                {
                    // onde vai buscar o email
                    id: usuario.id_cadastro,
                    email: usuario.email,
                }, 
                SECRET, 
                {
                    expiresIn: "1h"
                })
            res.json({
                "mensagem":"Acesso Ok", 
                "token":token
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

app.post("/CadastroAulas", verificarToken ,async (req,res) =>{
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

function autenticarToken(req, res, next){
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido" });
        }
        req.usuario = user;
        next();
    });
}

app.put("/trocarSenha", autenticarToken, async (req, res) => {
    try {
        const { email, novaSenha } = req.body
        const userId = req.usuario.id
        // buscar usuário no banco
        const sql = "SELECT * FROM cadastro WHERE id = ?"
        const [resultado] = await conexao.query(sql, [userId])
        if (resultado.length === 0) {
            return res.json({ resposta: "Usuário não encontrado" })
        }
        const usuario = resultado[0]
        // validar nova senha
        if (!novaSenha || novaSenha.trim().length < 6) {
            return res.json({ resposta: "Nova senha muito curta" })
        }
        // gerar novo hash
        const novaSenhaHash = await bcrypt.hash(novaSenha.trim(), 10)
        // atualizar no banco
        const sqlUpdate = "UPDATE cadastro SET senha = ? WHERE id = ?"
        const [update] = await conexao.query(sqlUpdate, [novaSenhaHash, userId])
        if (update.affectedRows === 1) {
            return res.json({ resposta: "Senha alterada com sucesso!" })
        } else {
            return res.json({ resposta: "Erro ao atualizar senha" })
        }
    } catch (error) {
        console.log(error)
        return res.json({ resposta: "Erro no servidor" })
    }
})
app.post("/verificarEmail", async (req, res) => {
    try {
        const { email } = req.body
        const sql = "SELECT * FROM cadastro WHERE email = ?"
        const [resultado] = await conexao.query(sql, [email])
        if (resultado.length > 0) {
            return res.json({ existe: true })
        } else {
            return res.json({ existe: false })
        }
    } catch (error) {
        console.log(error)
        return res.json({ erro: "Erro no servidor" })
    }
})

app.listen(porta,()=>{
    console.log(`servidor rodando na porta ${porta}`)
})