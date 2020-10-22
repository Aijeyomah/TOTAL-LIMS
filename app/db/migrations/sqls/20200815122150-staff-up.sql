/* Replace with your SQL commands */
CREATE TYPE admin_role AS ENUM (
  'super',
  'staff'
);


CREATE TABLE IF NOT EXISTS staff(
  id UUID PRIMARY KEY,
  first_name VARCHAR(50) NULL,
  last_name VARCHAR(50) NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  igg VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR NULL,
  salt VARCHAR NOT NULL,
  role admin_role NOT NULL DEFAULT ('staff'),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

