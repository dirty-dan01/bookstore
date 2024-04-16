import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "backend/routes/bookRoutes.js"

const app = express();

app.use(express.json());

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
