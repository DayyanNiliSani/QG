from node:alpine

EXPOSE 8080
WORKDIR /app

copy package.json .
run npm install 

copy . .