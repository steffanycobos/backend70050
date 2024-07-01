import fs from "fs";
import { v4 as uuidv4 } from 'uuid';


class ProductManager {
  #path;
  constructor(path) {
    this.#path = 'src/dao/files/products.json';
  }

  
  async getProducts() {
    //Obtener productos
    try {
      const products = await fs.promises.readFile(this.#path,'utf-8');
      return JSON.parse(products);
    } catch (e) {
      return [];
    }
  
  }
  
  async addProducts(title, description, price, code, stock,category) {
    //Agregar producto sin repetir el code
    const prod = await this.getProducts();
    const newProduct = {
      id:uuidv4().slice(30),
      title:title,
      description:description,
      price:price,
      code:code,
      stock:stock,
      category:category,
      
    };
    let cd = prod.find((x) => x.code ===code);
console.log(cd)
 
   if (cd=== undefined) { 
      await  fs.promises.writeFile(this.#path, JSON.stringify([...prod, newProduct]))
      console.log("Producto agregado!")
      return   ([...prod, newProduct]) 
    } 
   
  }
  async getProductById(id) {
    // Producto por ID
    const prod = await this.getProducts()
    let element = prod.find((x) => x.id === id);
    if (element) {
  
      return element;
    } else {
       throw new Error(` No se encuentra ningún objeto con id: ${id}`);;
    }
  }

  async updateProduct(id, title, description, price, code, stock,category) {
    // Actualiza producto
    let actual = [];
    const prod = await this.getProducts();
    actual = prod.find((x) => x.id === id);
    console.log(actual)
    
if(!actual){
  throw new Error(`El id: ${id} no existe.`)
} else{
  actual.title=title
  actual.description=description
  actual.price=price
  actual.code=code
  actual.stock=stock
  actual.category=category
}
   
    fs.promises.writeFile(
      this.#path,
      JSON.stringify(prod)
      );
      return (prod)
  }

  async deleteProduct(id) {
    // Elimina producto por ID
    const prod = await this.getProducts();
    let checkId = prod.find((x) => x.id === id);
    if (checkId) {
      let rest = prod.filter((x) => x.id !== id);
      fs.promises.writeFile(this.#path, JSON.stringify(rest));
      return JSON.stringify(rest)
    } else {
      throw new Error(` No se encuentra ningún objeto con id: ${id}`);
    }
  }
}


export default ProductManager;





