CREATE DATABASE overview;

\c overview;

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


