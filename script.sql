drop database t2p2;
create database t2p2;

-- Crear la tabla vuelos
CREATE TABLE vuelos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    numero_vuelo VARCHAR(10) NOT NULL UNIQUE,
    aerolinea VARCHAR(50) NOT NULL,
    origen VARCHAR(50) NOT NULL,
    destino VARCHAR(50) NOT NULL,
    fecha_salida DATE NOT NULL,
    hora_salida TIME NOT NULL,
    fecha_llegada DATE NOT NULL,
    hora_llegada TIME NOT NULL
);

-- Inserciones de ejemplo
INSERT INTO vuelos (numero_vuelo, aerolinea, origen, destino, fecha_salida, hora_salida, fecha_llegada, hora_llegada) 
VALUES 
('ABC123', 'Aerolinea1', 'CiudadA', 'CiudadB', '2024-02-01', '08:00:00', '2024-02-01', '10:30:00'),
('DEF456', 'Aerolinea2', 'CiudadB', 'CiudadC', '2024-02-02', '12:00:00', '2024-02-02', '14:30:00'),
('GHI789', 'Aerolinea3', 'CiudadC', 'CiudadD', '2024-02-03', '15:30:00', '2024-02-03', '18:00:00'),
('JKL012', 'Aerolinea4', 'CiudadD', 'CiudadE', '2024-02-04', '09:30:00', '2024-02-04', '12:00:00'),
('MNO345', 'Aerolinea5', 'CiudadE', 'CiudadF', '2024-02-05', '14:00:00', '2024-02-05', '16:30:00'),
('PQR678', 'Aerolinea6', 'CiudadF', 'CiudadG', '2024-02-06', '10:30:00', '2024-02-06', '13:00:00'),
('STU901', 'Aerolinea7', 'CiudadG', 'CiudadH', '2024-02-07', '13:30:00', '2024-02-07', '16:00:00'),
('VWX234', 'Aerolinea8', 'CiudadH', 'CiudadI', '2024-02-08', '17:00:00', '2024-02-08', '19:30:00'),
('YZA567', 'Aerolinea9', 'CiudadI', 'CiudadJ', '2024-02-09', '08:00:00', '2024-02-09', '10:30:00'),
('BCD890', 'Aerolinea10', 'CiudadJ', 'CiudadK', '2024-02-10', '11:30:00', '2024-02-10', '14:00:00'),
('EFG123', 'Aerolinea11', 'CiudadK', 'CiudadL', '2024-02-11', '15:00:00', '2024-02-11', '17:30:00'),
('HIJ456', 'Aerolinea12', 'CiudadL', 'CiudadM', '2024-02-12', '18:30:00', '2024-02-12', '21:00:00'),
('KLM789', 'Aerolinea13', 'CiudadM', 'CiudadN', '2024-02-13', '09:00:00', '2024-02-13', '11:30:00'),
('NOP012', 'Aerolinea14', 'CiudadN', 'CiudadO', '2024-02-14', '12:30:00', '2024-02-14', '15:00:00'),
('PQR345', 'Aerolinea15', 'CiudadO', 'CiudadP', '2024-02-15', '16:00:00', '2024-02-15', '18:30:00');
