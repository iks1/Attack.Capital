# Blogging Platform

A full-stack blogging platform built with Node.js, Next.js 14, TypeScript, Prisma, and PostgreSQL, assignment given by `Attack.Capital`.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)

## Features
- server side rendering for home-page
- client side routing 
- User authentication (signup, login, logout) using JWT
- Stored hashed passwords (used `bcrypt`)
- Listing down blogs
- uploading blogs if logged in
- protected routes
- Responsive design

## Tech Stack

- **Backend:** Node.js, Express.js, Prisma, PostgreSQL
- **Frontend:** Next.js 14, TypeScript, styled-components

## Installation

### Prerequisites

- Node.js (v20)
- npm or yarn
- Docker

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/Attack.Capital.git
   cd Attack.Capital/server
   ```

2. Running the postgres database locally using Docker
   
   ```bash 
   docker run -e POSTGRES_PASSWORD=password -d -p 5432:5432
   # to get the container id run docker ps
   # to get into the container and see relations run the following command otherwise proceed to setting up prisma
   docker exec -it container_id /bin/bash
   psql -U postgres
   ```

3. Setting up prisma
   ```bash
   # go to the prisma folder in server directory
   # replate the password with your password of locally hosted database
   # postgresql://postgres:password@localhost:5432/mydb?schema=public 

   # once all perfectly done run the following command to sync the schema with local database 
   npx prisma migrate dev
   # to see the tables and relations on browser run the following command
   npx prisma expo 
   ```

4. Running the backend 
   ```bash 
   # run the following command to run the backend in root server directory 
   npm run start 
   ```

### Frontend Setup

1. Running the frontend
  ```bash
  # go to the client directory of root folder Attack.Capital and run the following commands
  cd client
  npm run dev
  ```

once accurately done, frontend can be found in `localhost:3000` and backend can be found in `localhost:3001`

## Api Documentation

- `POST /api/users/signup ` signs up the users and puts the the information in database
- `POST /api/users/login` creats a token and sends it in the backend 
- `POST /api/poss/api/posts` posts a new post, authenticates by middleware before putting a post
- `GET /api/posts/api/posts` gets a all posts if not logged in but gives specific posts if logged in and returns posts according to filter applied
- `GET /api/posts/api/posts/by-author/?author={author}` gets all the posts by a specific user but did not use it in the frontend 
- `POST /api/users/logout` Initially I was using cookies for authentication and was using for that.

### pages 
- `\` Homepage, lists down all the pages and has option to navigate to login page, signup page and dashboard
- `\login` lets you to log in 
- `\signup` signs up
- `\dashboard` this is a protected page, you can only see it if you are logged in and lets you post new posts 

## Tech Decision 
- I went for `Cookies` for `authentication` and it was working fine when testing with postman, I still have the code commented, but later when I sent an request from nextjs i figured out that nextjs is not sending the cookie by and I tried solving the issue but could not so I went with `localStorage`.

- I went with `postgres + prisma` because I don't have to code sql and I worked with it before so I know what errors I might encounter. 

- I did not use any UI library and went with `styled components` for UI components so UI might be ugly and I did not have much time to fix this. 




  
