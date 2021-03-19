CREATE DATABASE overview;

\c overview;

-- CREATE TABLES
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR (250),
    product_slogan VARCHAR (1000),
    product_description VARCHAR (5000),
    product_category VARCHAR (250),
    product_default_price VARCHAR(20)
);

CREATE TABLE features (
    features_id INT,
    product_id SERIAL REFERENCES products (product_id), 
    features_feature VARCHAR (250), 
    features_value VARCHAR (250),
    PRIMARY KEY (features_id)
);

CREATE TABLE related (
    related_id INT, 
    current_product_id SERIAL REFERENCES products (product_id), 
    related_product_id INT,
    PRIMARY KEY (related_id)
);

CREATE TABLE styles (
    styles_id INT, 
    product_id SERIAL REFERENCES products (product_id), 
    styles_name VARCHAR (500), 
    styles_sale_price VARCHAR (20), 
    styles_original_price VARCHAR (20), 
    styles_default_style BOOLEAN,
    PRIMARY KEY (styles_id)
);

CREATE TABLE skus (
    skus_id INT, 
    styles_id INT REFERENCES styles (styles_id), 
    skus_size VARCHAR (100), 
    skus_quantity INT,
    PRIMARY KEY (skus_id)
);

CREATE TABLE photos (
    photos_id INT, 
    styles_id INT REFERENCES styles (styles_id), 
    photos_url VARCHAR, 
    photos_thumbnail_url VARCHAR, 
    PRIMARY KEY (photos_id)
);

-- COPY OVER INFORMATION FROM .CSV FILES
COPY products (product_id, product_name, product_slogan, product_description, product_category, product_default_price)
FROM '/Users/gretaschock/HackReactor/SDC/SDC_Overview_Data/product.csv'
DELIMITER ','
CSV HEADER;

COPY features (features_id, product_id, features_feature, features_value) 
FROM '/Users/gretaschock/HackReactor/SDC/SDC_Overview_Data/features.csv'
DELIMITER ','
CSV HEADER; 

COPY related (related_id, current_product_id, related_product_id)
FROM '/Users/gretaschock/HackReactor/SDC/SDC_Overview_Data/related.csv'
DELIMITER ','
CSV HEADER; 

COPY styles (styles_id, product_id, styles_name, styles_sale_price, styles_original_price, styles_default_style)
FROM '/Users/gretaschock/HackReactor/SDC/SDC_Overview_Data/styles.csv'
DELIMITER ','
CSV HEADER;

COPY skus (skus_id, styles_id, skus_size, skus_quantity)
FROM '/Users/gretaschock/HackReactor/SDC/SDC_Overview_Data/skus.csv'
DELIMITER ','
CSV HEADER;

COPY photos (photos_id, styles_id, photos_url, photos_thumbnail_url)
FROM '/Users/gretaschock/HackReactor/SDC/SDC_Overview_Data/photos.csv'
DELIMITER ','
CSV HEADER;


-- CREATE INDEXES FOR EACH TABLES
CREATE INDEX products_product_id_index ON products (product_id);
CREATE INDEX features_product_id_index ON features (product_id);
CREATE INDEX related_current_product_id_index ON related (current_product_id);
CREATE INDEX styles_product_id_index ON styles (product_id);
CREATE INDEX skus_styles_id_index ON skus (styles_id);
CREATE INDEX photos_styles_id_index ON photos (styles_id);