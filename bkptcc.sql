-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para stardev
DROP DATABASE IF EXISTS `stardev`;
CREATE DATABASE IF NOT EXISTS `stardev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;
USE `stardev`;

-- Copiando estrutura para tabela stardev.aulas
DROP TABLE IF EXISTS `aulas`;
CREATE TABLE IF NOT EXISTS `aulas` (
  `id_aula` int(11) NOT NULL AUTO_INCREMENT,
  `materia` varchar(50) NOT NULL DEFAULT '0',
  `duracao` varchar(50) NOT NULL DEFAULT '0',
  `qtd_aulas` int(10) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_aula`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Copiando dados para a tabela stardev.aulas: ~12 rows (aproximadamente)
DELETE FROM `aulas`;
INSERT INTO `aulas` (`id_aula`, `materia`, `duracao`, `qtd_aulas`) VALUES
	(1, 'Back-End', '1hora', 12),
	(2, 'FundamentosProgramacao', '1hora', 10),
	(3, 'LogicaProgramacao', '1hora', 10),
	(4, 'DesenvolvimentoWeb', '1hora', 11),
	(5, 'Front-End', '1hora', 11),
	(6, 'BancoDados', '1hora', 10),
	(7, 'ProjetoSoftware', '1hora', 12),
	(8, 'SegurancaInformacao', '1hora', 12),
	(9, 'CodigoLimpo', '1hora', 12),
	(10, 'DesenvolvimentoMobile', '1hora', 13),
	(11, 'RedesIOT', '1hora', 10),
	(12, 'LinguagemProgramacao', '1hora', 12);

-- Copiando estrutura para tabela stardev.cadastro
DROP TABLE IF EXISTS `cadastro`;
CREATE TABLE IF NOT EXISTS `cadastro` (
  `id_cadastro` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` text NOT NULL,
  `telefone` varchar(15) NOT NULL DEFAULT '',
  `nivel` varchar(50) DEFAULT 'U',
  PRIMARY KEY (`id_cadastro`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Copiando dados para a tabela stardev.cadastro: ~6 rows (aproximadamente)
DELETE FROM `cadastro`;
INSERT INTO `cadastro` (`id_cadastro`, `nome`, `email`, `senha`, `telefone`, `nivel`) VALUES
	(1, 'Melissa Vieira', 'melissateste@gmail.com', 'd97e69b8cb7e8e8f159d0a4b57d469e06bfe2f241322f7e663aa94555534a6e7', '2147483647', 'U'),
	(2, 'Lauane Ribeiro', 'lauaneteste@gmail.com', 'bfe61a27a6811bbd325383dee08c7dbd34c1886467f2f94e57cbedff9be0e073', '(18)98817-5506', 'U'),
	(3, 'BRUNO FERREIRA', 'brunoteste@hotmail.cm', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', '(18)98823-2550', 'U'),
	(4, 'Bruno Teste', 'BRUNÃOFERREIRÃO', 'b90fe858ff448ca34d553ee4d31b0ee2f566be6e3279a8de3df8d72a690d8d6e', '(18)98823-2550', 'U'),
	(5, 'Matheus Oliver', 'matheusoliveira@gmail.com', '1234567Matheus', '(18)98823-2550', 'U'),
	(6, 'Lauane Pasquini Ribeiro', 'lauane.ribeiro@aluno.senai.br', '$2b$10$9bhqeUJA3Nhc5Qr2Lu.4Neji1/3tqU7nBwHmcqri/YGCN4israxem', '(18) 99653-4326', 'U'),
	(7, 'Kemilly Reginão', 'kemillyrignao@email.com', '$2b$10$qDOJ1wAv9/GbumTqCT5rPOvKswj4aIZKEJggPJwujQTwHnAEk5Njq', '(18) 99689-5996', 'U');

-- Copiando estrutura para tabela stardev.contato
DROP TABLE IF EXISTS `contato`;
CREATE TABLE IF NOT EXISTS `contato` (
  `id_contato` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `comentario` text NOT NULL,
  PRIMARY KEY (`id_contato`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Copiando dados para a tabela stardev.contato: ~9 rows (aproximadamente)
DELETE FROM `contato`;
INSERT INTO `contato` (`id_contato`, `nome`, `email`, `comentario`) VALUES
	(1, 'Melissa Vieira', 'melissateste@gmail.com', 'Estou testando se deu tudo certo!eSPERO QUE SIM'),
	(2, 'melissa cristina', 'melissasteste@hotmail.cm', 'qqqqqqqqqqqqqqqqqqq'),
	(3, 'melissa cristina', 'melissasteste@hotmail.cm', 'rrrrrrrrrrrrrrrrr'),
	(4, 'Teste Nome', 'teste@email.com', 'Isso é um comentário válido'),
	(5, 'Melissa Vieira', 'melissacgv1@gmail.com', 'kkkkkkkkkkkkkkkkkkkkkkkkkk'),
	(6, 'testando se fun', 'testetestete@gmail.com', 'kkkkkkkkkkkkkkkkkkkkkkkkkk'),
	(7, 'BRUNO FERREIRA', 'BRUNÃOFERREIRÃO', 'TESTANDO O CONTATO'),
	(8, 'Maria Laura Pasquini Ribeiro', 'marialaurapasquini@gmail.com', 'Olá sou irmã da Lauane'),
	(9, 'Lauane Pasquini Ribeiro', 'lauane.ribeiro@aluno.senai.br', 'Melhor site que já vi em minha vida <3');

-- Copiando estrutura para tabela stardev.materias
DROP TABLE IF EXISTS `materias`;
CREATE TABLE IF NOT EXISTS `materias` (
  `id_materias` int(11) NOT NULL AUTO_INCREMENT,
  `nome_aulas` varchar(50) NOT NULL DEFAULT '0',
  `id_aulas` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_materias`),
  KEY `id_aulas` (`id_aulas`),
  CONSTRAINT `id_aulas` FOREIGN KEY (`id_aulas`) REFERENCES `aulas` (`id_aula`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- Copiando dados para a tabela stardev.materias: ~0 rows (aproximadamente)
DELETE FROM `materias`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
