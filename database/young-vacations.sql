-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2024 at 03:59 AM
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
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `reviewID` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `vacationID` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `content` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`reviewID`, `username`, `vacationID`, `rating`, `content`) VALUES
(1, 'beargr', 17, 4, 'Berlin is a city where survival meets history at every turn. Wander the remnants of the Berlin Wall, its concrete slabs a testament to resilience. Navigate the bustling streets, where the urban jungle offers treasures from currywurst to techno beats. Dive into the city\'s past at Checkpoint Charlie, where espionage whispers through the air. For the true adventurer, climb the Reichstag\'s dome for a panoramic view, a lookout over a city that\'s survived wars and rebirths. Berlin, where every corner tells a story of endurance and innovation in the heart of Europe.'),
(2, 'beargr', 3, 2, 'Bern, Switzerland, nestled amidst the Alps, promises rugged charm but left me wanting more. The old town\'s cobbled streets are quaint, but lack the pulse of adventure. The Bear Park offers a glimpse of wildlife resilience, yet feels restrained. The Aare River beckons for a wild swim, though it\'s tamer than expected. Bern\'s survival tips? Enjoy the medieval architecture and clock towers, but don\'t expect adrenaline highs. It\'s a serene retreat rather than an expedition into the unknown.'),
(3, 'beargr', 5, 4, 'Eilat, Israel, where desert meets Red Sea, is a hidden gem for adventurers. Dive into vibrant coral reefs teeming with life—a true oasis in the desert heat. Hike the rugged mountains of Timna Park, where ancient copper mines whisper tales of survival. Explore underwater wrecks, a haven for daring divers seeking sunken treasures. Eilat\'s survival tip? Embrace the stark beauty of the Negev Desert at daybreak, then plunge into the azure waters by afternoon. A thrilling blend of nature\'s extremes, Eilat earns its stripes as a desert explorer\'s paradise.'),
(4, 'beargr', 19, 1, 'Dubrovnik, once a jewel of the Adriatic, now overrun with tourists like a hunted prey cornered by predators. The ancient walls echo with the clamor of selfie sticks, overshadowing their historical whispers. Avoid the crowded streets, where souvenir shops outnumber local tales of survival. The once-glistening sea now choked with cruise ships, their presence suffocating authentic exploration. Dubrovnik\'s survival tip? Seek refuge in quieter alleys at dawn, before the tourist horde awakens. A city trapped in its own fame, where survival means evading the stampede of sightseers.'),
(5, 'beargr', 13, 1, 'Paris, a city once revered for its romantic charm, now tangled in tourist traps like vines in a jungle. The Eiffel Tower, a beacon of engineering, lost in a sea of camera flashes and queues. The Louvre, a labyrinth where the Mona Lisa\'s smile fades amid selfie seekers. Sidewalk cafes, once havens of culinary delight, now serve lukewarm experiences at inflated prices. Parisian survival? Navigate through pickpockets and overpriced bistros, seeking solace in overlooked neighborhoods. A city that struggles to retain its wild spirit amidst the roar of tour buses and commercialism.'),
(6, 'beargr', 2, 3, 'Melbourne, a city where urban adventures blend with laid-back charm. Wander the graffiti-laden laneways like a maze of artistic survival, each turn revealing hidden cafes and eclectic boutiques. Embrace the wild flavors of Queen Victoria Market, a bustling hub of culinary exploration. Explore the Yarra River, where kayakers navigate city waters under skyscraper shadows. Melbourne\'s survival tip? Embrace the unpredictable weather and dive into the city\'s diverse cultural currents, from street art to rooftop bars. A place where urban sophistication meets the call of outdoor escapades, though sometimes lacking the raw edge of untamed wilderness.'),
(7, 'beargr', 6, 3, 'Sydney, a city of contrasts where urban adventure meets natural wonder. Scale the iconic Harbour Bridge for a bird\'s-eye view of the bustling harbor below, a feat of human engineering amid the cityscape. Explore the rugged coastline along Bondi Beach, where surfers brave the waves like modern-day explorers. Dive into the vibrant culture at The Rocks, where history whispers through narrow alleys and lively markets. Sydney\'s survival tip? Embrace the city\'s outdoor spirit with coastal walks and bushland trails, yet beware the crowded tourist spots that dilute the wild experience. A blend of urban excitement and natural beauty, though at times, the untamed wilderness feels a distant echo.'),
(8, 'beargr', 7, 2, 'The Gold Coast, Australia, once a pristine strip of wild coastline, now wrestles with its own popularity. Surfing the waves feels like navigating through a sea of tourists, the beachfront lined with high-rises overshadowing nature\'s grandeur. Seek refuge in the hinterland\'s rainforests for a taste of solitude amidst tourist-driven hustle. The Gold Coast\'s survival tip? Embrace the surf culture cautiously, and venture beyond the glitz to discover pockets of untouched wilderness for a genuine wild experience.'),
(9, 'beargr', 8, 5, 'Uluru, a majestic monolith rising from the heart of the Outback, embodies the essence of raw wilderness. Trekking its base reveals ancient rock art and a landscape etched with survival stories of Aboriginal peoples. Camping under the star-studded desert sky, you feel the pulse of the land\'s timeless spirit. Witnessing the shifting colors of Uluru at sunrise and sunset is like observing nature\'s own survival tactics. Uluru\'s survival tip? Respect its cultural significance and heed the wisdom of the Anangu people. Embrace the challenge of the desert\'s harsh beauty, where every moment spent feels like a privilege in this sacred sanctuary of the Outback.'),
(10, 'beargr', 9, 4, 'Rottnest Island, off the coast of Western Australia, is a hidden gem for adventurers seeking marine marvels and island survival. Snorkel the turquoise waters to encounter vibrant coral reefs teeming with marine life—nature\'s underwater oasis. Cycle rugged trails to secluded bays where white-sand beaches beckon for a castaway experience. Encounter the unique quokkas, resilient marsupials found nowhere else, embodying the island\'s wild charm. Rottnest\'s survival tip? Embrace the island\'s eco-friendly ethos, explore its historical sites, and dive into its natural wonders for a true island adventure, though beware of peak tourist seasons that can crowd the wild solitude.'),
(11, 'beargr', 4, 1, 'Milan, once a beacon of cultural sophistication, now entangled in a maze of commercialism and congestion. The Duomo, a masterpiece of Gothic architecture, suffocates under the weight of souvenir stalls and selfie sticks. Navigating the streets feels like dodging urban predators amidst luxury boutiques and crowded cafes. Milan\'s survival tip? Seek refuge in quieter neighborhoods for a glimpse of authentic Italian life amid the tourist frenzy. A city where survival means navigating through the veneer of fashion and finance to find glimpses of historical charm amidst the concrete jungle.'),
(12, 'beargr', 11, 4, 'Petra, Jordan, a lost city carved into rose-red cliffs, invites adventurers to uncover its ancient mysteries. Trek through the narrow Siq, where rock walls rise like guardians of a forgotten civilization. Behold the Treasury, its intricate façade gleaming in the desert sun—a testament to human ingenuity and survival in harsh landscapes. Explore hidden tombs and temples carved into the sandstone, each corner revealing stories of Nabatean resilience. Petra\'s survival tip? Embrace the desert\'s silence at dawn or dusk for an ethereal experience, and venture beyond the main sites to discover secluded wonders. A journey into Petra is a journey into history\'s survival against nature\'s harsh embrace—a must for any explorer seeking ancient marvels.'),
(13, 'beargr', 12, 5, 'Antarctica, the ultimate frontier of survival and exploration, where every step feels like a triumph over nature\'s most extreme challenges. Trek across ice fields where penguins waddle like resilient companions, and seals lounge in icy waters. Witness the ethereal dance of the aurora australis under a sky untouched by city lights—a celestial survival spectacle. Kayak among towering glaciers that calve into the sea with thunderous roars, a reminder of Earth\'s raw power. Antarctica\'s survival tip? Embrace the silence of this pristine wilderness, respect its fragile ecosystem, and marvel at the resilience of life in the harshest conditions on our planet. A journey to Antarctica transcends ordinary adventure; it\'s a pilgrimage to the heart of our planet\'s wildest, most untamed realm—a six-star expedition for the boldest of explorers.'),
(14, 'beargr', 18, 3, 'Tokyo, a bustling metropolis where survival means navigating a maze of neon lights and concrete jungles. Embrace the sushi bars and ramen stalls for a taste of local flavor amidst the urban frenzy. Seek refuge in serene temples hidden amidst skyscrapers, where ancient traditions whisper amid the modern chaos. Tokyo\'s survival tip? Embrace the city\'s energy cautiously and find moments of calm amidst the bustling crowds.'),
(15, 'beargr', 16, 4, 'Cortina d\'Ampezzo, nestled in the heart of the Dolomites, is a haven for adventurers seeking alpine thrills and natural beauty. Hike rugged trails that wind through majestic peaks and lush valleys, where every step reveals breathtaking vistas. Ski down powdery slopes that challenge even the most seasoned thrill-seekers, with slopes that demand respect and reward courage. Cortina\'s survival tip? Embrace the mountain\'s solitude at dawn or dusk, and indulge in hearty local cuisine in cozy mountain refuges. A place where nature\'s raw beauty meets exhilarating outdoor pursuits, perfect for those craving an alpine escape.'),
(16, 'beargr', 14, 1, 'New York City, once a concrete jungle of dreams, now a survival maze of noise and neon. Times Square dazzles with billboards, drowning out the city\'s heartbeat. Central Park offers a brief respite, though it\'s an oasis in a desert of relentless urban sprawl. Navigating the subway feels like dodging predators in a labyrinth of steel and concrete. NYC\'s survival tip? Seek solace in lesser-known neighborhoods for a taste of authentic city life amidst the tourist traps. A place where survival means mastering the art of blending in amidst the chaos of crowds and commercialism.'),
(17, 'beargr', 15, 3, 'Rio de Janeiro, Brazil, where urban excitement meets natural wonder. The iconic Christ the Redeemer overlooks a city pulsating with samba rhythms and Carnival spirit. Copacabana Beach offers a vibrant shoreline for sun-seekers and surfers alike, though crowded at peak times. Explore Tijuca National Park, where lush rainforest trails lead to breathtaking viewpoints. Rio\'s survival tip? Embrace the city\'s lively culture cautiously, and venture beyond the tourist hotspots to discover quieter corners and hidden gems. A place where urban energy and natural beauty collide, offering a thrilling yet sometimes overwhelming adventure.'),
(18, 'galzy', 17, 1, 'Berlin during the Euros was chaotic and loud. Everywhere you turned, it was football fever—crowds, flags, and noise dominating the city. Not my scene; couldn\'t wait for it to end to experience the city\'s true charm peacefully.'),
(19, 'galzy', 1, 5, 'Jerusalem captivated me from day one with its rich tapestry of history and culture. Studying here feels like unraveling centuries of knowledge in the Old City\'s labyrinthine streets. The blend of ancient landmarks and vibrant markets makes every day a journey of discovery.'),
(20, 'galzy', 5, 2, 'Eilat, once a serene escape, now feels overrun by tourists and commercialism. Guiding groups here has become routine amidst crowded beaches and generic attractions. The natural beauty remains, but authenticity and tranquility are increasingly elusive.'),
(21, 'galzy', 4, 5, 'Milan, where fashion and espresso intertwine effortlessly. The city\'s elegant boutiques and designer streets are a dream for fashion enthusiasts. Sipping a perfect espresso in a chic café feels like embracing the city\'s stylish essence. Milan is a paradise for those who adore both fashion and the art of Italian coffee culture.'),
(22, 'galzy', 18, 5, 'Tokyo is a dazzling tapestry of modernity and tradition that captivates me endlessly. From the bustling streets of Akihabara, alive with anime and gaming culture, to serene temples steeped in centuries of history. Studying Japanese here enriches my understanding of its intricate language and culture. The city\'s attention to detail in everything from food to fashion is a testament to Japanese craftsmanship. Tokyo feels like a second home where every visit deepens my love for its vibrant energy and endless discoveries.'),
(23, 'galzy', 14, 3, 'New York City, a vibrant mosaic of culinary delights and Broadway magic, yet the relentless crowds can overwhelm. The bagels and pastrami sandwiches are unrivaled, and the theater scene is electric. However, navigating through throngs of people tests my patience. Despite the bustle, NYC\'s cultural tapestry remains a beacon of diversity and excitement.'),
(24, 'mintyMarco', 17, 4, 'Berlin, a vibrant jewel in the realm of the Holy Roman Empire, captivates with its formidable walls and bustling markets. The palace of the Prince, adorned with banners of sovereignty, rivals the courts of the East. The city hums with artisans and traders, their wares and ambitions mingling in the lively streets. Berlin\'s libraries, repositories of Western learning, echo with the whispers of scholars. A testament to Western vigor, though lacking in exotic allure, Berlin beckons travelers seeking the heart of medieval prosperity.'),
(25, 'mintyMarco', 3, 3, 'Bern, nestled in the Alpine foothills, is a sturdy fortress town of the Holy Roman Empire. Its cobbled streets wind beneath timbered houses and the shadow of a stout cathedral. The market square bustles with tradesmen hawking goods from far and near, yet lacks the grandeur of imperial capitals. The city\'s charm lies in its simplicity, a haven for travelers seeking respite amidst verdant hills and the quiet currents of the Aare River.'),
(26, 'mintyMarco', 19, 3, 'Dubrovnik, a coastal gem nestled along the Adriatic, enchants with its robust walls and bustling markets. The city\'s stone palaces rise proudly against the azure sea, reminiscent of Venetian splendor. Yet, Dubrovnik\'s charm is marred by occasional tensions with neighboring powers, casting a shadow over its otherwise vibrant trade and cultural exchanges. For travelers seeking a blend of maritime adventure and Byzantine intrigue, Dubrovnik offers a tantalizing glimpse into the complexities of medieval coastal life.'),
(27, 'mintyMarco', 13, 4, 'Paris, jewel of the Kingdom of France, dazzles with its soaring cathedrals and bustling markets. The mighty Seine river flows beneath grand stone bridges, connecting vibrant quarters where artisans ply their crafts. The royal palace, resplendent in Gothic architecture, rivals the courts of the East. Yet, Paris\'s charm is tempered by the cacophony of its streets and the occasional tumult of political strife. For travelers yearning to witness Western opulence and intellectual fervor, Paris beckons as a beacon of medieval majesty.'),
(28, 'mintyMarco', 10, 4, 'London, stronghold of the English realm, unfolds along the banks of the Thames with its stout walls and bustling wharves. The towering spire of Westminster Abbey pierces the sky, a testament to royal patronage and Gothic grandeur. Markets teem with goods from across Christendom, while scholars debate in the halls of learning. Yet, amidst its charm and commerce, London bears the scars of political upheaval and occasional unrest. For travelers drawn to the crossroads of Western power and medieval intrigue, London offers a tapestry of riches and revelations.'),
(29, 'mintyMarco', 4, 5, 'Milan, jewel of Lombardy, captivates with its majestic cathedral, a marvel of Gothic architecture rising above bustling markets and stately palaces. The city pulses with the cadence of artisans crafting exquisite armor and silk, while merchants barter goods from across the Mediterranean. Milan\'s charm lies not only in its opulent courts and vibrant trade, but also in its patronage of scholars and artists, fostering a Renaissance of intellect and creativity. For travelers seeking the pinnacle of Italian magnificence and innovation, Milan stands as a beacon of medieval splendor.'),
(30, 'mintyMarco', 18, 4, 'Tokyo, a bustling city in the land of Wa, dazzles with its orderly streets and bustling markets. The Shogun\'s palace, adorned with intricate wooden carvings, commands respect amidst tranquil gardens. Artisans meticulously craft swords and armor of renowned quality, reflecting the island\'s martial prowess. Yet, Tokyo\'s charm is tempered by its isolation from mainland affairs and the inscrutable customs of its people. For travelers curious about the distant East and its disciplined society, Tokyo offers a glimpse into a realm shaped by tradition and honor.'),
(31, 'mintyMarco', 16, 5, 'Cortina d\'Ampezzo, nestled in the majestic Dolomites, enchants with its alpine beauty and serene valleys. The village, guarded by towering peaks, welcomes travelers with cozy lodges and hearty fare. The locals, skilled in mountain lore, offer warm hospitality amidst their pastoral lifestyle. Cortina\'s charm lies in its pristine landscapes and the thrill of alpine pursuits, from hunting to leisurely hikes. For those seeking refuge in nature\'s embrace and a taste of mountainous tranquility, Cortina d\'Ampezzo beckons as a sanctuary in the heart of the Alps.'),
(32, 'woofieG', 1, 5, 'Jerusalem is a scent-filled maze of history and wonder! The Old City\'s narrow alleys hide endless treats, and the Western Wall\'s stones whisper ancient tales. Holy and exciting—perfect for adventurous pups!'),
(33, 'woofieG', 17, 4, 'Berlin is a bustling city with vast parks and lively streets to explore. The Tiergarten is a paradise for walks, and dog-friendly cafes offer treats galore. Plenty of history to sniff out, though some areas are busy for a relaxed pup like me!'),
(34, 'woofieG', 10, 2, 'London is loud and crowded, with few green spaces to stretch my paws. The streets are hectic, and parks are often too busy for peace and quiet. Not the best city for a dog looking to relax and roam freely.'),
(35, 'woofieG', 2, 5, 'Melbourne is a dog\'s dream! The parks are vast and filled with fun scents. Cafes welcome me with water bowls and treats. The city is friendly and relaxed, perfect for exploring with my humans.'),
(36, 'woofieG', 6, 4, 'Sydney\'s beaches are nice, but Melbourne\'s parks are paw-some! Sydney\'s busy vibe can be overwhelming; prefer Melbourne\'s relaxed parks and cafes.'),
(37, 'woofieG', 7, 5, 'The Gold Coast is a tail-wagging paradise! Endless sandy beaches for fetch, and parks with shady spots to chill. Dog-friendly cafes and trails make it paws-down perfect for adventure-loving pups like me!'),
(38, 'woofieG', 8, 3, 'Uluru is vast and quiet, with intriguing scents in the desert air. Limited places to roam freely, and heat can be intense. Great for a unique experience but not ideal for a husky\'s need to roam and explore widely.'),
(39, 'woofieG', 9, 4, 'Rottnest Island is a dog\'s paradise! Beaches for days of splashing, and trails for exciting explorations. The quokkas are friendly, but remember, dogs need to stay on leash.'),
(40, 'woofieG', 4, 3, 'Milan has nice parks, but small dogs get all the love! Limited spaces for big dogs to run freely, and cafes aren\'t always welcoming. Prefer places where all dogs are treated equally!'),
(41, 'woofieG', 18, 2, 'Tokyo is too crowded and hectic for a big pup like me. Limited green spaces and strict rules make it hard to roam freely. Prefer quieter cities with more room to stretch my legs.'),
(42, 'woofieG', 15, 4, 'Rio is a paradise for a pup like me! Beaches for days, friendly locals, and lots of places to explore. The vibrant energy and tropical vibes make every day an adventure!');

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
(3, 'Bern', 'Travel to Bern - the capital of Switzerland, as well as, the political and diplomatic center. It has been described as “the most beautiful that we have ever seen” by Johann Wolfgang von Goethe.', '2024-06-20', '2024-07-07', 1081, 'cb24efab-00fa-4842-b120-b5388719e137.jpg'),
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
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`reviewID`),
  ADD KEY `username` (`username`),
  ADD KEY `vacationID` (`vacationID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `reviewID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

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

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`vacationID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
