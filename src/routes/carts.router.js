import { Router} from "express";
import { urlencoded } from "express";
import { __dirname } from "../utils.js";
import CartManager from '../dao/files-managers/cartManager.js';
import CartManagerDB from "../dao/db-managers/carts.dao.managers.js";

const cartsRouter= Router()

let manager=  new CartManagerDB()

//OBTIENE TODOS LOS CARRITOS
cartsRouter.get('/', async(req,res)=>{
    let carts= await manager.getCart()
    res.send({
        status: 'ok',
        payload: carts
      })
    })

   //AGREGA UN CARRITO
cartsRouter.post('/', async(req,res)=>{
    let carts= await manager.addCart()
    res.send({
        status: 'ok',
        payload: carts
      })

})
//BUSCA CARRITO POR ID
cartsRouter.get('/:cid', async(req,res)=>{
    let cid= req.params.cid
    let carts= await manager.checkCart(cid)
    res.send({
        status: 'ok',
        payload: carts
      })
   
})
//AGREGA UN PRODUCTO A UN CARRITO
cartsRouter.post( '/:cid/product/:pid', async(req,res)=>{
    let cid= req.params.cid
    let pid= req.params.pid
    let cart= manager.addProductToCart(cid,pid)
    res.send({
        status: 'ok',
        payload: cart
      })
  
} )
//ELIMINA UN PRODUCTO DE UN CARRITO 
cartsRouter.delete('/:cid/product/:pid', async (req,res)=>{
    let cid= req.params.cid
    let pid= req.params.pid
    let cart= await manager.deleteProduct(cid,pid)
    res.send({
        status: 'ok',
        payload: cart
      })
    }
)
//MODIFICA LA CANTIDAD DE UN PRODUCTO EN ESPECIFICO EN EL CARRITO
cartsRouter.put('/:cid/product/:pid', async (req,res)=>{
    let cid = req.params.cid
    let pid = req.params.pid
    let {quantity}= req.body
    console.log(quantity)
    let cart = await manager.updateQuantity(cid, pid, quantity)
    res.send({
      status: 'ok',
      payload: cart
    })
  }
)

//ELIMINA RTODOS LOS PRODUCTOS DEL CARRITO
cartsRouter.delete('/:cid', async (req,res)=>{
    let cid= req.params.cid
    let cart= await manager.deleteProductsInCart(cid)
    res.send({
        status: 'ok',
        payload: cart
      })
    }
)
export default cartsRouter;