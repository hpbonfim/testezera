#Dockerfile
FROM node:lts-alpine AS builder
WORKDIR /usr/src/project
COPY package*.json ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm next build && pnpm next export

### BUILD TESTEZERA IMAGE ###
FROM alpine:latest
# Add nginx
RUN apk add --update nginx
# Create the directories workflow
RUN mkdir -p /var/log/nginx
RUN mkdir -p /var/www/html
# Copy the nginx configuration files
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# For SSL Encryption
#COPY nginx/server.crt /etc/nginx/ssl/server.crt
#COPY nginx/server.key /etc/nginx/ssl/server.key
# Copy our build source code into the container
COPY --from=builder ./usr/src/project/out ./www
# copy the built app to our served directory
RUN cp -r www/* /var/www/html && rm -rf ./www
# make all files belongs to the nginx user
RUN chown nginx:nginx /var/www/html
# start nginx
CMD ["nginx", "-g", "daemon off;"]