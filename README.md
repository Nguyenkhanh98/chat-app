# Full Stack Whatsapp using Reactjs, Socket.io, Node.js

Please keep current all settings except DATABASE_URL in server to make sure everything work well.

demo video : https://drive.google.com/file/d/1nm_RdrAwPW-NWWlPrWb8xj-VVVbzx24I/view?usp=sharing

# Enviroments

node v18.17.0

# Stack

    React
    Vite
    Typescript
    Tanstack/react-query
    Expressjs
    Prisma

# Installation

Setup Server

```bash
  cd server
  yarn install
  npx prisma generate
  npx prisma migrate dev --name initial
  npx prisma migrate deploy

```

add environment variables in the server's .env file

```bash
    PORT=3005
    DATABASE_URL=<postgres databse url>
```

In the `DATABASE_URL` you can add any databse url.

Run Server

```bash
  cd server
  yarn start

```

Then server start at localhost:6060

Setup Client

```bash
  cd client
  yarn install
  yarn dev
```

Then open localhost:5173
