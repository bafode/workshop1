# Event Management Platform

> events platform built with the MERN stack & Redux.

This is the course project for my-digital-school of Paris 

## Features


- Read csv file
- Create events via Graph api
- Events management

## Usage

### ES Modules in Node

We use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
GRAPH_API_HOST=https://graph.microsoft.com
GRAPH_API_TOKEN=your access token
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
cd backend
npm run dev

# Run backend only
cd backend
npm run server
```




### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
cd backend
npm run data:import

# Destroy data
cd backend
npm run data:destroy
```

```


## License

The MIT License

Copyright (c) 2023 BAFODE CAMARA 