#Dockerfile
FROM node:lts-alpine

# create a worker folder
WORKDIR /usr/src/project

# install app dependencies
COPY package*.json ./

# building clean install code for production
RUN npm install -g pnpm && pnpm install

# Bundle app source
COPY . .

# start the app with secure shell cmd
ENTRYPOINT ["pnpm", "start"]