DROP DATABASE IF EXISTS bamazon;
create database bamazon;

use bamazon;

create table products (
item_id INTEGER NOT NULL,
product_name VARCHAR(20),
department_name VARCHAR(20),
price DECIMAL(10,2) NULL,
stock_quantity INT,
PRIMARY KEY (item_id)
);

SELECT * FROM products;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Cm240790';


ALTER TABLE products
ADD new_column INT;

ALTER TABLE products
DROP new_column INT;