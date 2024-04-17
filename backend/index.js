import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';
const app = express();

//middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//allow all originswith defaultof cors(*)
//app.use(cors());
//allow custom origins
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders:['Content-Type'],
}));


app.get('/', (request, response)=>{
    console.log(request)
    return response.status(234).send('Welcome to MERN')
});

app.use('/books', booksRoute);

//link to database in mongodb
mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log('App conected to database');
        app.listen(PORT, ()=>{
            console.log(`App is listening to port: ${PORT}`);
        });
        
    }).catch((error)=>{
        console.log(error);
    });
