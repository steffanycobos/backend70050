import { Router} from "express";
import { urlencoded } from "express";
import ProductManager from "../dao/productManager.js";

const productsRouter = Router();
let manager= new ProductManager();


productsRouter.use(urlencoded({ extended: true }));
// OBTENER TODOS LOS PRODUCTOS
productsRouter.get('/', async (req,res)=>{
    let products= await manager.getProducts()
    const {limit}= req.query
    if (limit){
        products.length= limit
        res.send( products)
    } else{
        res.send(products)
    }
})
// OBTENER PRODUCTO POR ID
productsRouter.get('/:pid', async (req,res)=>{
    let pid= (req.params.pid)
    let producto= await manager.getProductById(pid)
    console.log(producto)
     res.send(producto)
})

// AGREGAR PRODUCTO
productsRouter.post('/', async (req,res)=>{
   let { title, description, price, code, stock,category}= req.body
   let newProduct= await manager.addProducts( title, description, price, code, stock,category)
   res.send('Producto agregado con éxito!')

})

// ACTUALIZAR PRODUCTO
productsRouter.put('/update/:pid', async (req,res)=>{
    let pid= req.params.pid
    let { title, description, price, code, stock,category}= req.body
    let update= await manager.updateProduct(pid, title, description, price, code, stock,category)
    res.send('Producto actualizado con éxito')
    console.log(update)

})


// ELIMINAR PRODUCTO
productsRouter.delete('/delete/:pid', async(req,res)=>{
    let pid= (req.params.pid)
    let deleteProduct= await manager.deleteProduct(pid)
    res.send('Producto eliminado!')
})
   

export default productsRouter;