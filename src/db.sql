CREATE TABLE product_type (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL
);

CREATE TABLE product (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    description text,
    price numeric(10, 2) NOT NULL,
    image_path varchar(255),
    type_id integer REFERENCES product_type(id),
    status varchar(20),
    has_pesticides boolean
);

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    token VARCHAR(255),
    name VARCHAR(255) NOT NULL
);

