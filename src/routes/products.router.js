import { Router} from "express";
import { urlencoded } from "express";
import { __dirname } from "../utils.js";
import ProductManager from "../dao/productManager.js";

const productsRouter = Router();
let manager= new ProductManager( __dirname+ '/dao/files/products.json');

productsRouter.use(urlencoded({ extended: true }));

// OBTENER TODOS LOS PRODUCTO
productsRouter.get('/', async (req,res)=>{
    let products= await manager.getProducts()
    const {limit}= req.query
    if (limit){
        products.length= limit
        res.status(200).json(products)
    } else{
        res.status(200).json(products)}
    
})
// OBTENER PRODUCTO POR ID
productsRouter.get('/:pid', async (req,res)=>{
    let pid= (req.params.pid)
    let producto= await manager.getProductById(pid)
    res.status(200).json(producto)
})

// AGREGAR PRODUCTO
productsRouter.post('/', async (req,res)=>{
   let { title, description, price, code, stock,category}= req.body
   let newProduct= await manager.addProducts( title, description, price, code, stock,category)
   res.status(201).json('Producto agregado con éxito!')

})

// ACTUALIZAR PRODUCTO
productsRouter.put('/update/:pid', async (req,res)=>{
    let pid= req.params.pid
    let { title, description, price, code, stock,category}= req.body
    let update= await manager.updateProduct(pid, title, description, price, code, stock,category)
    res.status(202).json('Producto actualizado con éxito')
    console.log(update)

})


// ELIMINAR PRODUCTO
productsRouter.delete('/delete/:pid', async(req,res)=>{
    let pid= (req.params.pid)
    let deleteProduct= await manager.deleteProduct(pid)
    res.status(200).json('Producto Eliminado')
})
   

export default productsRouter;