import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsSchema = new mongoose.Schema({
title: {
   type: String,
   required: true},
description: {
     type: String,
     required: true,
   },
price: {
     type: Number,
     required: true,
   },
thumbnail: {
     type: String,
     require:true,
     default:" "
 
   },
code: {
     type: String,
     required: true,
     unique: true,
   },
 stock: {
     type: Number,
     required: true,
   },
   category:{
type: String,  
 require:true,
default:" "

   }
 },
);
productsSchema.plugin(mongoosePaginate)

const productsModel= mongoose.model('products',productsSchema);

export default productsModel;