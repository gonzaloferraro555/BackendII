import ticketRepository from "../persistence/mongoDB/ticketRepository.js";

 
/*Servicio que crea un elemento ticket, usado en la capa de controllers para devolver la informació necesaria. */
const createTicket = async (userEmail,totalCart)=>{
    const newTicket = {
        amount:totalCart,
        purchaser:userEmail,
        code:Math.random().toString(36).substr(2,9) //Número aleatorio sólo de números, convertido a string.
    };

    const ticket = await ticketRepository.create(newTicket);
    return ticket;
};

export default {
    createTicket
}