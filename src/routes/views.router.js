import { Router } from "express";
import ProductManager from "../dao/files-managers/productManager.js";


const viewsRouter = Router();
const productManager = new ProductManager();

viewsRouter.get("/", async (req, res) => {
  res.render("home");
});

viewsRouter.get("/realtimeproducts", async (req, res) => {

  res.render("real_time_products");
});



export default viewsRouter;
