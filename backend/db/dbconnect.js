import { Client } from 'pg';


var client = new Client({
         //After postgres container build, check ip address by docker inspect contId-IPAddress and add in host and restart container
        host: 'localhost',
        port: 5433,
        user: 'postgres',
        password: 'postgres',
        database: 'tractus',
  
    });

export default client;


