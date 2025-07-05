FROM node:20-alpine

# Create app directory
WORKDIR /app 

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD [ "npm", "run", "build", "&&", "npm", "run", "start" ]