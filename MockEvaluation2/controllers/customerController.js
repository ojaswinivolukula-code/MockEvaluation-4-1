import { supabase } from "../config/supabaseConfig.js";
import { validateCustomer } from "../validations/customerValidations.js";
export const registerCustomer = async (req, res) => {
  const error = validateCustomer(req.body);
  if (error) {
    return res.status(400).json({ error });
  }
  const { full_name, email, phone } = req.body;
  const { data: existing } = await supabase
    .from("customers")
    .select("id")
    .eq("email:", email)
    .single();
  if (existing) {
    return res.status(409).json({ error: "Email is already exists" });
  }
  const { data, error: dbError } = await supabase
    .from("customers")
    .insert([{ full_name, email, phone }])
    .select()
    .single();
  if (dbError) return res.status(400).json({ error: dbError.message });
  res.status(201).json(data);
};
