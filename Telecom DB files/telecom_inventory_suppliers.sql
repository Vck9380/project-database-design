-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: telecom_inventory
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `supplierName` varchar(255) NOT NULL,
  `supplierMail` varchar(255) NOT NULL,
  `supplierContact` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'Cardcom','cdcom@mail.com','Not Provided'),(2,'Netgear','Neger@mail.com','Not Provided'),(3,'Broadcom','brcom@mail.com','Not Provided'),(4,'Synergy','synerg@mail.com','Not Provided'),(5,'Cisco','abcd@mail.com','Not Provided'),(6,'HP','abhp@mail.com','Not Provided'),(7,'BELL','blee@mail.com','Not Provided'),(8,'Cisco ','support@cisco.com','Not Provided'),(9,'FiberTech Inc.','info@fibertech.com','Not Provided'),(10,'OptiFiber Co.','sales@optifiber.com','Not Provided'),(11,'NexGen ','contact@nexgen.com','Not Provided'),(12,'Huawei ','sales@huawei.com','Not Provided'),(13,'Juniper Networks','sales@juniper.net','Not Provided'),(14,'TP-Link','support@tp-link.com','Not Provided'),(15,'TechSupplies Inc.','contact@techsupplies.com','Not Provided'),(16,'NetGear Pro','sales@netgearpro.com','Not Provided'),(17,'OptiTech Co.','info@optitech.com','Not Provided'),(18,'DataConnect Ltd.','orders@dataconnect.com','Not Provided'),(19,'RF Solutions','support@rfsolutions.com','Not Provided'),(20,'CardHub Systems','cards@cardhub.com','Not Provided'),(21,'SignalWorks Inc.','inquiries@signalworks.com','Not Provided');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-04 12:47:04
