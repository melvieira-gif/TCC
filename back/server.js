const express = require("express");
const app = express();
const porta = 3000;

const cors = require("cors");
const conexao = require("./db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "segredo_super_secreto";

app.use(express.json());
app.use(cors());

/* =========================
   MIDDLEWARE TOKEN (PADRÃO)
========================= */
function verificarToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ erro: "Token inválido" });
    }
}

/* =========================
   CONTATO
========================= */
app.post("/contato", async (req, res) => {
    try {
        const { nome = "", email = "", comentario = "" } = req.body;

        if (comentario.length < 10) {
            return res.json({ resposta: "Preencha o comentário corretamente" });
        }
        if (email.length < 6) {
            return res.json({ resposta: "Preencha o email corretamente" });
        }
        if (nome.length < 6) {
            return res.json({ resposta: "Preencha o nome completo" });
        }

        const sql = `INSERT INTO contato (nome, email, comentario) VALUES (?,?,?)`;
        const [resu] = await conexao.query(sql, [nome, email, comentario]);

        if (resu.affectedRows === 1) {
            return res.json({ resposta: "Mensagem enviada com sucesso" });
        }

        return res.json({ resposta: "Erro ao enviar mensagem" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: "Erro no servidor" });
    }
});

/* =========================
   CADASTRO
========================= */
app.post("/cadastro", async (req, res) => {
    try {
        const {
            nome = "",
            email = "",
            senha = "",
            telefone = ""
        } = req.body;

        const senhaTrim = senha.trim().replace("ㅤ", "");

        if (senhaTrim === "") {
            return res.json({ resposta: "Preencha uma senha" });
        }
        if (senhaTrim.length < 6) {
            return res.json({ resposta: "A senha deve ter pelo menos 6 caracteres" });
        }
        if (email.length < 6) {
            return res.json({ resposta: "Preencha o email corretamente" });
        }
        if (nome.length < 6) {
            return res.json({ resposta: "Preencha o nome completo" });
        }
        if (telefone.length <= 12) {
            return res.json({ resposta: "Preencha o telefone corretamente" });
        }

        // verificar email existente
        const sqlSelect = `SELECT * FROM cadastro WHERE email = ?`;
        const [rows] = await conexao.query(sqlSelect, [email]);

        if (rows.length !== 0) {
            return res.json({ resposta: "Email já cadastrado" });
        }

        const hash = await bcrypt.hash(senhaTrim, 10);

        const sqlInsert = `
            INSERT INTO cadastro (nome, email, senha, telefone)
            VALUES (?,?,?,?)
        `;
        const [resul] = await conexao.query(sqlInsert, [nome, email, hash, telefone]);

        if (resul.affectedRows === 1) {
            return res.json({ resposta: "Cadastro feito com sucesso!" });
        }

        return res.json({ resposta: "Erro ao cadastrar usuário" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: "Erro no servidor" });
    }
});

/* =========================
   LOGIN
========================= */
app.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        const emailTrim = email?.trim();
        const senhaTrim = senha?.trim();

        const sql = `SELECT * FROM cadastro WHERE email=?`;
        const [resultado] = await conexao.query(sql, [emailTrim]);

        if (resultado.length === 0) {
            return res.json({ resposta: "Email não cadastrado" });
        }

        const usuario = resultado[0];
        const senhaValida = await bcrypt.compare(senhaTrim, usuario.senha);

        if (!senhaValida) {
            return res.json({ resposta: "Email ou senha incorretos" });
        }

        

        const token = jwt.sign(
            {
                id: usuario.id_cadastro,
                email: usuario.email,
                nivel: usuario.nivel
            },
            SECRET,
            { expiresIn: "1h" }
        );

        return res.json({
            mensagem: "Acesso liberado",
            token: token,
            nivel: usuario.nivel 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: "Erro no servidor" });
    }
});

/* =========================
   CADASTRO DE AULAS (PROTEGIDO)
========================= */
app.post("/CadastroAulas", verificarToken, async (req, res) => {
    try {

        // 🔥 AQUI SIM!
        if (req.usuario.nivel !== "A") {
            return res.status(403).json({ resposta: "Acesso negado" });
        }

        const { materia, duracao, qtd_aulas } = req.body;

        const sql = `
            INSERT INTO aulas (materia, duracao, qtd_aulas)
            VALUES (?,?,?)
        `;

        const [result] = await conexao.query(sql, [materia, duracao, qtd_aulas]);

        if (result.affectedRows === 1) {
            return res.json({ resposta: "Aulas cadastradas com sucesso" });
        }

        return res.json({ resposta: "Erro ao cadastrar aulas" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: "Erro no servidor" });
    }
});
/* =========================
   TROCAR SENHA (LOGADO)
========================= */
app.put("/trocarSenha", verificarToken, async (req, res) => {
    try {
        const { novaSenha } = req.body;
        const userId = req.usuario.id;

        if (!novaSenha || novaSenha.trim().length < 6) {
            return res.json({ resposta: "Nova senha muito curta" });
        }

        const novaSenhaHash = await bcrypt.hash(novaSenha.trim(), 10);

        const sql = `UPDATE cadastro SET senha=? WHERE id_cadastro=?`;
        const [update] = await conexao.query(sql, [novaSenhaHash, userId]);

        if (update.affectedRows === 1) {
            return res.json({ resposta: "Senha alterada com sucesso" });
        }

        return res.json({ resposta: "Erro ao atualizar senha" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: "Erro no servidor" });
    }
});

/* =========================
   VERIFICAR EMAIL
========================= */
app.post("/verificarEmail", async (req, res) => {
    try {
        const { email } = req.body;

        const sql = `SELECT * FROM cadastro WHERE email=?`;
        const [resultado] = await conexao.query(sql, [email]);

        return res.json({ existe: resultado.length > 0 });

    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: "Erro no servidor" });
    }
});

/* =========================
   RECUPERAR SENHA (SEM TOKEN)
========================= */
app.put("/recuperarSenha", async (req, res) => {
    try {
        const { email, novaSenha } = req.body;

        if (!novaSenha || novaSenha.trim().length < 6) {
            return res.json({ resposta: "Senha inválida" });
        }

        const sql = `SELECT * FROM cadastro WHERE email=?`;
        const [user] = await conexao.query(sql, [email]);

        if (user.length === 0) {
            return res.json({ resposta: "Email não encontrado" });
        }

        const hash = await bcrypt.hash(novaSenha.trim(), 10);

        const update = `
            UPDATE cadastro
            SET senha=?
            WHERE email=?
        `;
        await conexao.query(update, [hash, email]);

        return res.json({ resposta: "Senha redefinida com sucesso" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: "Erro no servidor" });
    }
});

/* =========================
   ATUALIZAR USUÁRIO
========================= */
app.put("/usuario", verificarToken, async (req, res) => {
    try {
        const { nome, email, telefone } = req.body;
        const userId = req.usuario.id;

        const sql = `
            UPDATE cadastro
            SET nome=?, email=?, telefone=?
            WHERE id_cadastro=?
        `;

        const [result] = await conexao.query(sql, [nome, email, telefone, userId]);

        if (result.affectedRows === 1) {
            return res.json({ resposta: "Usuário atualizado com sucesso" });
        }

        return res.json({ resposta: "Erro ao atualizar usuário" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: "Erro no servidor" });
    }
});

/* =========================
   START
========================= */
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});