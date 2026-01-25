export const validateCustomer=({full_name,email,phone})=>{
    if(!full_name || !email || !phone){
        return "full_name,email,phone is required"
    }
    return null
}