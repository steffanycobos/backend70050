import { Router} from "express";
import { urlencoded } from "express";
import CartManager from "../dao/cartManager.js";

const cartsRouter= Router()

let manager=  new CartManager()

cartsRouter.get('/', async(req,res)=>{
    let carts= await manager.getCart()
    res.send(carts)
   
})
cartsRouter.post('/', async(req,res)=>{
    let carts= await manager.addCart()
    res.send(carts)

})

cartsRouter.get('/:cid', async(req,res)=>{
    let cid= req.params.cid
    let carts= await manager.showProducts(cid)
    res.send(carts)
   
})

cartsRouter.post( '/:cid/product/:pid', async(req,res)=>{
    let cid= req.params.cid
    let pid= req.params.pid
    let cart= manager.addProductToCart(cid,pid)
    res.send('Producto Agregado con Éxito!!')
  
} )




export default cartsRouter;