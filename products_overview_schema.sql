CREATE DATABASE products_overview;

\c products_overview;

-- CREATE TABLES
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR (250),
    slogan VARCHAR (1000),
    "description" VARCHAR (5000),
    category VARCHAR (250),
    default_price VARCHAR(20)
);

CREATE TABLE features (
    features_id INT,
    product_id SERIAL REFERENCES products (id), 
    feature VARCHAR (250), 
    "value" VARCHAR (250),
    PRIMARY KEY (product_id)
);

CREATE TABLE related (
    related_id INT, 
    current_product_id SERIAL REFERENCES products (id), 
    related_product_id INT,
    PRIMARY KEY (current_product_id)
);

CREATE TABLE styles (
    style_id INT, 
    product_id SERIAL REFERENCES products (id), 
    "name" VARCHAR (500), 
    sale_price VARCHAR (20), 
    original_price VARCHAR (20), 
    default_style BOOLEAN,
    PRIMARY KEY (product_id)
);

CREATE TABLE skus (
    skus_id INT, 
    style_id INT REFERENCES styles (style_id), 
    size VARCHAR (100), 
    quantity INT,
    PRIMARY KEY (style_id)
);

CREATE TABLE photos (
    photo_id INT, 
    style_id INT REFERENCES styles (style_id), 
    "url" VARCHAR, 
    thumbnail_url VARCHAR, 
    PRIMARY KEY (style_id)
);

-- COPY OVER INFORMATION FROM .CSV FILES
COPY products (id, "name", slogan, "description", category, default_price)
FROM '/Users/gretaschock/HackReactor/SDC/SDC_Overview_Data/product.csv'
DELIMITER ','
CSV HEADER;

COPY features (features_id, product_id, feature, "value")
FROM '/Users/gretaschock/HackReactor/SDC/SDC_Overview_Data/features.csv'
DELIMITER ','
CSV HEADER; 

COPY related (related_id, current_product_id, related_product_id)
FROM '/Users/gretaschock/HackReactor/SDC/SDC_Overview_Data/related.csv'
DELIMITER ','
CSV HEADER; 

COPY styles (style_id, product_id, "name", sale_price, original_price, default_style)
FROM '/Users/gretaschock/HackReactor/SDC/SDC_Overview_Data/styles.csv'
DELIMITER ','
CSV HEADER;

COPY skus (skus_id, style_id, size, quantity)
FROM '/Users/gretaschock/HackReactor/SDC/SDC_Overview_Data/skus.csv'
DELIMITER ','
CSV HEADER;

COPY photos (photo_id, style_id, "url", thumbnail_url)
FROM '/Users/gretaschock/HackReactor/SDC/SDC_Overview_Data/photos.csv'
DELIMITER ','
CSV HEADER;


-- CREATE INDEXES FOR EACH TABLES
CREATE INDEX products_product_id_index ON products (id);
CREATE INDEX features_product_id_index ON features (product_id);
CREATE INDEX related_current_product_id_index ON related (current_product_id);
CREATE INDEX styles_product_id_index ON styles (product_id);
CREATE INDEX skus_styles_id_index ON skus (style_id);
CREATE INDEX photos_styles_id_index ON photos (style_id);