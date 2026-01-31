import supabase from "../config/db.js";
export const createTrip = async (req, res) => {
  const {
    customer_id,
    vehicle_id,
    start_date,
    end_date,
    location,
    distance_km,
    passengers,
  } = req.body;
  try {
    const vehicle = await supabase
      .from("trip")
      .select(id)
      .eq("id", "isAvaliable", id, true)
      .single();
    const rate = vehicle[0].rate_per_km;
    const tripCost = rate * distance_km;
    const trip = await supabase
      .from("trip")
      .insert(
        customer_id,
        vehicle_id,
        start_date,
        end_date,
        location,
        distance_km,
        passengers,
        tripCost,
      )
      .select(id)
      .single();
    await supabase
      .from("trip")
      .update("isAvailable", isAvailable)
      .select(id)
      .single();
    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
