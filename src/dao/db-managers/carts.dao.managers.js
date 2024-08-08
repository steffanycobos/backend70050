import cartsModel from "../models/carts.model.js";
import productsModel from "../models/products.models.js";

class CartManagerDB {
  constructor() {}

  getCart = async () => {
    try {
      let carts = await cartsModel.find();
      let carritos = JSON.parse(JSON.stringify(carts));
      return carritos;
    } catch (error) {
      console.error("Error al tratar de obtener los carritos", error);
      throw error;
    }
  };

  async addCart() {
    try {
      const result = await cartsModel.create({});
      return result;
    } catch (error) {
      console.error("Error al agregar carrito.", error);
      throw error;
    }
  }
  async checkCart(id) {
    try {
      const cart = await cartsModel.find({ _id: id });
      if (cart) {
        return cart;
      } else {
        return console.log("No existe el carrito");
      }
    } catch (error) {
      console.error("Error!", error);
      throw error;
    }
  }

  async addProductToCart(cartID, productID) {
    try {
      let cart = await cartsModel.findById({ _id: cartID });
      let productDB = await productsModel.findById(productID);
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
    } catch (error) {
      console.error("Error al agregar producto al carrito.", error);
      throw error;
    }
  }

  async deleteProduct(cartID, productID) {
    try {
      const carritoActualizado = await cartsModel.findOneAndUpdate(
        { _id: cartID },
        { $pull: { products: { product: productID } } },
        { new: true }
      );

      if (!carritoActualizado) {
        throw new Error("Carrito no encontrado");
      }

      return carritoActualizado;
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
      throw error;
    }
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

  async updateQuantity(cartId, productId, quantity) {
    try {
      const updatedCart = await cartsModel.findOneAndUpdate(
        { _id: cartId, "products.product": productId },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
      if (!updatedCart) {
        throw new Error("Carrito o producto no encontrado");
      }
      return updatedCart;
    } catch (error) {
      console.error("Error al actualizar la cantidad del producto:", error);
      throw error;
    }
  }
}

export default CartManagerDB;
