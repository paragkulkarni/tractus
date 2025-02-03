import { Client } from "pg";

var client = new Client({
  //After postgres container build, check ip address by docker inspect contId-IPAddress and add in host and restart container
  // host: "tractusdb.czw0u62syzrj.ap-south-1.rds.amazonaws.com",
  host: "tractusdb.czw0u62syzrj.ap-south-1.rds.amazonaws.com",
  port: 5432,
  user: "postgres",
  password: "tractuspostgres",
  database: "tractus",
});

export default client;
