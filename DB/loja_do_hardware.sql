-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.37 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para loja_do_hardware
CREATE DATABASE IF NOT EXISTS `loja_do_hardware` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `loja_do_hardware`;

-- Copiando estrutura para tabela loja_do_hardware.carrinho_hardware
CREATE TABLE IF NOT EXISTS `carrinho_hardware` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int DEFAULT NULL,
  `id_produto` int DEFAULT NULL,
  `quantidade` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_produto` (`id_produto`),
  CONSTRAINT `carrinho_hardware_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios_hardware` (`id`),
  CONSTRAINT `carrinho_hardware_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produtos_hardware` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela loja_do_hardware.carrinho_hardware: ~1 rows (aproximadamente)

-- Copiando estrutura para tabela loja_do_hardware.produtos_hardware
CREATE TABLE IF NOT EXISTS `produtos_hardware` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ativo` tinyint(1) NOT NULL DEFAULT (0),
  `nome` varchar(100) DEFAULT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  `preco` varchar(30) DEFAULT NULL,
  `imagem_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `marca` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `categoria` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `qtd_estoque` bigint NOT NULL DEFAULT (0),
  `qtd_vendido` bigint NOT NULL DEFAULT (0),
  `data_registro` timestamp NOT NULL DEFAULT (now()),
  `usuario_registro` varchar(50) DEFAULT NULL,
  `soma_avaliacoes` bigint unsigned DEFAULT '0',
  `total_avaliacoes` int unsigned DEFAULT '0',
  `avaliacao_media` decimal(3,2) GENERATED ALWAYS AS ((`soma_avaliacoes` / nullif(`total_avaliacoes`,0))) VIRTUAL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela loja_do_hardware.produtos_hardware: ~11 rows (aproximadamente)
INSERT INTO `produtos_hardware` (`id`, `ativo`, `nome`, `descricao`, `preco`, `imagem_url`, `marca`, `categoria`, `qtd_estoque`, `qtd_vendido`, `data_registro`, `usuario_registro`, `soma_avaliacoes`, `total_avaliacoes`) VALUES
	(1, 1, 'PLACA DE VIDEO RTX 4060 TI', '8GB GDDR5 192 BIT VENTUS 2X', '2500', 'https://images6.kabum.com.br/produtos/fotos/473206/placa-de-video-rtx-4060-ti-ventus-2x-black-8g-oc-msi-nvidia-geforce-8gb-gddr6-dlss-ray-tracing-g-sync-_1691522292_g.jpg', 'MSI', 'PLACA DE VIDEO', 20, 0, '2024-06-04 18:23:28', 'USUARIO ADMIN', 5, 1),
	(2, 1, 'PROCESSADOR AMD RYZEN 7 5800X', '3.8GHZ (4.7GHZ MAX TURBO)\r\nCACHE 36MB OCTA CORE 16 THREADS AM4\r\n', '1500', 'https://th.bing.com/th/id/OIP._qPvSq5eYRFEEQbe8WWrUwAAAA?rs=1&pid=ImgDetMain', 'AMD', 'PROCESSADOR', 15, 0, '2024-06-04 18:23:28', 'USUARIO ADMIN', 0, 0),
	(3, 1, 'AIR COOLER RISE MODE GAMER G800', 'RGB AMD E INTEL 180MM PRETO', '69', 'https://th.bing.com/th/id/OIP.Cl4_Gkg3Z7Cm9o3QCvWFawHaHa?rs=1&pid=ImgDetMain', 'MODE GAMER', 'COOLER', 5, 0, '2024-06-04 18:23:28', 'USUARIO ADMIN', 0, 0),
	(4, 1, 'FONTE SAFEGAMER 550W', 'FULL MODULAR PFC ATIVO', '189', 'https://a-static.mlcdn.com.br/800x560/fonte-safegamer-550w-full-modular-pfc-ativo/olistplus/o2ez7pdnioggw9zl/ce1a68bf00a5c1fe53c4bbcab39d3c39.jpeg', 'SAFEGAMER', 'FONTE', 10, 0, '2024-06-04 18:23:28', 'USUARIO ADMIN', 0, 0),
	(5, 1, 'SSD ARKTEK 512GB M.2', 'PCIE NVME LEITURA 2000 MB/S GRAVAÇÃO 1600 MB/S', '199', 'https://www.arktekco.com/wp-content/uploads/2021/11/Mockup-2-512G-SSD-1.jpg', 'ARKTEK', 'ARMAZENAMENTO', 30, 0, '2024-06-04 18:23:28', 'USUARIO ADMIN', 0, 0),
	(6, 1, 'GABINETE HAYOM', 'MID TOWER COM 4 FANS', '299', 'https://cdn.awsli.com.br/800x800/2547/2547358/produto/207713070/gabinete-gamer-hayom-gb1749-1-tgvmkx.jpg', 'HAYOM', 'GABINETE', 10, 0, '2024-06-04 18:23:28', 'USUARIO ADMIN', 0, 0),
	(7, 1, 'SSD WD GREEN 2TB M.2', 'PCIE NVME LEITURA 3200 MB/S GRAVAÇÃO 3000 MB/S', '830', 'https://th.bing.com/th/id/OIP.FXMhk3F0ru-Yi6x4c0VH9gHaHK?rs=1&pid=ImgDetMain', 'WESTERN DIGITAL WD', 'ARMAZENAMENTO', 5, 0, '2024-06-04 18:23:28', 'USUARIO ADMIN', 0, 0),
	(8, 1, 'PLACA MAE ASUS TUF GAMING B550M PLUS', 'AM4 MATX DDR4', '929', 'https://th.bing.com/th/id/OIP.7htp-99VxmJCsGgz3zJFTAAAAA?rs=1&pid=ImgDetMain', 'ASUS', 'PLACA MAE', 16, 0, '2024-06-04 18:23:28', 'USUARIO ADMIN', 0, 0),
	(9, 1, 'MEMORIA RAM 16GB DDR4', '2666 MHZ', '220', 'https://images6.kabum.com.br/produtos/fotos/79936/79936_1520000156_g.jpg', 'HYPERX', 'MEMORIA RAM', 2, 0, '2024-06-04 18:23:28', 'USUARIO ADMIN', 0, 0),
	(22, 1, 'PLACA DE VIDEO AORUS RTX 4090', '24GB GDDR6X 384-BIT', '22933', 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/589578/Geforce-RTX-4090-Aorus-Master-24gb-Gddr6x-384-bit-Gv-n4090aorus-M-24gd_1717422489_gg.jpg', 'AORUS MASTER', 'PLACA DE VIDEO', 4, 0, '2024-06-06 17:00:47', 'USUARIO ADMIN', 0, 0),
	(24, 1, 'PROCESSADOR AMD RYZEN THREADRIPPER PRO 5975WX', '128 MB 32 NUCLEOS 64 THREADS 4.5 GHZ BOOST CLOCK', '19989', 'https://images.kabum.com.br/produtos/fotos/368278/processador-amd-ryzen-threadripper-pro-5975wx-2mb-octa-core-sp3-wof-100-100000445wof_1659725354_gg.jpg', 'AMD', 'PROCESSADOR', 1, 0, '2024-06-06 20:55:53', 'USUARIO ADMIN', 5, 1);

-- Copiando estrutura para tabela loja_do_hardware.usuarios_hardware
CREATE TABLE IF NOT EXISTS `usuarios_hardware` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin` tinyint(1) NOT NULL DEFAULT (0),
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `usuario` varchar(20) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  `senha` varchar(64) NOT NULL,
  `rua` varchar(150) DEFAULT NULL,
  `bairro` varchar(50) DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `cep` varchar(8) DEFAULT NULL,
  `cidade` varchar(150) DEFAULT NULL,
  `estado` varchar(2) DEFAULT NULL,
  `data_registro` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela loja_do_hardware.usuarios_hardware: ~3 rows (aproximadamente)
INSERT INTO `usuarios_hardware` (`id`, `admin`, `ativo`, `usuario`, `nome`, `email`, `cpf`, `senha`, `rua`, `bairro`, `numero`, `cep`, `cidade`, `estado`, `data_registro`) VALUES
	(1, 1, 1, 'root', 'USUARIO ADMIN', 'admin.user@email.com', '12345678910', '$2b$10$yhMT1n2OTpxnO6K5/uB0MuxFO1igzRQOHig.ZMpxCMvH4ng8ZX0tO', 'RUA TAl', 'CENTRO', '999', '99999000', 'NOVA PRATA', 'RS', '2024-06-04 18:23:28'),
	(3, 0, 1, 'USER2', 'TESTE', 'teste.user@email.com.br', '99999999998', '$2b$10$YjKJoXTtm95akBiKbUmXredvO0WJyoO7SMc38ARKCDAsgQE9SytiK', 'TETTE RUA', 'CENTRO', '999', '95320000', 'NOVA PRATA', 'RS', '2024-06-04 18:23:28');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
