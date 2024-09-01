import { ticketModel } from "./models/ticketModel.js";



//Obtengo todos los ticketos en base a la personalización de búsqueda.
const getAll = async (query,options)=>{
    const tickets = await ticketModel.paginate(query,options);
    return tickets;
}



//Obtengo un ticketo en base a su id autogenerado por MongoDB. De no existir devuelve un string de advertencia.
const getById = async (id)=>{
    const ticket = await ticketModel.findById(id);
    return ticket;
}


//Crea un ticketo en base al schema y a la data reicbida desde la url, la cual debe coincidir según las especificaciones de la API.
const create = async (data)=>{
    const newticket = await ticketModel.create(data);
    return newticket;
}



//Actualiza el prdoucto, debe encontrarlo primero, lo resuelve el método de Mongoose, devuelvo la actualización.
const update = async (id,data)=>{
    await ticketModel.findByIdAndUpdate(id,data); //Este mètodo no devuelve automàticamente el ticketo actualizado, te da el viejo, por eso debemos buscar por id luego del update.
    const updatedticket = await ticketModel.findById(id);
    return updatedticket;
}



export default {getAll,
    getById,
    create,
    update
};