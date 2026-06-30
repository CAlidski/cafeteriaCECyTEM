-- ==========================
-- TABLA USUARIOS
-- ==========================
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- ==========================
-- TABLA PRODUCTOS
-- ==========================
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    categoria VARCHAR(50),
    precio DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0
);

-- ==========================
-- TABLA PEDIDOS
-- ==========================
CREATE TABLE IF NOT EXISTS pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    cantidad INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- TABLA ENCUESTA
-- ==========================
CREATE TABLE IF NOT EXISTS encuesta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    opinion TEXT NOT NULL,
    correo VARCHAR(100) NOT NULL,
    experiencia VARCHAR(20) NOT NULL,
    sugerencia TEXT
);

-- ==========================
-- PRODUCTOS DE EJEMPLO
-- ==========================
INSERT INTO productos (nombre, descripcion, categoria, precio, stock) VALUES
('Café Americano', 'Clásico y fuerte', 'Bebida', 25.00, 10),
('Panini', 'Sándwich caliente', 'Comida', 40.00, 5),
('Capuchino', 'Café con leche espumada', 'Bebida', 35.00, 8),
('Chocolate Caliente', 'Chocolate tradicional', 'Bebida', 30.00, 6),
('Croissant', 'Pan francés', 'Panadería', 20.00, 12),
('Jugo de Naranja', 'Natural', 'Bebida', 22.00, 10),
('Sandwich Integral', 'Jamón y queso', 'Comida', 38.00, 7),
('Galletas', 'Paquete individual', 'Snack', 15.00, 20);
