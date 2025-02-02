import express from 'express';
import pkg from 'body-parser';
import client from './db/dbconnect.js';
import cors from "cors";
import http from 'http';
import {Server} from 'socket.io';
const { json, urlencoded } = pkg;
const app = express();
const server = http.createServer(app);

//options for cors midddleware
const options = {
    allowedHeaders: [
        'X-ACCESS_TOKEN',
        'Access-Control-Allow-Origin',
        'Authorization',
        'Origin',
        'x-requested-with',
        'Content-Type',
        'Content-Range',
        'Content-Disposition',
        'Content-Description',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: ['http://172.24.2.3:3000','http://localhost:3000'],
    preflightContinue: false,
};
const corsOpts = cors(options);

const io = new Server(server, {
    cors: {
        origin: ['http://172.24.2.3:3000','http://localhost:3000'],
        methods: ['GET', 'POST','PUT','DELETE','HEAD','PATCH']
    },
    transports: ['websocket', 'polling'],
})

//add cors middleware
app.use(corsOpts);
app.use(json())
app.use(urlencoded({
    extended: false
}))



client.connect().then(() => { console.log('Connected to PostgreSQL database!'); }).catch((err) => { console.error('Error connecting to the database:', err); });;

// app.use(cors({
//     origin: ['http://172.24.2.3:3000', 'http://localhost:3000'],
//     methods: ['GET', 'POST','PUT','DELETE','HEAD','PATCH']
// }))









app.all('/check', (req, res) => {
    res.send("CHEck success");
})

app.get('/list', async (req, res) => {
    const { itemsPerPage, pageno } = req.query;
    try {
        // let q = await client.query('select * from public.contract_data order by id desc')
        let q = await client.query('SELECT * FROM public.contract_data order by id desc LIMIT ($1) OFFSET (($2 - 1) * $3) ',[itemsPerPage, pageno, itemsPerPage])
        res.send(JSON.stringify(q.rows))
    } catch(e) {
        res.send(e)
    } 
})

app.post('/post', async (req, res) => {
    console.log(req.body)
    const { title, contract_aggreement, contract_owner, status } = req.body;

    console.log(req.body)
    try {
    
        client.query('insert into public.contract_data(title,contract_agg,whose_created,status) values ($1,$2,$3,$4)', [title, contract_aggreement, contract_owner, status], (err, result) => {
            if (result) {
                console.log(result.rowCount)
                io.emit('pushNotifications', {
                message: "New record inserted"
                })
                res.send({
                    message: "Record is inserted successfully"
                });
                io.on('connection', (socket) => {
                    console.log('a user connected');
                    socket.on('disconnect', () => {
                        console.log("Client disconnected")
                    })
                  });
            }
        });
    } catch(e) {
        res.send(e)
    }  
})


app.get('/post/edit/:id', async (req, res) => {
    const { id } = req.params;

    let q = await client.query(`select * from contract_data where id='${id}'`)
    res.send(JSON.stringify(q.rows));


})


app.post('/post/update/:id',async (req, res) => {

    const { id } = req.params;
    const { title, contract_agg, whose_created, status } = req.body;
    console.log("Update post - ",id,title, contract_agg, whose_created, status)
    try {
        client.query('call public.sp_update_contract_data($1,$2,$3,$4,$5)', [parseInt(id), title, contract_agg, whose_created, status],
            (err, result) => {
                if (result) { 
                    if (status == "complete") {
                        io.emit('pushNotifications', {
                            message: "Congratulations!!! Contract is final"
                        });
                        io.on('connection', (socket) => {
                        console.log('Contract is final, a user connected');
                        socket.on('disconnect', () => {
                            console.log("Client disconnected")
                        })
                        });
                    }
                    res.send({
                        message: "Record is updated successfully"
                    })
                }
                
            })
        
        
        
    } catch (error) {
        console.log(error)
        res.send(error)
    }
    
})

io.on('connection', (socket) => {
    console.log('Socket server connected');
    socket.emit("welcome", "welcome to backend")
    socket.on("msg", (data) => {
        console.log(data)
    })
    socket.on('disconnect', () => {
        console.log("Client server disconnected")
    })
});


server.listen('4000', (err) => {
    if (err) {
        throw(err) 
    } else {
        console.log(`Server is started`)
        
    }
});


