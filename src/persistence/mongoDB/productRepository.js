import { productModel } from "./models/productModel.js";



//El método de mongoDB findAndUpdate, usa el campo ObjectID para buscar, por lo tanto debo enviarle
//directamente el campo ._id del objeto en cuestión y lo encontrará, ojo porque no es un string.


//Obtengo todos los productos en base a la personalización de búsqueda.
const getAll = async (query,options)=>{
    const products = await productModel.paginate(query,options);
    return products;
}




//Obtengo un producto en base a su id autogenerado por MongoDB. De no existir devuelve un string de advertencia.
const getById = async (id)=>{
    const product = await productModel.findById(id);
    return product;
}


//Crea un producto en base al schema y a la data reicbida desde la url, la cual debe coincidir según las especificaciones de la API.
const create = async (data)=>{
    const newProduct = await productModel.create(data);
    return newProduct;
}



//Actualiza el prdoucto, debe encontrarlo primero, lo resuelve el método de Mongoose, devuelvo la actualización.
const update = async (id,data)=>{
    await productModel.findByIdAndUpdate(id,data); //Este mètodo no devuelve automàticamente el producto actualizado, te da el viejo, por eso debemos buscar por id luego del update.
    const updatedProduct = await productModel.findById(id);
    return updatedProduct;
}



//Elimina el producto según su id. Implica modificar su campo status, no se da definitivamente de baja.
const deleteProd = async (id)=>{
    await productModel.findByIdAndUpdate(id,{status:false});//Porque no elimino realmente, cambio su status.
    const deletedProduct = await productModel.findById(id);
    return deletedProduct;//Lo devuelvo porque al tratar la devolución consulto por si devuelve algo o esta undefined, caso en el cual no habrá sido encontrado.
}



export default {
    getAll,
    getById,
    create,
    update,
    deleteProd};