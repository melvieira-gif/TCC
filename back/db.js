//Meu arquivo de conexão com o banco de dados
const mysql = require('mysql2/promise')
//pool de conexao
const pool = mysql.createPool({
    //criar as configurações do Banco De Dados
<<<<<<< HEAD

    host:"localhost",
    host:"192.168.2.66",
=======
    host:"10.111.9.174",
>>>>>>> ad24f241ca642976a0d01375ae51d6e595005def
    user:"root",
    password:"",
    port:3306,
    database:"stardev",
    //não necessaria, mas 10conexões simultaneas
    waitForConnections:true,
    // máximo de conexões, quando chegar 11, ele, manda esperar até uma conexões, como a de cima seja liberada
    connectionLimit:10,

})
//exportando o arquivo db como um módulo
module.exports =  pool