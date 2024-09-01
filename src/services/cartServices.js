
import cartRepository from "../persistence/mongoDB/cartRepository.js";
import productRepository from "../persistence/mongoDB/productRepository.js";
 //Importamos cartRepository para usar las funciones de persistencia.
 

 const createCart = async ()=>{
    return await cartRepository.createCart();
 }



const getCartById =async (cid)=>{
    return await cartRepository.getCartById(cid);
}



const addProductToCart = async (cid,pid)=>{
    return await cartRepository.addProductToCart(cid,pid);
}



const removeProductFromCart =async  (cid,pid)=>{
    return await cartRepository.removeProductFromCart(cid,pid);
}


const updateProductFromCart = async (cid,pid,q)=>{
    return await cartRepository.updateProductFromCart(cid,pid,q);
}

const emptyCart = async (cid)=>{
    return await cartRepository.emptyCart(cid);
}

const getAllCarts =async  ()=>{
    return await cartRepository.getAll();
}


//Debo chequear el stock, porque si bien el front muestra el stock al actualizarse la DB, puede ser que otro usuario compre la ùltima unidad mientras yo 
//estoy en la renderizaciòn del carrito, por lo que debe controlarse al momento de comprar, allì resuelvo la actualizaciòn de la DB, y limito para el resto
//la compra de nuevas unidades, independientemente de lo que tarde en actualizarse en el front.
const purchaseCart = async (cid)=>{
    const cart = await cartRepository.getCartById(cid);
    let total = 0; //Irá acumulandola compra.
    const productsUnavailable = [];

    //Suele utilizarse el forEeach, pero no se soportan para funciones asincronas, porque el foreach va màs ràpido que lo que se espera la respuesta. Usamos el for por tener algo asìncrono dentro del ciclo.
    for (const productCart of cart.products){
        const prod = await productRepository.getById(productCart.product); //Le doy el ObjectId de cada producto dentro del arreglo del carrito cart.
        //prod tendrá el producto traído de la DB, para comparar el stock disponible contra el requerido por el carrito.


        if (prod.stock>= productCart.quantity){ //Comparo el stock de la DB primero, con cada producto del carrito en su campo quantity, que es la suma de lo que se desea comprar.
            total += prod.price * productCart.quantity;
            await productRepository.update(prod._id,{stock:prod.stock-productCart.quantity});
        }
        else{
            productsUnavailable.push(productCart); 
            /*Si le mandase prod, le estaría dando una copia del producto en la DB en su info completa, y con stock insuficiente, 
            porque evidentemente llegue al else porque no había suficiente cantidad. 
            Va productCart porque quiero mostrar el producto para el cual no hay stock suficiente, pero sólo el id del producto, y la quantity, que es 
            lo que muestra el carrito, no todos los campos del producto de la DB. El front se encargará de mostrarlo más lindo, usando el ObjectId
            de cada producto para mostrar lo que quiera de estos productos excluídops del ticket.*/
             //Piso el arreglo de productos totales, con el arreglo de productos rechazados, para que el front muestre el carrito sólo con lo que no se pudo avanzar hacia la compra.
        }
    }
    await cartRepository.update(cid,{products:productsUnavailable});

    //Al terminar la compra, si no me da para comprar una cantidad para un determinado producto, o para ninguno, me devolverá por ejemplo un total 0, porque no hay stock, 
    //y quedará en mi carrito pendiente una lista de productos que no tienen stock, queda para el usuario quitarlos del carrito. Nosotros se lo dejamos con esa información
    //para que el usuario vea que productos no pasaron, el cliente debe mostrarlo como stock insuficiente y dar acceso a la ruta para vaciar el carrito, o si el usuario se retira,
    //que el carrito se vacie sólo en aquellos productos sin stock.

    return total; //Le falta un poco para enviar información de los productos que si se compraron, para que el front pase con esa data a un menú de compra.
    }
    



export default {
    getAllCarts,
    getCartById,
    addProductToCart,
    emptyCart,
    updateProductFromCart,
    createCart,
    removeProductFromCart,
    purchaseCart
}