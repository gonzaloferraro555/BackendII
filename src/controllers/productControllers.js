import {request,response} from "express";
import productServices from "../services/productServices.js"; 



/*Todos los archivos que usen request y response, necesitan de la importación de express, así mismo, debo darles a req y res lo valores
de estos objetos importados, para que sean reconocidos. Ordenando las capas sólo tendré que hacerlo en la capa de Controllers, y en los
middlewares. */




const getAllProducts = async (req=request,res=response)=>{
    try{
        const {limit,page,sort,category,status} = req.query;
        /*El limit no limita la cantidad general, sino la cantidad
        a mostrar por página. De esta manera, la consulta es sobre
        10 elementos por página, y puedo también seleccionar
        que págino deseo ver. Pasar a otra página, será otra búsqueda en la DB,
        pero de esta manera elijo cuantos elementos mirar y ahorro búsquedas que consuman muchos
        recursos innecesariamente. */
        
        //Definimos los datos de la búsqueda requeridos. Esta información alimenta el pedido getAll() especificando la solicitud.
        const options = {
            limit:limit || 10,
            page: page || 1,
            sort:{
                price:sort==="asc" ? 1:-1,
                //defino el campo de ordenamiento y si será asc o desc con un operador ternario.
            },
            learn:true}
        
        //si viene una categoría, buscamos utilizandola como filtro.
        /*La configuración del query es una constante que debemos
        definir para darle forma a las busquedas en gran cantidad de elementos
        en nuestra DB. */
        if (category) {
            const product = await productServices.getAllProducts({category},options)
            return res.status(200).json({status:"Succes",payload:product})}//Muestro filtrando por categoria.
        if (status){
            const product = await productServices.getAllProducts({status},options);
            return res.status(200).json({status:"Succes",payload:product})}
            /*Muestro filtrando por los productos habilitados en status=true, 
            que es su valor por default. Si ya no se vende ese producto, lo dejo inhabilitado
            dándole false al campo, para que no sea suceptible de ser mostrado por el front para la venta.
            Su información no se elimina por completo.*/

        const product = await productServices.getAllProducts({},options);
        return res.status(200).json({status:"Succes",payload:product});
        /*MUestro todos los productos sin filtrado, enviando query vacío, pero respetando las 
        especificaciones de paginación definidas en la constante "options". */
    }

    catch(e){
        res.status(500).json({status:"Error",msj:"Error Interno del servidor."})
        console.log(e.message);}}



/*Petición en postman: MostrarUnProducto */        
const getProductById = async (req=request,res=response)=>{
    try{
        
        const {pid} = req.params; //Desestructuro el objeto que viene como parámetro.
        let producto = await productServices.getProductById(pid);            
        res.status(200).json({state:"success",producto})

    }
    catch(e){
        res.status(500).json({status:"Error",msg:"Error inesperado del servidor."})
        console.log(e);
    }}



/*Agrego un producto para ser posible de comprar. No es lo mismo que habilitarlo en status:true, 
aquí definimos sus características. Petición en postman: CrearProducto*/
const createProduct = async (req=request,res=response)=>{
    try{
        const product  = req.body; //Tomo los valores de los campos definidos en el productSchema desde el front.
        await productServices.createProduct(product)
        res.status(200).json({status:"Success",product})
    }
    catch(e){
        res.status(500).json({status:"success",msj:"Error inesperado en el servidor."})
        console.log(e);
    }}

/*Actualizo producto. Petición en postman: ModificarProducto. */
const updateProduct = async(req=request,res=response)=>{
    try{    
        const {pid} = req.params
        const update = req.body //No desestructuro porque necesito el objeto de actualización entero, para el spread.
        
        let producto = await productServices.updateProduct(pid,update);//El id en Mongo deja de ser un nùmero, es un string autogenerado de clave primaria.
        res.status(200).json({status:"Success",msg:`Modificación realizada con éxito. ${producto}`})

    }
    catch(e){
        res.status(500).json({status:"Error",msg:"Error interno del servidor."})
        console.log(e);
    }}



//Eliminar producto. Petición en postman: EliminarProducto.
const deleteProduct = async (req=request,res=response)=>{
    try{    
        const {pid} = req.params;
        if (productServices.deleteProduct(pid))  return res.status(200).json({status:"success",msg:"Producto eliminado con éxito."})
        /* Si la devolución de la función deleteProd tiene valor, entonces se habrá validado la operación.
        De lo contrario, continúo a advertir de la inexistencia del producto al front. */
        res.status(400).json({status:"Error",msg:"No se ha encontrado el producto que desea eliminar."})}
        
    catch(e){
        res.status(500).json({status:"Error",msg:"Error inesperado del servidor."})
        console.log(e);
    }}


export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}