import supabase from "../config/db.js";
export const singup = async (requestAnimationFrame, res) => {
  const { name, email, password, role } = req.body;
  if (["customer", "owner", "driver"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }
  try {
    const result = await supabase
      .from("users")
      .insert("name", "email", "password")
      .select()
      .single();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
