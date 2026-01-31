createTrip=`
create table trip(
  id serial primary key,
  customer_id int,
  vehicle_id int,
  strat_date date,
  end_date date,
  location text,
  distance_km int,
  passengers int,
  trip_cost int,
  isCompleted boolean default false,
  created_at timestamp default current_timestamp
)`