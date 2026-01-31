 createVehicle=`create table vehicle(
  id serial primary key,
  name text,
  registration_number text unique,
  allowed_passengers int,
  isAvailable boolean default true,
  driver_id int,
  rate_per_km int,
  owner_id int,
  created_at timestamp default current_timestamp

)`