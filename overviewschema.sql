psql; 

CREATE DATABASE IF NOT EXISTS Overview;

\c overview;

CREATE TABLE IF NOT EXISTS Product_List (
    product_id INT,
    product_name VARCHAR (100),
    product_slogan VARCHAR (250),
    product_description VARCHAR (250),
    product_category VARCHAR (100),
    product_default_price INT,
    PRIMARY KEY (product_id)
);


CREATE TABLE IF NOT EXISTS Features (
    features_id INT
    product_id INT, 
    product_features_feature VARCHAR (100), 
    product_features_value VARCHAR (100),
    PRIMARY KEY (features_id)
);

CREATE TABLE IF NOT EXISTS Related (
    related_id INT, 
    current_product_id INT, 
    related_product_id INT,
    PRIMARY KEY (related_id)

);


CREATE TABLE IF NOT EXISTS Styles (
    styles_id INT, 
    product_id INT, 
    styles_name VARCHAR (100), 
    styles_original_price INT, 
    styles_sale_price INT, 
    styles_default_style BOOLEAN,
    PRIMARY KEY (styles_id)

);

CREATE TABLE IF NOT EXISTS SKUS (
    skus_id INT, 
    styles_id INT, 
    skus_size VARCHAR (100), 
    skus_quantity VARCHAR (100),
    PRIMARY KEY (skus_id)
);

CREATE TABLE IF NOT EXISTS Photos (
    photos_id INT, 
    styles_id INT, 
    photos_url VARCHAR (500), 
    photos_thumbnail_url VARCHAR (500), 
    PRIMARY KEY (photos_id)
);


