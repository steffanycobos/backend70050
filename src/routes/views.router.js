import { Router } from "express";
import ProductManagerDB from "../dao/db-managers/products.dao.managers.js";


const viewsRouter = Router();
const productManager = new ProductManagerDB();

viewsRouter.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", {products});
});




export default viewsRouter;
