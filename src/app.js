import express from "express";
import { urlencoded } from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.routes.js";
import viewsRouter from "./routes/views.routes.js";
import ProductManager from "./dao/productManager.js";
import {__dirname}from "./utils.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";


const app = express();

app.use(urlencoded({ extended: true }));
app.engine("handlebars", handlebars.engine());
app.use(express.static(__dirname + "/../public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");


const httpServer = app.listen(8080, () => {
  console.log("Server listening on port 8080");
});


app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);



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
});