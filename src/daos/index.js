import mongoose from "mongoose";
import User from "./Mongo/user.js";
import config from "../config/config.js";
//true --> MongoDB  false --> FileSystem
const PERSISTENCIA = true;
if(PERSISTENCIA){
    mongoose.connect(config.mongo.URL,{serverSelectionTimeoutMS: 5000})
}
const rutaProd = PERSISTENCIA? "./Mongo/productos.js" : "./FileSystem/productos.js";
const { default: Productos} = await import(`${rutaProd}`);
export const productos = new Productos();
const rutaCart = PERSISTENCIA? "./Mongo/carrito.js" : "./FileSystem/carrito.js";
const { default: Carrito} = await import(`${rutaCart}`);
export const carrito = new Carrito();
export const userService = new User();