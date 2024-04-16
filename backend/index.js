import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";

const app = express();

app.use(express.json());

app.get('/', (request, response)=>{
    console.log(request)
    return response.status(234).send('Welcome to MERN')
});

app.post('/books', async (request, response)=> {
    try{
        if(
            !request.body.title||
            !request.body.author||
            !request.body.publishedYear
        ){
            return response.status(400).send({
                message: 'send all required fields: title, author publishedYear'
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishedYear: request.body.publishedYear,
        };
        const book = await Book.create(newBook)

        return response.status(201).send(book);
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
});

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
