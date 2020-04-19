FROM node:10-slim

WORKDIR /super-dashboard
COPY . /super-dashboard
COPY package.json /super-dashboard/package.json

ENV NODE_ENV development
COPY .env /super-dashboard/.env

RUN npm install
RUN npm run prebuild
RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "start:prod" ]
