# SDC_Overview_GS

# Product-Database
Back End Project
Storing the data for the products

Project Catwalk is the web portal for a retail apparel store. The project's purspose was to do a complete redesign of the current backend system that can withstand a significant increase in traffic. I created the schema for over 5GB of retail data in PostgreSQL relating to a product's detail, styles, and related products. After deploying the database and inital server on to an AWS EC2 instance, I then stress-tested the Product Over service in production using loader.io in isolation from other services. I then horizontally scaled the service using NginX as load balancer feeding five horizontally scaled server instances.

Built with:
* [JavaScript](https://www.javascript.com/)
* [Axios](https://www.npmjs.com/package/axios)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [AWS (EC2)](https://aws.amazon.com/)
* [Docker](https://www.docker.com/)
* [Nginx](https://nginx.org/en/docs/)

Testing:
* [Postman](https://www.postman.com/)
* [K6](https://k6.io/)
* [Loader.io](https://loader.io/)

Requirements
=============
<h3>Installing Dependencies</h3>

From within the root directory:<br>
`npm install`

Development
=============
From within the root directory:

To run server<br>
`npm start`
