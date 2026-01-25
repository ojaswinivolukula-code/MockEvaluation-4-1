export const validateOrder=({product_name,quantity,price,customerId})=>{
    if(!product_name || !quantity || !price || !customerId){
        return "product_name,qunatity,price,customerId is required "
    }
    return null
}