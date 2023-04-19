CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
);

CREATE TABLE b(
    b_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
);