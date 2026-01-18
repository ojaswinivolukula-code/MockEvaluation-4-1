import express from "express"
import {readFileSync} from "node:fs"
const app=express()
const _route=express.Router()
const DB_PATH="./src/index.js"

_route.get("/allorders",(req,res)=>{
    const data=JSON.parse(readFileSync(DB_PATH,"utf-8"))
    const orders=[]
    data.orders.forEach((o)=>orders.push(o))
    res.json({count:orders.length,orders})
})