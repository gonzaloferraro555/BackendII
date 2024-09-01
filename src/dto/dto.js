





//Filtro para mostrar sólo algunas características de producto. Se una en productServices.
const dto = (product)=>{
    return {
        title:product.title,
        description:product.description,
        stock:product.stock,
        price:product.price
    }
}

//Filtra la información sensible que no debería mostrarse. Se usa en sessionControllers.
const dtoUser = (user)=>{
    return{
        first_name:user.first_name,
        last_name:user.last_name,
        email:user.email,
        cart:user.cart
    }
}



export default {
    dto,
    dtoUser
}