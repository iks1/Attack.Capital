# Blogging Platform

A full-stack blogging platform built with Node.js, Next.js 14, TypeScript, Prisma, and PostgreSQL, assignment given by `Attack.Capital`.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)

## Features

- User authentication (signup, login, logout)
- Secure session management
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
   docker run POSTGRES_PASSWORD=password -d -p 5432:5432
   # to get the container id run docker ps
   # to get into the container and see relations run the following command otherwise proceed to setting up prisma
   docker exec -it container_id /bin/bash
   psql -U postgres
   ```

3. Setting up prisma

  
