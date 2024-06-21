import express from "express";
import { urlencoded } from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.routes.js";

const app = express();

app.use(express.json())
app.use(urlencoded({ extended: true }));


const httpServer = app.listen(8080, () => {
  console.log(`Server listening on port 8080`);
});

app.use("/api/products", productsRouter);
app.use("/api/carts",cartsRouter)
