import supabase from "../config/db.js";
export const createVechicle = async (req, re) => {
  const { name, registration_number, allowed_passengers, rate_per_km } =
    req.body;
  try {
    const result = await supabase
      .from("vehicle")
      .insert(
        "name",
        "registration_nunamember",
        "allowed_paasengers",
        "rate_per_km",
        "owner_id",
      )
      .select()
      .single();
    result.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getVehicles = async (req, res) => {
  const result = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single();
  res.json(result);
};
