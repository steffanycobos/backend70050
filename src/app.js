import express from "express";
import { urlencoded } from "express";
import { create } from 'express-handlebars';
import handlebars from "express-handlebars";
import bodyParser from "body-parser";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import {__dirname}from "./utils.js";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import dotenv from 'dotenv'

const app = express();
const hbs = create({}); 
dotenv.config()

const httpServer = app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))


app.use("/", viewsRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


mongoose.connect(process.env.DATABASE_URL
).then((conn) => { console.log("Connected to MongoDB!!");   });






