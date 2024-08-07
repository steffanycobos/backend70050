
import cartsModel from "../models/carts.model.js";
import ProductManagerDB from "./products.dao.managers.js";
import productsModel from "../models/products.models.js";


let manager = new ProductManagerDB();
class CartManagerDB {
  constructor() {}

  getCart = async () => {
    let carts = await cartsModel.find();
    let carritos= JSON.parse(JSON.stringify(carts))
    return carritos;
  };

  async addCart() {
    const result = await cartsModel.create({});
    return result;
  }

  async checkCart(id) {
    const cart = await cartsModel.find({ _id: id });
    if (cart){
      return cart;
    }else{
    return   console.log("No existe el carrito")
  }
  }

  async addProductToCart(cartID, productID) {
    let cart = await cartsModel.findById({ _id: cartID });
    let productDB = await productsModel.findById(productID);
    console.log(cart.products);
    const productExiste = cart.products.find(
      (p) => p.product.code === productDB.code
    );
    if (productExiste) {
      productExiste.quantity++;
      cart.save();
      return cart;
    } else {
      cart.products.push({ product: productID });
      cart.save();
      return cart;
    }
  }
  async deleteProduct(cartID, productID) {
    const cart = await cartsModel.find({ _id: cartID });
    console.log(cart);
    let productInCart = await manager.deleteProduct(productID);
    productInCart.save();
    return productInCart;
  }

  async deleteProductsInCart(cid) {
    const cart = await cartsModel.findOne({ _id: cid });
    let products = delete cart.products;
    if (products === true) {
      cart.products = [];
      await cart.save();
      return [cart];
    }
  }

  async updateQuantity(cid, pid, quantity) {
    const cart = await cartsModel.find({ _id: cid });
    let productInCart = cart[0].products.find((x) => x.id === pid);
    console.log(cart[0], productInCart);
    productInCart.quantity = quantity;
    return cart;
  }

}
export default CartManagerDB;
