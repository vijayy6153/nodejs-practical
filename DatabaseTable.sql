CREATE TABLE `tie_vehicle_ownership` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `isDeleted` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tie_vehicle_ownership`
--

INSERT INTO `tie_vehicle_ownership` (`id`, `vehicle_id`, `user_id`, `createdAt`, `isDeleted`) VALUES
(1, 1, 1, '2021-11-24 14:52:53.000', NULL),
(2, 2, 2, '2021-11-24 14:53:07.000', NULL),
(3, 3, 1, '2021-11-24 14:53:18.000', NULL),
(4, 4, 2, '2021-11-24 14:53:30.000', NULL),
(5, 5, 1, '2021-11-24 14:53:39.000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `surname` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `location` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `surname`, `email`, `phone`, `location`) VALUES
(1, 'vijay', 'panchal', 'vijayy6153@gmail.com', '8000863411', '41.543850, -79.257187'),
(2, 'rohit', 'patel', 'rohit@gmail.com', '9897463220', '23.022505, 72.571365');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `vehicle_name` varchar(191) NOT NULL,
  `vehicle_brand` varchar(191) NOT NULL,
  `vehicle_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `vehicle_name`, `vehicle_brand`, `vehicle_number`) VALUES
(1, 'accent', 'hyundai', 2448),
(2, 'city', 'honda', 6153),
(3, 'swift', '9999', 9874),
(4, 'creta', 'hyundai', 8222),
(5, 'xuv500', 'mahindra', 8585),
(6, 'baleno', 'suzuki', 9856),
(7, 'safari', 'tata', 4561);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tie_vehicle_ownership`
--
ALTER TABLE `tie_vehicle_ownership`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_id` (`vehicle_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User.email_unique` (`email`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tie_vehicle_ownership`
--
ALTER TABLE `tie_vehicle_ownership`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tie_vehicle_ownership`
--
ALTER TABLE `tie_vehicle_ownership`
  ADD CONSTRAINT `tie_vehicle_ownership_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`),
  ADD CONSTRAINT `tie_vehicle_ownership_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;