
import productsModel from "../models/products.models.js";
import fs from 'fs'

class ProductManagerDB {
  constructor() {}

  async getProducts(page, limit) {
    const options = {
      page: page|| 1, 
      limit: limit || 10, 
    };

  let products = await productsModel.paginate({},options);
   let productos = JSON.parse(JSON.stringify(products));
    return productos;
  }

  async addProducts(title, description, price, thumbnail, code, stock, category) {
    let newProduct = await productsModel.create({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category
    });
    console.log('newProduct:', newProduct)

    return newProduct;
  }

  async getProductById(id) {
    const product = await productsModel.find({ _id: id });
    if (product.length==0){
      return console.log('No existe ese producto')
    }else{
 
    return product;
  }}
  async updateProduct(id, title, description, price, thumbnail, code, stock,category) {
    const filter = { _id: id };
    const update = { title, description, price, thumbnail, code, stock, category };
    
    let product = await productsModel.findOneAndUpdate(filter, update);
    product.save()
    return product;
  }

  async deleteProduct(id) {
    const productDelete = await productsModel.deleteOne({ _id: id });
    return productDelete;
  
  }

  async ordenPrice(num) {
    const products = await productsModel.aggregate([{ $sort: { price: num } }]);
    return products;
  }

  async getProductsByQueryTitle(dato) {
    const products = await productsModel.aggregate([
      { $match: { title: dato } },
    ]);
    return products;
  }
  
  async getProductsByQueryCategory(dato) {
    const products = await productsModel.aggregate([
      { $match: { category: dato } }, { $sort: { price: 1 } }
    ]);
    return products;
  }
  
  async getProductsByQueryStock(dato) {
    const products = await productsModel.aggregate([
      { $match: { stock: dato } },
    ]);

    return products;
  }
}

export default ProductManagerDB;
