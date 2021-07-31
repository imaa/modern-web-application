Run the app using nodemon or node app.js  
database configuration and port configurations are in the .env 

create index for geosearch 
db.data.createIndex({"location":"2dsphere"});