FROM node:9-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/package.json
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x ./wait-for-it.sh
RUN apk add --update bash && rm -rf /var/cache/apk/*
RUN npm install
EXPOSE 8000