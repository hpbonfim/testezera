
FROM node:lts-alpine

WORKDIR /usr/src/project

COPY package*.json ./

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm db:migrate && pnpm db:seed

EXPOSE 3000

ENTRYPOINT ["pnpm", "dev"]