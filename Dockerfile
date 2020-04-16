FROM node:10.11.0-alpine

WORKDIR /messfar-line-service

COPY . /messfar-line-service

RUN npm install

ENTRYPOINT ["npm", "start"]