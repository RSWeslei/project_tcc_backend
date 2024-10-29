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
    address_id INTEGER REFERENCES address (id)
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