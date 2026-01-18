import express from "express"
import products_route from "./routes/products.routes.js"
import orders_route from "./routes/orders.routes.js"

const app=express()
const PORT=3000
app.use(express.json())
app.use("/products",products_route)
app.use("/orders",orders_route)
app.listen(PORT,()=>{
    console.log("Server is running on port 3000")
})
