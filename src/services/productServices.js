import productRepository from "../persistence/mongoDB/productRepository.js"; //Importamos req, res, y el dao necesario para resolver. Fijarse que donde importamos Route, no necesitamos exportar req y res.
import dto from "../dto/dto.js";




const getAllProducts = async (query,options)=>{
    return await productRepository.getAll(query,options);
}



//Le agrego un dto para no mostrar tanta información de un producto requerido.    
const getProductById = async (pid)=>{
    const noFilterProduct  =  await productRepository.getById(pid)
    console.log(noFilterProduct)
    return dto.dto(noFilterProduct)};





const createProduct = async (product)=>{
    return await productRepository.create(product)
}




const updateProduct = async (pid,update)=>{
    return productRepository.update(pid,update);
}




const deleteProduct = async (pid)=>{
    return await productRepository.deleteProd(pid)
}


export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}