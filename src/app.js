import express from "express";
import { urlencoded } from "express";
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
app.use(express.json())
app.use(urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
const httpServer = app.listen(8080, () => {
  console.log("Server listening on port 8080");
});


mongoose.connect('mongodb+srv://cobosleandra2:171294@cluster0.ydfb7m6.mongodb.net/?retryWrites=true'
).then((conn) => { console.log("Connected to MongoDB!!");   });


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter)


app.get('/hola', (req, res) => {
  res.render('prueba', { title: 'Mi página de inicio' });
});




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