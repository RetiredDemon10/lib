-- Active: 1680004659013@@127.0.0.1@3306
-- database 
CREATE DATABASE library


USE library 



-- table for students
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- table for administrators (admins)
CREATE TABLE admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- table for books
CREATE TABLE books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publication_year INT,
    isbn VARCHAR(13) UNIQUE NOT NULL,
    availability BOOLEAN DEFAULT TRUE
);

-- data for the books table
INSERT INTO books (title, author, publication_year, isbn, availability)
VALUES
    ('Book 1', 'Author A', 2020, 'ISBN12390', true),
    ('Book 2', 'Author B', 2019, 'ISBN0984321', true),
    ('Book 3', 'Author C', 2021, 'ISBN1112234', false);
