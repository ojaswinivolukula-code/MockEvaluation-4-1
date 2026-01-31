export const createTable=`create table users(
  id serial primary key,
  name text,
  email text unique,
  password text ,
  role text check(role in('customer','owner','driver')),
  created_at timestamp default current_timestamp
)`