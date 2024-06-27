-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2024 at 07:52 PM
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
('beargr', 5),
('beargr', 3),
('beargr', 8),
('beargr', 9),
('beargr', 11),
('beargr', 12),
('beargr', 15),
('beargr', 16),
('beargr', 20),
('beargr', 17),
('galzy', 1),
('galzy', 2),
('galzy', 4),
('galzy', 6),
('galzy', 7),
('galzy', 9),
('galzy', 14),
('galzy', 16),
('galzy', 17),
('galzy', 18),
('galzy', 19),
('mintyMarco', 3),
('mintyMarco', 4),
('mintyMarco', 10),
('mintyMarco', 11),
('mintyMarco', 13),
('mintyMarco', 16),
('mintyMarco', 18),
('mintyMarco', 17),
('mintyMarco', 19),
('woofieG', 1),
('woofieG', 2),
('woofieG', 4),
('woofieG', 9),
('woofieG', 17);

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
(1, 'Jerusalem', 'This summer: Explore the Holiest of Cities!', '2024-06-28', '2024-07-21', 613, 'c28abac9-e53c-44b9-beee-6e14607c808d.png'),
(2, 'Melbourne', 'Spend some time in the sports capital of the world!', '2024-08-30', '2024-11-30', 5000, 'dce29b2e-f89d-4cb4-96df-cb0a6a97e659.jpg'),
(3, 'Bern', 'Travel to Bern - the capital of Switzerland, as well as, the political and diplomatic center. It has been described as “the most beautiful that we have ever seen” by Johann Wolfgang von Goethe.', '2025-02-02', '2025-03-01', 1081, 'cb24efab-00fa-4842-b120-b5388719e137.jpg'),
(4, 'Milan', 'The biggest city in northern Italy lacks the romance of Rome, Florence, and Venice, but has much to admire for history, art, and fashion lovers, from Gothic cathedrals and Old Master murals to designer store after designer store. ', '2025-01-23', '2025-01-30', 1024, 'fcb56377-d805-4dfb-90a2-923617060fdd.jpg'),
(5, 'Eilat', 'The southernmost city in Israel, Eilat, has been blessed with a spectacular coral reef.', '2024-06-30', '2024-07-07', 517, 'b96ddd7b-9faa-4370-9ca9-469fee0f972c.jpg'),
(6, 'Sydney', 'There’s no denying that Sydney is a beach town. From the still waters of the genteel harbour beaches to the rougher surf of coastal beaches like Maroubra, the warmer months are spent stripping off, creaming up and diving in.', '2024-10-30', '2024-11-15', 4700, 'd0949e08-0cf1-4941-ae9e-255124d2b3ea.jpg'),
(7, 'Gold Coast', 'Pristine beaches stretching for 70km, enviable weather, world heritage-listed Gondwana rainforests, and enough big city infrastructure to keep punters interested – Australia’s Gold Coast is a pleasure centre.', '2024-11-15', '2024-12-01', 5050, '26c207a4-d08d-4e26-b5eb-b20fad28400d.jpg'),
(8, 'Uluru', 'This sacred destination is known as the spiritual heart of Australia where you will experience the stunning rock formations, explore waterholes and ancient rock paintings amidst the beauty of Uluru – Kata Tjuta National Park.', '2024-12-01', '2024-12-21', 6600, 'e27eb0c2-6d15-4895-96ca-4e9133a2d61c.jpg'),
(9, 'Rottnest Island', 'Located about 12 miles (19 km) from the mainland, A-Class Nature Reserve Rottnest Island is visited all year long by tourists and locals alike for its pristine beaches and unique Aussie animals.', '2024-12-22', '2024-12-31', 7070, '6067e5b4-61d8-4306-b971-8ba924a2594d.jpg'),
(10, 'London', 'London’s a sprawling city at the center of everything: art, history, culture—you name it. But what sets it apart from other major hubs are its distinct neighborhoods, each with their own vibe.', '2024-07-27', '2024-08-28', 1196, '00a38953-b84d-4de7-86a9-98334bfdc9b3.jpg'),
(11, 'Petra', 'Petra is a UNESCO World Heritage Site and is listed as one of the New Seven Wonders of the World.', '2025-02-01', '2025-02-07', 313, '670b09e9-ea9a-488f-b28c-6101d7080ea5.jpg'),
(12, 'Antarctica', 'Antarctica. The 7th continent and part of almost everyone’s bucketlist.', '2025-03-15', '2025-09-15', 15500, 'e63d43b5-ebd4-4281-ba00-d4d794ba6eb6.jpg'),
(13, 'Paris', 'One of the planet’s most popular sporting events is kicking off in one of the world’s most popular cities in July—prime tourist season, on the tail of the Tour de France.', '2024-07-26', '2024-08-11', 2024, '9706dab6-5253-4028-b44b-cc6c8ead3aaf.png'),
(14, 'New York City', 'New York, the Big Apple. The city which Liberty calls home. The first thing one notices on arrival in New York are all the cars. Honking wildly, the famous yellow cabs plough their way through the long urban canyons.', '2026-06-11', '2026-07-19', 8700, 'd768b143-f112-4422-b3ef-e9d0bb1ece1e.jpeg'),
(15, 'Rio de Janeiro', 'Rio is unlike any other place in the world, with more natural beauty per square inch—and more flip-flops per capita—than any major city.', '2027-06-24', '2027-07-25', 7800, '54c86632-506f-40a2-9764-ecfe82c40ada.jpg'),
(16, 'Cortina d\'Ampezzo', 'The 1956 Winter Olympics were what first launched Cortina d’Ampezzo into the global spotlight, as the games’ first-ever live television broadcasts highlighted the stunning beauty of the mountain village and the sharp, sheer-walled limestone peaks of the surrounding Dolomite Mountains. And with the Winter Games revisiting Cortina in 2026, the town is busy undertaking renovations that will only improve its appeal.', '2026-02-06', '2026-02-22', 2026, '8aa563cd-aeae-42c8-9fda-3e563113f69e.jpg'),
(17, 'Berlin', 'When people think of Berlin, the first thing that probably comes to mind is its most famous landmark – the Brandenburg Gate. A symbol of division for decades, the monument has always been at the heart of a major city bursting with ideas, inspiration, art, culture and creativity. Wonderful residential areas, sophisticated galleries and the Kurfürstendamm – the very definition of an exclusive shopping street – can all be found in the west of the city.', '2024-06-14', '2024-07-14', 4700, '9692836b-6c49-41a5-a6e8-a7a16acb055d.jpg'),
(18, 'Tokyo', 'Tokyo (東京, Tōkyō) is Japan\'s capital and the world\'s most populous metropolis. It is also one of Japan\'s 47 prefectures, consisting of 23 central city wards and multiple cities, towns and villages west of the city center.', '2025-12-03', '2025-12-25', 9100, '4233fd11-f0c2-4f05-90c9-95b5d3171918.jpg'),
(19, 'Dubrovnik', 'Overlooking the calm blue Adriatic, Dubrovnik is one of the world’s most magnificent walled cities. Once the capital of the mighty sea-faring Republic of Ragusa (1358-1808), it’s now Croatia’s most upmarket destination.', '2024-07-01', '2024-08-01', 1013, '13cfe96c-025e-4b64-88bf-422cadf28577.jpg'),
(20, 'Space X', 'Come discover the future!', '2035-01-01', '2036-01-01', 250000, 'a5debe44-0f4a-4fe0-83f8-3f580bf6d9a1.png');

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
  MODIFY `vacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

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
