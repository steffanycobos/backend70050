import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url)

export const __dirname = dirname(__filename)

///// IMAGENES PRODUCTOS
const productStorage= multer.diskStorage({
    destination: function(req,file,cb){
      cb(null,path.join(__dirname,'multer/products'))
    },
    filename: function(req,file,cb){
      cb(null,`productos-${file.originalname}`)
    }
  });
  export const uploaderProducts= multer({storage:productStorage})
  
  
  

  