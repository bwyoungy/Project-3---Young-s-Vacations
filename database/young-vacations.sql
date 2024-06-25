-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2024 at 04:28 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `young-vacations`
--
CREATE DATABASE IF NOT EXISTS `young-vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `young-vacations`;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `username` varchar(50) NOT NULL,
  `vacationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`username`, `vacationID`) VALUES
('mintyMarco', 5),
('woofieG', 2),
('woofieG', 1),
('woofieG', 4),
('mintyMarco', 70),
('galzy', 4),
('galzy', 2),
('galzy', 1),
('galzy', 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `email`, `firstName`, `lastName`, `password`, `role`) VALUES
('beargr', 'beargr@gmail.com', 'Bear', 'Grylls', 'c6c85b824e14adf68e85fbd46cf56d81ad5ad09d76182b2dfea03f6a165cd229f27bff64d55eb2c298066d56a5c4be4b9a0bbea2638fff0599d7d4f22d7f8265', 'user'),
('galzy', 'galzohar@mail.ac.il', 'Gal', 'Young', '0855293de1e6d3b4af2277e574cdb85bfa5deb6a57fa5c55e19d3ef7de4dbce5dc9d0c4ec27401f15f8942f19a438d6a1bc4cbd583b2d5ba713f3679220df057', 'user'),
('mintyMarco', 'm.polo@pool.com', 'Marco', 'Polo', '8b0d92820366a67322426c64bebe6773e77eb07f25e57f034f4b9c26e604a915699f41c80f11ed9da31f90912c9cc82f3445ac97fd78120e168184f9e380ea3a', 'user'),
('nivav', 'niv.jbt@gmail.com', 'Niv', 'Avidan', '42c23399608bf7f4ed03cea7cfd16387202c86b8b044e699c00082886051db715e9ed9a9114a36542032279fec8bf1dc8b01df67e1bfbca1c6a8d8d438ce4236', 'admin'),
('woofieG', 'woofie@insta.com', 'Woofie', 'Goldberg', '4185cf1b016334afd5bd5f158c471a09f7f9ca9ef054c8a3c7ffb1ffe50065abdafd4afd780c6600f61909afb86eac6a7bbf4e50500fc4a9722a2cb35307b3a9', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationID` int(11) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int(11) NOT NULL,
  `imageName` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationID`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Jerusalem', 'This summer: Explore the Holiest of Cities!', '2024-06-02', '2024-09-01', 613, 'c4b160ad-2ed8-4cd8-9d33-3dcbb74ef265.png'),
(2, 'Melbourne', 'Spend some time in the sports capital of the world!', '2024-05-01', '2024-08-01', 4500, 'f2421d22-0704-4193-a54b-23500d0265c0.jpg'),
(4, 'House', 'Work on project', '2024-04-20', '2024-05-01', 55, 'd8c50ef7-3a31-47b7-bc42-7c644d2da7dc.png'),
(5, 'Italy', 'Take a break from Israel', '2024-05-19', '2024-06-02', 1000, '55f1ea8c-10ed-47fc-af33-d95877e47856.jpg'),
(70, 'Space X', 'Musk\'s future is almost here', '2028-07-26', '2029-07-26', 5000, '9c430706-dfb7-4586-a31f-a2bbdd57f4eb.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD KEY `username` (`username`),
  ADD KEY `vacationID` (`vacationID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`vacationID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
