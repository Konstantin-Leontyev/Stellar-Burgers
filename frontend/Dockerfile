# build env
FROM node:22.11-alpine3.19 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
