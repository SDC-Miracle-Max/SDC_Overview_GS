psql; 

CREATE DATABASE IF NOT EXISTS overview;

\c overview;

CREATE TABLE IF NOT EXISTS Product_Info (
    product_id serial,
    product_name varchar,
    product_slogan varchar
    product_description varchar,
    product_category varchar,
    product_default_price varchar,
    product_styles_id serial <-------this could be a number? How do we refer to foreign keys 
)

CREATE TABLE IF NOT EXISTS Related_Products (
    product_id serial,
    related_product_id serial
)

CREATE TABLE IF NOT EXISTS Product_Features (
    product_id serial, 
    product_features_feature varchar, 
    product_features_value varchar
)

CREATE TABLE IF NOT EXISTS Product_Styles (
    product_styles_id serial, 
    product_styles_name varchar, 
    product_styles_original_price varchar, 
    product_styles_sale_price varchar, 
    product_styles_default boolean
)

CREATE TABLE IF NOT EXISTS Product_Styles_Photos  (
    styles_id serial, 
    product_styles_photos_thumbnail_url varchar, 
    product_styles_photos_url varchar
)

CREATE TABLE IF NOT EXISTS Product_Styles_SKUS (
    styles_id serial, 
    product_styles_SKUS_id serial, 
    product_styles_SKUS_quantity varchar, 
    product_styles_SKUS_size varchar
)