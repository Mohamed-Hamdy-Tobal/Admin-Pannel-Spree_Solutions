# Fetching the latest node image on alpine linux
FROM node:latest

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY package.json ./

# Install dependencies
RUN npm install

# Copying all the files in our project
COPY . .

# Port
EXPOSE 3000

# runs the comand npm start
CMD ["npm", "start"]