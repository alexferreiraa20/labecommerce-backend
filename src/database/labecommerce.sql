-- Active: 1673884621309@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES
('u001', 'user01@email.com', '1234'),
('u002', 'user02@email.com', '12345'),
('u003', 'user03@email.com', '123456');

PRAGMA table_info('users');

SELECT * FROM users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES 
('p001', 'Heartstopper', 36.90, 'book'),
('p002', 'Range Rover', 500.485, 'car'),
('p003', 'Golden Retriver', 2000.50, 'dog'),
('p004', 'Iphone 14 pro max', 9899.85, 'smartphone'),
('p005', 'Calça Jeans', 99.90, 'clothes');

PRAGMA table_info('products');

SELECT * FROM products;