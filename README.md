## supabase

Create project in supabase

## CHECK CONNECTION

## OPEN PROJECT: 

## prisma 1:

npx prisma migrate dev --name init

( if stuck,  create them manually in sql editor in supabase:)

CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE "Session" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sessionToken VARCHAR(255) UNIQUE NOT NULL,
    userId INT NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(userId) 
        REFERENCES "User"(id)
);



## prisma 2:

npx prisma generate



