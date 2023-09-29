FROM node:10-alpine

 
ENV NODE_ENV=development
ENV PORT=5000
ENV MONGO_URI=mongodb+srv://medixbot:medixbot@cluster0.ze0zc.mongodb.net/workshop1
WORKDIR /backend/
COPY package*.json ./
RUN npm install