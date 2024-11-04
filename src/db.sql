CREATE TABLE "user"
(
    id            SERIAL PRIMARY KEY,
    email         VARCHAR(100),
    password_hash VARCHAR(200),
    token         VARCHAR(100),
    name          VARCHAR(100)
);

CREATE TABLE address
(
    id          SERIAL PRIMARY KEY,
    street      VARCHAR(100),
    number      INTEGER,
    complement  VARCHAR(100),
    city        VARCHAR(100),
    state       VARCHAR(2),
    postal_code VARCHAR(20),
    longitude   NUMERIC(8, 6),
    latitude    NUMERIC(8, 6),
    region      VARCHAR(100)
);

CREATE TABLE producer
(
    id         SERIAL PRIMARY KEY,
    user_id    INTEGER REFERENCES "user" (id),
    cpf        VARCHAR(14),
    address_id INTEGER REFERENCES address (id),
    image_path VARCHAR(255)
);

CREATE TABLE product_type
(
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE product
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100),
    description VARCHAR(400),
    price       NUMERIC(10, 2),
    producer_id INTEGER REFERENCES producer (id),
    image_path  VARCHAR(255),
    type_id     INTEGER REFERENCES product_type (id),
    status      BOOLEAN,
    pesticides  BOOLEAN
);

-- Inserindo usuários
INSERT INTO "user" (email, password_hash, token, name)
VALUES
    ('joao@example.com', 'hash_senha_joao', 'token_joao', 'João Silva'),
    ('maria@example.com', 'hash_senha_maria', 'token_maria', 'Maria Souza'),
    ('ana@example.com', 'hash_senha_ana', 'token_ana', 'Ana Pereira');

-- Inserindo endereços
INSERT INTO address (street, number, complement, city, state, postal_code, longitude, latitude, region)
VALUES
    ('Rua das Flores', 123, 'Apto 101', 'São Paulo', 'SP', '12345-678', -52.69073783274691, -27.07296261224412, 'Sudeste'),
    ('Av. Brasil', 456, 'Casa', 'Rio de Janeiro', 'RJ', '87654-321', -52.66311409591421,-27.06424036998301, 'Sudeste'),
    ('Rua Bela Vista', 789, 'Bloco B', 'Curitiba', 'PR', '11223-445', -52.67634145901293, -27.13390066435797, 'Sul');

-- Inserindo produtores
INSERT INTO producer (user_id, image_path, cpf, address_id)
VALUES
    (1, 'uploads/user.png', '123.456.789-00', 1),
    (2, 'uploads/user_02.png', '987.654.321-00', 2),
    (3, 'uploads/user_03.png', '456.123.789-00', 3);

-- Inserindo tipos de produto
INSERT INTO product_type (name)
VALUES
    ('Vegetais'),
    ('Frutas'),
    ('Legumes');

-- Inserindo produtos
INSERT INTO product (name, description, price, producer_id, image_path, type_id, status, pesticides)
VALUES
    ('Cenouras', 'Cenouras frescas e crocantes, ricas em vitamina A.', 4.50, 1, 'uploads/carrots-1508847_1280.jpg', 1, true, false),
    ('Salada', 'Salada fresca com uma mistura de vegetais selecionados.', 15.00, 2, 'uploads/food-1834645_1280.jpg', 1, true, false),
    ('Pimentão Vermelho', 'Pimentão vermelho orgânico, ideal para saladas e grelhados.', 5.75, 3, 'uploads/pimentão-vermelho-e1592702460226.jpg', 3, true, false),
    ('Batata Doce', 'Batata doce rica em nutrientes, ideal para uma alimentação saudável.', 6.20, 1, 'uploads/sweet-potato-1666707_1280.jpg', 3, true, false),
    ('Tomate', 'Tomates frescos e suculentos, perfeitos para saladas e molhos.', 3.80, 2, 'uploads/tomate.jpg', 1, true, false);
