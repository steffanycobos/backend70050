import { Router} from "express";
import { urlencoded } from "express";
import { __dirname } from "../utils.js";
import CartManager from "../dao/cartManager.js";

const cartsRouter= Router()

let manager=  new CartManager( __dirname+ '/dao/files/carts.json')

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
    let carts= await manager.showProducts(cid)
    res.status(200).json(carts)
   
})

cartsRouter.post( '/:cid/product/:pid', async(req,res)=>{
    let cid= req.params.cid
    let pid= req.params.pid
    let cart= manager.addProductToCart(cid,pid)
    res.status(201).json('Producto agregado con Éxito!')
  
} )




export default cartsRouter;