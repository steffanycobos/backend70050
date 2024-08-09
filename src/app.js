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
import { Server } from "socket.io";
import mongoose from "mongoose";

const app = express();
const hbs = create({}); 

const httpServer = app.listen(8080, () => {
  console.log("Server listening on port 8080");
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


mongoose.connect('mongodb+srv://cobosleandra2:171294@cluster0.ydfb7m6.mongodb.net/?retryWrites=true'
).then((conn) => { console.log("Connected to MongoDB!!");   });






 /*
//socket
export const socketServer = new Server(httpServer);
socketServer.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado. Id: " + socket.id);
let manager= new ProductManager()
  try {
    const productsList = await manager.getProducts();
    socket.emit("home", productsList);
    socket.emit("realtime", productsList);
  } catch (error) {
    console.error("Error al obtener la lista de productos", error);
  }

  socket.on("nuevo-producto", async (producto) => {
    try {
      await manager.addProducts(producto);
      const updatedProductsList = await manager.getProducts();
      socketServer.emit("realtime", updatedProductsList);
    } catch (error) {
      console.error("Error al agregar el producto", error);
    }
  });

  socket.on("eliminar-producto", async (productId) => {
    try {
      await manager.deleteProduct(productId);
      const updatedProductsList = await manager.getProducts();
      socketServer.emit("realtime", updatedProductsList);
    } catch (error) {
      console.error("Error al eliminar el producto", error);
    }
  });
});*/