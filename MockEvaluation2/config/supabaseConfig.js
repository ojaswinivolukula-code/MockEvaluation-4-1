import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"
dotenv.config()
const supabase=createClient(process.env.SUPBASE_URL,process.env.SUPBASE_KEY)
export default supabase