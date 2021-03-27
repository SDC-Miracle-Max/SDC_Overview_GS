CREATE DATABASE products_overview;

\c products_overview;

-- CREATE TABLES
CREATE TABLE products (
    id SERIAL NOT NULL PRIMARY KEY,
    "name" VARCHAR (250),
    slogan VARCHAR (1000),
    "description" VARCHAR (5000),
    category VARCHAR (250),
    default_price VARCHAR(20)
);

CREATE TABLE features (
    feature_id SERIAL NOT NULL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES products (id), 
    feature VARCHAR (250), 
    "value" VARCHAR (250)
);

CREATE TABLE related (
    related_id SERIAL NOT NULL PRIMARY KEY, 
    current_product_id INT NOT NULL REFERENCES products (id), 
    related_product_id INT
);

CREATE TABLE styles (
    style_id SERIAL NOT NULL PRIMARY KEY, 
    product_id INT NOT NULL REFERENCES products (id), 
    "name" VARCHAR (500), 
    sale_price VARCHAR (20), 
    original_price VARCHAR (20), 
    "default?" BOOLEAN
);

CREATE TABLE skus (
    skus_id SERIAL NOT NULL PRIMARY KEY, 
    style_id INT NOT NULL REFERENCES styles (style_id), 
    size VARCHAR (100), 
    quantity INT
);

CREATE TABLE photos (
    photo_id SERIAL NOT NULL PRIMARY KEY, 
    style_id INT NOT NULL REFERENCES styles (style_id), 
    "url" VARCHAR, 
    thumbnail_url VARCHAR
);


-- CREATE INDEXES FOR EACH TABLES
CREATE INDEX products_id_index ON products (id);
CREATE INDEX features_product_id_index ON features (product_id);
CREATE INDEX related_current_product_id_index ON related (current_product_id);
CREATE INDEX styles_product_id_index ON styles (product_id);
CREATE INDEX skus_style_id_index ON skus (style_id);
CREATE INDEX photos_style_id_index ON photos (style_id);


