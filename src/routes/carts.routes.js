import { Router} from "express";
import { urlencoded } from "express";
import { __dirname } from "../utils.js";
import CartManager from '../dao/files-managers/cartManager.js';
import CartManagerDB from "../dao/db-managers/carts.dao.managers.js";

const cartsRouter= Router()

let manager=  new CartManagerDB()

cartsRouter.get('/', async(req,res)=>{
    let carts= await manager.getCart()
    res.status(200).json(carts)

   
})
cartsRouter.post('/', async(req,res)=>{
    let carts= await manager.addCart()
    res.status(201).json(carts)

})

cartsRouter.get('/:cid', async(req,res)=>{
    let cid= req.params.cid
    let carts= await manager.checkCart(cid)
    res.status(200).json(carts)
   
})

cartsRouter.post( '/:cid/product/:pid', async(req,res)=>{
    let cid= req.params.cid
    let pid= req.params.pid
    let cart= manager.addProductToCart(cid,pid)
    res.status(201).json('Producto agregado con Éxito!')
  
} )

cartsRouter.delete('/:cid/products/:pid', async (req,res)=>{
    let cid= req.params.cid
    let pid= req.params.pid
    let cart= await manager.deleteProduct(cid,pid)
    res.status(200).json(cart)
})

cartsRouter.put('/:cid/products/:pid', async (req,res)=>{
    let cid= req.params.cid
    let pid= req.params.pid
    let quantity= req.body
    let cart= await manager.updateQuantity(cid,pid,quantity)
    res.status(200).json(cart)
})

export default cartsRouter;