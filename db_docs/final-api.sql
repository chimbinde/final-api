-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19-Ago-2020 às 01:26
-- Versão do servidor: 10.4.11-MariaDB
-- versão do PHP: 7.3.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `final-api`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno`
--

CREATE TABLE `aluno` (
  `idpessoa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `aluno`
--

INSERT INTO `aluno` (`idpessoa`) VALUES
(1),
(2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno_avaliacao`
--

CREATE TABLE `aluno_avaliacao` (
  `iddisciplinas` int(11) NOT NULL,
  `idpessoa` int(11) NOT NULL,
  `nota` int(11) DEFAULT NULL,
  `vezes` int(11) NOT NULL,
  `inicio` timestamp NULL DEFAULT current_timestamp(),
  `fim` timestamp NULL DEFAULT NULL,
  `fechada` tinyint(1) DEFAULT NULL,
  `avaliacao_id` int(11) NOT NULL,
  `avaliacao_idpessoa` int(11) NOT NULL,
  `avaliacao_iddisciplinas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `aluno_avaliacao`
--

INSERT INTO `aluno_avaliacao` (`iddisciplinas`, `idpessoa`, `nota`, `vezes`, `inicio`, `fim`, `fechada`, `avaliacao_id`, `avaliacao_idpessoa`, `avaliacao_iddisciplinas`) VALUES
(2, 1, 13, 1, '2020-08-06 02:58:13', NULL, 1, 1, 2, 2),
(3, 1, 0, 1, '2020-08-10 22:30:22', NULL, 1, 1, 2, 3),
(2, 1, 8, 2, '2020-08-05 17:17:13', NULL, 1, 1, 2, 2),
(2, 1, 10, 3, '2020-08-05 17:17:13', NULL, 1, 1, 2, 2),
(2, 1, 10, 4, '2020-08-05 17:17:13', NULL, 1, 1, 2, 2),
(2, 1, 0, 5, '2020-08-08 14:17:30', NULL, 1, 1, 2, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno_disc`
--

CREATE TABLE `aluno_disc` (
  `iddisciplinas` int(11) NOT NULL,
  `idpessoa` int(11) NOT NULL,
  `anocadastro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `aluno_disc`
--

INSERT INTO `aluno_disc` (`iddisciplinas`, `idpessoa`, `anocadastro`) VALUES
(1, 1, 2020),
(2, 1, 2020),
(3, 1, 2020),
(4, 1, 2020),
(6, 1, 2020);

-- --------------------------------------------------------

--
-- Estrutura da tabela `areatematica`
--

CREATE TABLE `areatematica` (
  `idareatematica` int(11) NOT NULL,
  `areatematica` varchar(45) DEFAULT NULL,
  `iddisciplinas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `areatematica`
--

INSERT INTO `areatematica` (`idareatematica`, `areatematica`, `iddisciplinas`) VALUES
(1, 'Dinamica', 2),
(2, 'Fisica Quantica', 2),
(3, 'Fisica dos fluidos', 2),
(4, 'Estatica', 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `avaliacao`
--

CREATE TABLE `avaliacao` (
  `idpessoa` int(11) NOT NULL,
  `iddisciplinas` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `datacriada` datetime DEFAULT current_timestamp(),
  `dataeditada` datetime DEFAULT current_timestamp(),
  `descricao` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `avaliacao`
--

INSERT INTO `avaliacao` (`idpessoa`, `iddisciplinas`, `id`, `datacriada`, `dataeditada`, `descricao`) VALUES
(2, 2, 1, '2020-07-24 00:00:00', '2020-07-24 00:00:00', 'Exame de admissao de fisica 2020'),
(2, 3, 1, '2020-07-21 00:00:00', '2020-07-24 00:00:00', 'Exame de 2008'),
(2, 4, 1, '2020-07-21 00:00:00', '2020-07-21 00:00:00', 'Exame de preparacao');

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoriadisc`
--

CREATE TABLE `categoriadisc` (
  `idcategoriadisc` int(11) NOT NULL,
  `categoriadisc` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `categoriadisc`
--

INSERT INTO `categoriadisc` (`idcategoriadisc`, `categoriadisc`) VALUES
(1, 'letras'),
(2, 'ciencias');

-- --------------------------------------------------------

--
-- Estrutura da tabela `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `active` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `disciplinas`
--

CREATE TABLE `disciplinas` (
  `iddisciplinas` int(11) NOT NULL,
  `nomedisc` varchar(45) DEFAULT NULL,
  `idcategoriadisc` int(11) NOT NULL,
  `descr` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `disciplinas`
--

INSERT INTO `disciplinas` (`iddisciplinas`, `nomedisc`, `idcategoriadisc`, `descr`) VALUES
(1, 'Matematica', 2, 'Matemática é a área do conhecimento que envolve o estudo da aritmética, álgebra, geometria, trigonometria, estatística e cálculo, em busca da sistematização de quantidades,'),
(2, 'Fisica', 2, ' é a ciência que estuda a natureza e seus fenômenos em seus aspectos mais gerais. Analisa suas relações e propriedades, além de descrever e explicar a maior parte de suas consequências.'),
(3, 'Quimica', 2, 'Matemática é a área do conhecimento que envolve o estudo da aritmética, álgebra, geometria, trigonometria, estatística e cálculo, em busca da sistematização de quantidades,'),
(4, 'Portugues', 1, 'Matemática é a área do conhecimento que envolve o estudo da aritmética, álgebra, geometria, trigonometria, estatística e cálculo, em busca da sistematização de quantidades,'),
(6, 'Geografia', 2, 'Matemática é a área do conhecimento que envolve o estudo da aritmética, álgebra, geometria, trigonometria, estatística e cálculo, em busca da sistematização de quantidades,'),
(7, 'Desenho', 2, 'Matemática é a área do conhecimento que envolve o estudo da aritmética, álgebra, geometria, trigonometria, estatística e cálculo, em busca da sistematização de quantidades,'),
(8, 'Historia', 2, 'Matemática é a área do conhecimento que envolve o estudo da aritmética, álgebra, geometria, trigonometria, estatística e cálculo, em busca da sistematização de quantidades,');

-- --------------------------------------------------------

--
-- Estrutura da tabela `escola`
--

CREATE TABLE `escola` (
  `idescola` int(11) NOT NULL,
  `nomeescola` varchar(45) DEFAULT NULL,
  `idprovincia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `escola`
--

INSERT INTO `escola` (`idescola`, `nomeescola`, `idprovincia`) VALUES
(1, 'Escola secundaria Samora Moises Machel', 1),
(2, 'Escola Secundria da Fatima', 1),
(3, 'Escola Secundaria de Nampula', 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `pais`
--

CREATE TABLE `pais` (
  `idpais` int(11) NOT NULL,
  `nomepais` varchar(45) DEFAULT NULL,
  `nomepais1` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pais`
--

INSERT INTO `pais` (`idpais`, `nomepais`, `nomepais1`) VALUES
(1, 'AFEGANISTÃO', 'AFGHANISTAN'),
(2, 'ACROTÍRI E DECELIA', 'AKROTIRI E DEKÉLIA'),
(3, 'ÁFRICA DO SUL', 'SOUTH AFRICA'),
(4, 'ALBÂNIA', 'ALBANIA'),
(5, 'ALEMANHA', 'GERMANY'),
(6, 'AMERICAN SAMOA', 'AMERICAN SAMOA'),
(7, 'ANDORRA', 'ANDORRA'),
(8, 'ANGOLA', 'ANGOLA'),
(9, 'ANGUILLA', 'ANGUILLA'),
(10, 'ANTÍGUA E BARBUDA', 'ANTIGUA AND BARBUDA'),
(11, 'ANTILHAS NEERLANDESAS', 'NETHERLANDS ANTILLES'),
(12, 'ARÁBIA SAUDITA', 'SAUDI ARABIA'),
(13, 'ARGÉLIA', 'ALGERIA'),
(14, 'ARGENTINA', 'ARGENTINA'),
(15, 'ARMÉNIA', 'ARMENIA'),
(16, 'ARUBA', 'ARUBA'),
(17, 'AUSTRÁLIA', 'AUSTRALIA'),
(18, 'ÁUSTRIA', 'AUSTRIA'),
(19, 'AZERBAIJÃO', 'AZERBAIJAN'),
(20, 'BAHAMAS', 'BAHAMAS, THE'),
(21, 'BANGLADECHE', 'BANGLADESH'),
(22, 'BARBADOS', 'BARBADOS'),
(23, 'BARÉM', 'BAHRAIN'),
(24, 'BASSAS DA ÍNDIA', 'BASSAS DA INDIA'),
(25, 'BÉLGICA', 'BELGIUM'),
(26, 'BELIZE', 'BELIZE'),
(27, 'BENIM', 'BENIN'),
(28, 'BERMUDAS', 'BERMUDA'),
(29, 'BIELORRÚSSIA', 'BELARUS'),
(30, 'BOLÍVIA', 'BOLIVIA'),
(31, 'BÓSNIA E HERZEGOVINA', 'BOSNIA AND HERZEGOVINA'),
(32, 'BOTSUANA', 'BOTSWANA'),
(33, 'BRASIL', 'BRAZIL'),
(34, 'BRUNEI DARUSSALAM', 'BRUNEI DARUSSALAM'),
(35, 'BULGÁRIA', 'BULGARIA'),
(36, 'BURQUINA FASO', 'BURKINA FASO'),
(37, 'BURUNDI', 'BURUNDI'),
(38, 'BUTÃO', 'BHUTAN'),
(39, 'CABO VERDE', 'CAPE VERDE'),
(40, 'CAMARÕES', 'CAMEROON'),
(41, 'CAMBOJA', 'CAMBODIA'),
(42, 'CANADÁ', 'CANADA'),
(43, 'CATAR', 'QATAR'),
(44, 'CAZAQUISTÃO', 'KAZAKHSTAN'),
(45, 'CENTRO-AFRICANA REPÚBLICA', 'CENTRAL AFRICAN REPUBLIC'),
(46, 'CHADE', 'CHAD'),
(47, 'CHILE', 'CHILE'),
(48, 'CHINA', 'CHINA'),
(49, 'CHIPRE', 'CYPRUS'),
(50, 'COLÔMBIA', 'COLOMBIA'),
(51, 'COMORES', 'COMOROS'),
(52, 'CONGO', 'CONGO'),
(53, 'CONGO REPÚBLICA DEMOCRÁTICA', 'CONGO DEMOCRATIC REPUBLIC'),
(54, 'COREIA DO NORTE', 'KOREA NORTH'),
(55, 'COREIA DO SUL', 'KOREA SOUTH'),
(56, 'COSTA DO MARFIM', 'IVORY COAST'),
(57, 'COSTA RICA', 'COSTA RICA'),
(58, 'CROÁCIA', 'CROATIA'),
(59, 'CUBA', 'CUBA'),
(60, 'DINAMARCA', 'DENMARK'),
(61, 'DOMÍNICA', 'DOMINICA'),
(62, 'EGIPTO', 'EGYPT'),
(63, 'EMIRADOS ÁRABES UNIDOS', 'UNITED ARAB EMIRATES'),
(64, 'EQUADOR', 'ECUADOR'),
(65, 'ERITREIA', 'ERITREA'),
(66, 'ESLOVÁQUIA', 'SLOVAKIA'),
(67, 'ESLOVÉNIA', 'SLOVENIA'),
(68, 'ESPANHA', 'SPAIN'),
(69, 'ESTADOS UNIDOS', 'UNITED STATES'),
(70, 'ESTÓNIA', 'ESTONIA'),
(71, 'ETIÓPIA', 'ETHIOPIA'),
(72, 'FAIXA DE GAZA', 'GAZA STRIP'),
(73, 'FIJI', 'FIJI'),
(74, 'FILIPINAS', 'PHILIPPINES'),
(75, 'FINLÂNDIA', 'FINLAND'),
(76, 'FRANÇA', 'FRANCE'),
(77, 'GABÃO', 'GABON'),
(78, 'GÂMBIA', 'GAMBIA'),
(79, 'GANA', 'GHANA'),
(80, 'GEÓRGIA', 'GEORGIA'),
(81, 'GIBRALTAR', 'GIBRALTAR'),
(82, 'GRANADA', 'GRENADA'),
(83, 'GRÉCIA', 'GREECE'),
(84, 'GRONELÂNDIA', 'GREENLAND'),
(85, 'GUADALUPE', 'GUADELOUPE'),
(86, 'GUAM', 'GUAM'),
(87, 'GUATEMALA', 'GUATEMALA'),
(88, 'GUERNSEY', 'GUERNSEY'),
(89, 'GUIANA', 'GUYANA'),
(90, 'GUIANA FRANCESA', 'FRENCH GUIANA'),
(91, 'GUINÉ', 'GUINEA'),
(92, 'GUINÉ EQUATORIAL', 'EQUATORIAL GUINEA'),
(93, 'GUINÉ-BISSAU', 'GUINEA-BISSAU'),
(94, 'HAITI', 'HAITI'),
(95, 'HONDURAS', 'HONDURAS'),
(96, 'HONG KONG', 'HONG KONG'),
(97, 'HUNGRIA', 'HUNGARY'),
(98, 'IÉMEN', 'YEMEN'),
(99, 'ILHA BOUVET', 'BOUVET ISLAND'),
(100, 'ILHA CHRISTMAS', 'CHRISTMAS ISLAND'),
(101, 'ILHA DE CLIPPERTON', 'CLIPPERTON ISLAND'),
(102, 'ILHA DE JOÃO DA NOVA', 'JUAN DE NOVA ISLAND'),
(103, 'ILHA DE MAN', 'ISLE OF MAN'),
(104, 'ILHA DE NAVASSA', 'NAVASSA ISLAND'),
(105, 'ILHA EUROPA', 'EUROPA ISLAND'),
(106, 'ILHA NORFOLK', 'NORFOLK ISLAND'),
(107, 'ILHA TROMELIN', 'TROMELIN ISLAND'),
(108, 'ILHAS ASHMORE E CARTIER', 'ASHMORE AND CARTIER ISLANDS'),
(109, 'ILHAS CAIMAN', 'CAYMAN ISLANDS'),
(110, 'ILHAS COCOS (KEELING)', 'COCOS (KEELING) ISLANDS'),
(111, 'ILHAS COOK', 'COOK ISLANDS'),
(112, 'ILHAS DO MAR DE CORAL', 'CORAL SEA ISLANDS'),
(113, 'ILHAS FALKLANDS (ILHAS MALVINAS)', 'FALKLAND ISLANDS (ISLAS MALVINAS)'),
(114, 'ILHAS FEROE', 'FAROE ISLANDS'),
(115, 'ILHAS GEÓRGIA DO SUL E SANDWICH DO SUL', 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS'),
(116, 'ILHAS MARIANAS DO NORTE', 'NORTHERN MARIANA ISLANDS'),
(117, 'ILHAS MARSHALL', 'MARSHALL ISLANDS'),
(118, 'ILHAS PARACEL', 'PARACEL ISLANDS'),
(119, 'ILHAS PITCAIRN', 'PITCAIRN ISLANDS'),
(120, 'ILHAS SALOMÃO', 'SOLOMON ISLANDS'),
(121, 'ILHAS SPRATLY', 'SPRATLY ISLANDS'),
(122, 'ILHAS VIRGENS AMERICANAS', 'UNITED STATES VIRGIN ISLANDS'),
(123, 'ILHAS VIRGENS BRITÂNICAS', 'BRITISH VIRGIN ISLANDS'),
(124, 'ÍNDIA', 'INDIA'),
(125, 'INDONÉSIA', 'INDONESIA'),
(126, 'IRÃO', 'IRAN'),
(127, 'IRAQUE', 'IRAQ'),
(128, 'IRLANDA', 'IRELAND'),
(129, 'ISLÂNDIA', 'ICELAND'),
(130, 'ISRAEL', 'ISRAEL'),
(131, 'ITÁLIA', 'ITALY'),
(132, 'JAMAICA', 'JAMAICA'),
(133, 'JAN MAYEN', 'JAN MAYEN'),
(134, 'JAPÃO', 'JAPAN'),
(135, 'JERSEY', 'JERSEY'),
(136, 'JIBUTI', 'DJIBOUTI'),
(137, 'JORDÂNIA', 'JORDAN'),
(138, 'KIRIBATI', 'KIRIBATI'),
(139, 'KOWEIT', 'KUWAIT'),
(140, 'LAOS', 'LAOS'),
(141, 'LESOTO', 'LESOTHO'),
(142, 'LETÓNIA', 'LATVIA'),
(143, 'LÍBANO', 'LEBANON'),
(144, 'LIBÉRIA', 'LIBERIA'),
(145, 'LÍBIA', 'LIBYAN ARAB JAMAHIRIYA'),
(146, 'LISTENSTAINE', 'LIECHTENSTEIN'),
(147, 'LITUÂNIA', 'LITHUANIA'),
(148, 'LUXEMBURGO', 'LUXEMBOURG'),
(149, 'MACAU', 'MACAO'),
(150, 'MACEDÓNIA', 'MACEDONIA'),
(151, 'MADAGÁSCAR', 'MADAGASCAR'),
(152, 'MALÁSIA', 'MALAYSIA'),
(153, 'MALAVI', 'MALAWI'),
(154, 'MALDIVAS', 'MALDIVES'),
(155, 'MALI', 'MALI'),
(156, 'MALTA', 'MALTA'),
(157, 'MARROCOS', 'MOROCCO'),
(158, 'MARTINICA', 'MARTINIQUE'),
(159, 'MAURÍCIA', 'MAURITIUS'),
(160, 'MAURITÂNIA', 'MAURITANIA'),
(161, 'MAYOTTE', 'MAYOTTE'),
(162, 'MÉXICO', 'MEXICO'),
(163, 'MIANMAR', 'MYANMAR BURMA'),
(164, 'MICRONÉSIA', 'MICRONESIA'),
(165, 'MOÇAMBIQUE', 'MOZAMBIQUE'),
(166, 'MOLDÁVIA', 'MOLDOVA'),
(167, 'MÓNACO', 'MONACO'),
(168, 'MONGÓLIA', 'MONGOLIA'),
(169, 'MONTENEGRO', 'MONTENEGRO'),
(170, 'MONTSERRAT', 'MONTSERRAT'),
(171, 'NAMÍBIA', 'NAMIBIA'),
(172, 'NAURU', 'NAURU'),
(173, 'NEPAL', 'NEPAL'),
(174, 'NICARÁGUA', 'NICARAGUA'),
(175, 'NÍGER', 'NIGER'),
(176, 'NIGÉRIA', 'NIGERIA'),
(177, 'NIUE', 'NIUE'),
(178, 'NORUEGA', 'NORWAY'),
(179, 'NOVA CALEDÓNIA', 'NEW CALEDONIA'),
(180, 'NOVA ZELÂNDIA', 'NEW ZEALAND'),
(181, 'OMÃ', 'OMAN'),
(182, 'PAÍSES BAIXOS', 'NETHERLANDS'),
(183, 'PALAU', 'PALAU'),
(184, 'PALESTINA', 'PALESTINE'),
(185, 'PANAMÁ', 'PANAMA'),
(186, 'PAPUÁSIA-NOVA GUINÉ', 'PAPUA NEW GUINEA'),
(187, 'PAQUISTÃO', 'PAKISTAN'),
(188, 'PARAGUAI', 'PARAGUAY'),
(189, 'PERU', 'PERU'),
(190, 'POLINÉSIA FRANCESA', 'FRENCH POLYNESIA'),
(191, 'POLÓNIA', 'POLAND'),
(192, 'PORTO RICO', 'PUERTO RICO'),
(193, 'PORTUGAL', 'PORTUGAL'),
(194, 'QUÉNIA', 'KENYA'),
(195, 'QUIRGUIZISTÃO', 'KYRGYZSTAN'),
(196, 'REINO UNIDO', 'UNITED KINGDOM'),
(197, 'REPÚBLICA CHECA', 'CZECH REPUBLIC'),
(198, 'REPÚBLICA DOMINICANA', 'DOMINICAN REPUBLIC'),
(199, 'ROMÉNIA', 'ROMANIA'),
(200, 'RUANDA', 'RWANDA'),
(201, 'RÚSSIA', 'RUSSIAN FEDERATION'),
(202, 'SAHARA OCCIDENTAL', 'WESTERN SAHARA'),
(203, 'SALVADOR', 'EL SALVADOR'),
(204, 'SAMOA', 'SAMOA'),
(205, 'SANTA HELENA', 'SAINT HELENA'),
(206, 'SANTA LÚCIA', 'SAINT LUCIA'),
(207, 'SANTA SÉ', 'HOLY SEE'),
(208, 'SÃO CRISTÓVÃO E NEVES', 'SAINT KITTS AND NEVIS'),
(209, 'SÃO MARINO', 'SAN MARINO'),
(210, 'SÃO PEDRO E MIQUELÃO', 'SAINT PIERRE AND MIQUELON'),
(211, 'SÃO TOMÉ E PRÍNCIPE', 'SAO TOME AND PRINCIPE'),
(212, 'SÃO VICENTE E GRANADINAS', 'SAINT VINCENT AND THE GRENADINES'),
(213, 'SEICHELES', 'SEYCHELLES'),
(214, 'SENEGAL', 'SENEGAL'),
(215, 'SERRA LEOA', 'SIERRA LEONE'),
(216, 'SÉRVIA', 'SERBIA'),
(217, 'SINGAPURA', 'SINGAPORE'),
(218, 'SÍRIA', 'SYRIA'),
(219, 'SOMÁLIA', 'SOMALIA'),
(220, 'SRI LANCA', 'SRI LANKA'),
(221, 'SUAZILÂNDIA', 'SWAZILAND'),
(222, 'SUDÃO', 'SUDAN'),
(223, 'SUÉCIA', 'SWEDEN'),
(224, 'SUÍÇA', 'SWITZERLAND'),
(225, 'SURINAME', 'SURINAME'),
(226, 'SVALBARD', 'SVALBARD'),
(227, 'TAILÂNDIA', 'THAILAND'),
(228, 'TAIWAN', 'TAIWAN'),
(229, 'TAJIQUISTÃO', 'TAJIKISTAN'),
(230, 'TANZÂNIA', 'TANZANIA'),
(231, 'TERRITÓRIO BRITÂNICO DO OCEANO ÍNDICO', 'BRITISH INDIAN OCEAN TERRITORY'),
(232, 'TERRITÓRIO DAS ILHAS HEARD E MCDONALD', 'HEARD ISLAND AND MCDONALD ISLANDS'),
(233, 'TIMOR-LESTE', 'TIMOR-LESTE'),
(234, 'TOGO', 'TOGO'),
(235, 'TOKELAU', 'TOKELAU'),
(236, 'TONGA', 'TONGA'),
(237, 'TRINDADE E TOBAGO', 'TRINIDAD AND TOBAGO'),
(238, 'TUNÍSIA', 'TUNISIA'),
(239, 'TURKS E CAICOS', 'TURKS AND CAICOS ISLANDS'),
(240, 'TURQUEMENISTÃO', 'TURKMENISTAN'),
(241, 'TURQUIA', 'TURKEY'),
(242, 'TUVALU', 'TUVALU'),
(243, 'UCRÂNIA', 'UKRAINE'),
(244, 'UGANDA', 'UGANDA'),
(245, 'URUGUAI', 'URUGUAY'),
(246, 'USBEQUISTÃO', 'UZBEKISTAN'),
(247, 'VANUATU', 'VANUATU'),
(248, 'VENEZUELA', 'VENEZUELA'),
(249, 'VIETNAME', 'VIETNAM'),
(250, 'WALLIS E FUTUNA', 'WALLIS AND FUTUNA'),
(251, 'ZÂMBIA', 'ZAMBIA'),
(252, 'ZIMBABUÉ', 'ZIMBABWE');

-- --------------------------------------------------------

--
-- Estrutura da tabela `pessoa`
--

CREATE TABLE `pessoa` (
  `idpessoa` int(11) NOT NULL,
  `nome` varchar(45) DEFAULT NULL,
  `apelido` varchar(45) DEFAULT NULL,
  `homem` tinyint(1) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `isestudante` tinyint(1) DEFAULT NULL,
  `datanasc` date DEFAULT NULL,
  `datacriada` datetime DEFAULT NULL,
  `dataeditado` datetime DEFAULT NULL,
  `idcriador` int(11) DEFAULT NULL,
  `idpais` int(11) NOT NULL,
  `idescola` int(11) NOT NULL,
  `confirmado` tinyint(1) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT NULL,
  `idprovincia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pessoa`
--

INSERT INTO `pessoa` (`idpessoa`, `nome`, `apelido`, `homem`, `email`, `password`, `isestudante`, `datanasc`, `datacriada`, `dataeditado`, `idcriador`, `idpais`, `idescola`, `confirmado`, `ativo`, `idprovincia`) VALUES
(1, 'Abacar Moreno', 'Carlos', 0, 'zerozero@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', -1, '2013-01-14', '0000-00-00 00:00:00', '2020-07-30 13:11:56', NULL, 165, 2, 1, 1, NULL),
(2, 'Mingos1', 'Inhicwa', 1, 'zkdrr@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 1, '2013-01-13', '0000-00-00 00:00:00', '2020-08-07 06:29:08', NULL, 1, 1, 1, 1, NULL),
(3, 'Edson', 'Miquissene', 0, 'edson001@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 0, '0000-00-00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 165, 1, NULL, 1, NULL),
(4, 'Edson', 'Miquissene', 0, 'edson001@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b', 0, '0000-00-00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1, 165, 1, NULL, 1, NULL),
(8, 'Alfredo', 'Dinando', 0, 'dinas@uz.ac', '12345677890', 1, '0000-00-00', NULL, NULL, NULL, 1, 2, NULL, NULL, NULL),
(9, 'Cipriano Junior', 'Amade', 1, 'ciprijuniro@gmail.com', '1234567890', 1, '1999-06-22', '2020-08-01 14:08:18', '2020-08-01 14:08:18', NULL, 1, 2, NULL, NULL, NULL),
(10, 'pedro militao', 'zoeira', 0, 'pedro@gmail.admin', '1234567890', 1, '2020-08-01', '2020-08-01 14:28:00', '2020-08-01 14:28:00', NULL, 165, 3, NULL, NULL, NULL),
(11, 'Erculano Vidigal', 'Amade', 0, 'erculano@gmail.com', '12345678', 1, '2020-08-16', '2020-08-01 17:54:18', '2020-08-01 17:54:18', NULL, 165, 3, NULL, 1, NULL),
(12, 'Hugo Amade', 'Pamela', 0, 'ssssss@gmail.com', '12323456246435', 1, '2020-08-25', '2020-08-01 18:03:52', '2020-08-01 18:03:52', NULL, 165, 1, NULL, 1, 1),
(13, 'Magaia Benfica', 'Munhepiwa', 1, 'magamaga@gmail.com', '12345', 1, '1987-05-07', '2020-08-07 13:31:37', '2020-08-07 13:31:37', NULL, 165, 3, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `professor`
--

CREATE TABLE `professor` (
  `idpessoa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `professor`
--

INSERT INTO `professor` (`idpessoa`) VALUES
(2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `prof_disc`
--

CREATE TABLE `prof_disc` (
  `idpessoa` int(11) NOT NULL,
  `iddisciplinas` int(11) NOT NULL,
  `anocadastro` int(11) NOT NULL DEFAULT 2020
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `prof_disc`
--

INSERT INTO `prof_disc` (`idpessoa`, `iddisciplinas`, `anocadastro`) VALUES
(2, 2, 2020),
(2, 3, 2020),
(2, 4, 2015);

-- --------------------------------------------------------

--
-- Estrutura da tabela `provincia`
--

CREATE TABLE `provincia` (
  `idprovincia` int(11) NOT NULL,
  `nomeprovincia` varchar(45) DEFAULT NULL,
  `pais_idpais` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `provincia`
--

INSERT INTO `provincia` (`idprovincia`, `nomeprovincia`, `pais_idpais`) VALUES
(1, 'Sofala', 165),
(2, 'Nampiula', 165),
(3, 'Cabo Delgado', 165),
(4, 'Niassa', 165),
(5, 'Zambezia', 165),
(6, 'Tete', 165);

-- --------------------------------------------------------

--
-- Estrutura da tabela `questoes`
--

CREATE TABLE `questoes` (
  `pergunta` text DEFAULT NULL,
  `resposta` text DEFAULT NULL,
  `cotacao` int(11) DEFAULT NULL,
  `idordem` int(11) DEFAULT NULL,
  `alternativa1` text NOT NULL,
  `alternativa2` text DEFAULT NULL,
  `alternativa3` text DEFAULT NULL,
  `idareatematica` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `alternativa4` text DEFAULT NULL,
  `avaliacao_id` int(11) NOT NULL,
  `avaliacao_idpessoa` int(11) NOT NULL,
  `avaliacao_iddisciplinas` int(11) NOT NULL,
  `url_img` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `questoes`
--

INSERT INTO `questoes` (`pergunta`, `resposta`, `cotacao`, `idordem`, `alternativa1`, `alternativa2`, `alternativa3`, `idareatematica`, `id`, `alternativa4`, `avaliacao_id`, `avaliacao_idpessoa`, `avaliacao_iddisciplinas`, `url_img`) VALUES
('Considerada a forma por excelência da linguagem figurada, a metáfora às vezes é tida como mero embelezamento do discurso. Com a ampliação da visão sobre o papel da metáfora, ressalta-se a seguinte propriedade dessa figura de linguagem:', 'delimita a fronteira entre saberes comuns e científicos', 1, 1, ' induz ao esquecimento das vivências negativas', 'delimita a fronteira entre saberes comuns e científicos', 'possibilita o contato entre concepções culturais distintas', 3, 1, 'atua na organização das percepções de mundo', 1, 2, 2, NULL),
('Liquido, inodeor, incolor e incipida', 'h20', 2, 1, 'co2', 'h20', 'h2o3', 1, 1, 'h2', 1, 2, 3, NULL),
('Considere que, após o pagamento de 24 parcelas mensais de R$1.000,00 mais os juros e taxas estabelecidos pelo banco, um cliente esperava que sua dívida real fosse reduzida em R$24.000,00.Porém, a redução foi de R$16.000,00. Em relação a R$24.000,00, o valor de R$16.000,00 representa um percentual que está mais próximo de:', '87%', 2, 2, '87%', '77%', '75%', 1, 2, '55%', 1, 2, 2, NULL),
('Capital de mocambique', 'maputo', 2, 2, 'nampula', 'pemba', 'maputo', 1, 2, 'nampula', 1, 2, 3, NULL),
('Há um tipo de ligação interatômica em que os elétrons das camadas mais externas transitam entre os cátions da rede cristalina. Por essa característica, tal ligação é comparada a um “mar de elétrons”.“Mar de elétrons” é uma metáfora que se refere ao seguinte tipo de ligação: ', ' metálica', 2, 3, ' iônica', 'covalente', 'de hidrogênio', 1, 3, ' metálica', 1, 2, 2, NULL),
('A definicao mais sensata da qimica seria :', 'disciplina que estuda reacoes entre produtos', 2, 3, 'reacao entre natureza de produtos', 'disciplina que estuda reacoes entre produtos', 'estuda atividades de corpos', 1, 3, 'estuda a escencia de materiais', 1, 2, 3, NULL),
('Dois numero primos podem ser:', '7 e 5', 2, 4, '7 e 6', '6 e 5', '7 e 5', 1, 4, '11 e 10', 1, 2, 2, NULL),
('Quimica dos fluidos', 'resposta1', 1, 4, 'opcao', 'opcao2', 'opcao3', 1, 4, 'opcao4', 1, 2, 3, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `respostas`
--

CREATE TABLE `respostas` (
  `alternativa` text DEFAULT NULL,
  `questoes_id` int(11) NOT NULL,
  `questoes_avaliacao_id` int(11) NOT NULL,
  `questoes_avaliacao_idpessoa` int(11) NOT NULL,
  `questoes_avaliacao_iddisciplinas` int(11) NOT NULL,
  `idaluno` int(11) NOT NULL,
  `vezes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `respostas`
--

INSERT INTO `respostas` (`alternativa`, `questoes_id`, `questoes_avaliacao_id`, `questoes_avaliacao_idpessoa`, `questoes_avaliacao_iddisciplinas`, `idaluno`, `vezes`) VALUES
('possibilita o contato entre concepções culturais distintas', 1, 1, 2, 2, 1, 1),
('h2o3', 1, 1, 2, 3, 1, 1),
('maputo', 2, 1, 2, 3, 1, 1),
(' metálica', 3, 1, 2, 2, 1, 1),
('7 e 5', 4, 1, 2, 2, 1, 1);

--
-- Acionadores `respostas`
--
DELIMITER $$
CREATE TRIGGER `analisar_respostas` BEFORE INSERT ON `respostas` FOR EACH ROW begin	
   -- INSERT INTO tabela_teste VALUES('ola mundo')

end
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tabela_teste`
--

CREATE TABLE `tabela_teste` (
  `idtabela_teste` int(11) NOT NULL,
  `descricao` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `aluno`
--
ALTER TABLE `aluno`
  ADD PRIMARY KEY (`idpessoa`);

--
-- Índices para tabela `aluno_avaliacao`
--
ALTER TABLE `aluno_avaliacao`
  ADD PRIMARY KEY (`vezes`,`idpessoa`,`iddisciplinas`,`avaliacao_id`,`avaliacao_idpessoa`,`avaliacao_iddisciplinas`),
  ADD KEY `fk_aluno_avaliacao_aluno_disc1_idx` (`iddisciplinas`,`idpessoa`),
  ADD KEY `fk_aluno_avaliacao_avaliacao1_idx` (`avaliacao_id`,`avaliacao_idpessoa`,`avaliacao_iddisciplinas`);

--
-- Índices para tabela `aluno_disc`
--
ALTER TABLE `aluno_disc`
  ADD PRIMARY KEY (`iddisciplinas`,`idpessoa`,`anocadastro`),
  ADD KEY `fk_aluno_disc_aluno1_idx` (`idpessoa`);

--
-- Índices para tabela `areatematica`
--
ALTER TABLE `areatematica`
  ADD PRIMARY KEY (`idareatematica`),
  ADD KEY `fk_areatematica_disciplinas1_idx` (`iddisciplinas`);

--
-- Índices para tabela `avaliacao`
--
ALTER TABLE `avaliacao`
  ADD PRIMARY KEY (`id`,`idpessoa`,`iddisciplinas`),
  ADD KEY `fk_table1_prof_disc1_idx` (`idpessoa`,`iddisciplinas`);

--
-- Índices para tabela `categoriadisc`
--
ALTER TABLE `categoriadisc`
  ADD PRIMARY KEY (`idcategoriadisc`);

--
-- Índices para tabela `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `disciplinas`
--
ALTER TABLE `disciplinas`
  ADD PRIMARY KEY (`iddisciplinas`),
  ADD KEY `fk_disciplinas_categoriadisc1_idx` (`idcategoriadisc`);

--
-- Índices para tabela `escola`
--
ALTER TABLE `escola`
  ADD PRIMARY KEY (`idescola`),
  ADD KEY `fk_escola_provincia1_idx` (`idprovincia`);

--
-- Índices para tabela `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`idpais`);

--
-- Índices para tabela `pessoa`
--
ALTER TABLE `pessoa`
  ADD PRIMARY KEY (`idpessoa`),
  ADD KEY `fk_pessoa_pais_idx` (`idpais`),
  ADD KEY `fk_pessoa_escola1_idx` (`idescola`);

--
-- Índices para tabela `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`idpessoa`);

--
-- Índices para tabela `prof_disc`
--
ALTER TABLE `prof_disc`
  ADD PRIMARY KEY (`idpessoa`,`iddisciplinas`,`anocadastro`),
  ADD KEY `fk_prof_disc_disciplinas1_idx` (`iddisciplinas`);

--
-- Índices para tabela `provincia`
--
ALTER TABLE `provincia`
  ADD PRIMARY KEY (`idprovincia`),
  ADD KEY `fk_provincia_pais1_idx` (`pais_idpais`);

--
-- Índices para tabela `questoes`
--
ALTER TABLE `questoes`
  ADD PRIMARY KEY (`id`,`avaliacao_id`,`avaliacao_idpessoa`,`avaliacao_iddisciplinas`),
  ADD KEY `fk_questoes_areatematica1_idx` (`idareatematica`),
  ADD KEY `fk_questoes_avaliacao1_idx` (`avaliacao_id`,`avaliacao_idpessoa`,`avaliacao_iddisciplinas`);

--
-- Índices para tabela `respostas`
--
ALTER TABLE `respostas`
  ADD PRIMARY KEY (`questoes_id`,`questoes_avaliacao_id`,`questoes_avaliacao_idpessoa`,`questoes_avaliacao_iddisciplinas`,`idaluno`,`vezes`),
  ADD KEY `fk_respostas_questoes1_idx` (`questoes_id`,`questoes_avaliacao_id`,`questoes_avaliacao_idpessoa`,`questoes_avaliacao_iddisciplinas`);

--
-- Índices para tabela `tabela_teste`
--
ALTER TABLE `tabela_teste`
  ADD PRIMARY KEY (`idtabela_teste`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `disciplinas`
--
ALTER TABLE `disciplinas`
  MODIFY `iddisciplinas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `pessoa`
--
ALTER TABLE `pessoa`
  MODIFY `idpessoa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `questoes`
--
ALTER TABLE `questoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `tabela_teste`
--
ALTER TABLE `tabela_teste`
  MODIFY `idtabela_teste` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `aluno`
--
ALTER TABLE `aluno`
  ADD CONSTRAINT `fk_aluno_pessoa1` FOREIGN KEY (`idpessoa`) REFERENCES `pessoa` (`idpessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `aluno_avaliacao`
--
ALTER TABLE `aluno_avaliacao`
  ADD CONSTRAINT `fk_aluno_avaliacao_aluno_disc1` FOREIGN KEY (`iddisciplinas`,`idpessoa`) REFERENCES `aluno_disc` (`iddisciplinas`, `idpessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_aluno_avaliacao_avaliacao1` FOREIGN KEY (`avaliacao_id`,`avaliacao_idpessoa`,`avaliacao_iddisciplinas`) REFERENCES `avaliacao` (`id`, `idpessoa`, `iddisciplinas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `aluno_disc`
--
ALTER TABLE `aluno_disc`
  ADD CONSTRAINT `fk_aluno_disc_aluno1` FOREIGN KEY (`idpessoa`) REFERENCES `aluno` (`idpessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_aluno_disc_disciplinas1` FOREIGN KEY (`iddisciplinas`) REFERENCES `disciplinas` (`iddisciplinas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `areatematica`
--
ALTER TABLE `areatematica`
  ADD CONSTRAINT `fk_areatematica_disciplinas1` FOREIGN KEY (`iddisciplinas`) REFERENCES `disciplinas` (`iddisciplinas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `avaliacao`
--
ALTER TABLE `avaliacao`
  ADD CONSTRAINT `fk_table1_prof_disc1` FOREIGN KEY (`idpessoa`,`iddisciplinas`) REFERENCES `prof_disc` (`idpessoa`, `iddisciplinas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `disciplinas`
--
ALTER TABLE `disciplinas`
  ADD CONSTRAINT `fk_disciplinas_categoriadisc1` FOREIGN KEY (`idcategoriadisc`) REFERENCES `categoriadisc` (`idcategoriadisc`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `escola`
--
ALTER TABLE `escola`
  ADD CONSTRAINT `fk_escola_provincia1` FOREIGN KEY (`idprovincia`) REFERENCES `provincia` (`idprovincia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `pessoa`
--
ALTER TABLE `pessoa`
  ADD CONSTRAINT `fk_pessoa_escola1` FOREIGN KEY (`idescola`) REFERENCES `escola` (`idescola`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pessoa_pais` FOREIGN KEY (`idpais`) REFERENCES `pais` (`idpais`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `professor`
--
ALTER TABLE `professor`
  ADD CONSTRAINT `fk_professor_pessoa1` FOREIGN KEY (`idpessoa`) REFERENCES `pessoa` (`idpessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `prof_disc`
--
ALTER TABLE `prof_disc`
  ADD CONSTRAINT `fk_prof_disc_disciplinas1` FOREIGN KEY (`iddisciplinas`) REFERENCES `disciplinas` (`iddisciplinas`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_prof_disc_professor1` FOREIGN KEY (`idpessoa`) REFERENCES `professor` (`idpessoa`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `provincia`
--
ALTER TABLE `provincia`
  ADD CONSTRAINT `fk_provincia_pais1` FOREIGN KEY (`pais_idpais`) REFERENCES `pais` (`idpais`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `questoes`
--
ALTER TABLE `questoes`
  ADD CONSTRAINT `fk_questoes_areatematica1` FOREIGN KEY (`idareatematica`) REFERENCES `areatematica` (`idareatematica`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_questoes_avaliacao1` FOREIGN KEY (`avaliacao_id`,`avaliacao_idpessoa`,`avaliacao_iddisciplinas`) REFERENCES `avaliacao` (`id`, `idpessoa`, `iddisciplinas`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `respostas`
--
ALTER TABLE `respostas`
  ADD CONSTRAINT `fk_respostas_questoes1` FOREIGN KEY (`questoes_id`,`questoes_avaliacao_id`,`questoes_avaliacao_idpessoa`,`questoes_avaliacao_iddisciplinas`) REFERENCES `questoes` (`id`, `avaliacao_id`, `avaliacao_idpessoa`, `avaliacao_iddisciplinas`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
