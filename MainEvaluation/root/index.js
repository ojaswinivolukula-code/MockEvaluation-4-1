import express from "express"
//import { logger } from "./middlewares/logger.middleware.js"
import { rateLimiter } from "./middlewares/ratelimit.middleware.js"
import { notFound } from "./middlewares/notFound.middleware.js"
const app=express()
const PORT=3000
app.use(express.json())
//app.use(logger)
app.use(rateLimiter)
app.use(notFound)
app.listen(PORT,()=>{
    console.log("Serve running on port",PORT)
})