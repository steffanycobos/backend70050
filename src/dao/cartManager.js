import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import ProductManager from "./productManager.js";


let manager= new ProductManager()


class CartManager {
  #path;
  constructor(path) {
    this.#path = 'src/dao/files/carts.json';
  }

  async getCart() {
    try {
      const carts = await fs.promises.readFile(this.#path, "utf-8");
      return JSON.parse(carts);
    } catch (e) {
      return [];
    }
  }

  async addCart() {
    // AGREGA CARRITO SIN PRODUCTO
    try {
      let carts = await this.getCart();
      const carrito = {
        id: uuidv4().slice(32),
        products: [],
      };
      carts = [...carts, carrito];
      await fs.promises.writeFile(this.#path, JSON.stringify(carts));
      return carts;
    } catch (e) {
        console.error("Error:", e); // Manejo de errores
        throw new Error("Error al agregar carrito"); //
    }
  }
  async checkCart(id) {
    // BUSCA CARRITO POR ID
    let cart = await this.getCart();
    let prodCart = cart.find((x) => x.id === id);
    if (prodCart) {
      return prodCart;
    } else {
      throw new Error(`No se Encontró carrito con ese ID.`);
    }
  }

  async showProducts(id) {
    let cart = await this.getCart();
    let prodCart = cart.find((x) => x.id === id);
    if (prodCart) {
      return prodCart.products;
    } else {
      throw new Error(`No se Encontró carrito con ese ID.`);
    }
  }

  async addProductToCart(cartID, product) {
    try {
      let allCarts = await this.getCart(); 
      const cartProd = await this.checkCart(cartID); 
      let producto = cartProd.products.find((x) => x.id === product); 
      let findProduct = await manager.getProductById(product); 
    
      if (producto === undefined) {
        let newProduct = {
          id: findProduct.id,
          quantity: 1,
        };
        cartProd.products.push(newProduct); // Agrego el nuevo producto al carrito

        // Reemplazo el carrito anterior con el carrito actualizado en la lista de todos los carritos
        let updatedCarts = allCarts.map((cart) => {
          if (cart.id === cartProd.id) {
            return cartProd; // Reemplazo el carrito actualizado
          }
          return cart; // Mantengo los otros carritos sin cambios
        });

        let updatedCartsString = JSON.stringify(updatedCarts);

        // Escribo los carritos actualizados en el archivo
        await fs.promises.writeFile(this.#path, updatedCartsString);
        return cartProd; // Devuelvo el carrito actualizado
      } else {
        producto.quantity = producto.quantity + 1;
        let updatedCarts = allCarts.map((cart) => {
          if (cart.id === cartProd.id) {
            return cartProd;
          }
          return cart;
        });
        let updatedCartsString = JSON.stringify(updatedCarts);

        await fs.promises.writeFile(this.#path, updatedCartsString);

        return cartProd;
      }
    } catch (e) {
      console.error("Error:", e); 
      throw new Error("Error al agregar el producto al carrito"); //
    }
  }
}

export default CartManager;
