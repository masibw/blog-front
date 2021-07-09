FROM node:15

WORKDIR /workdir

COPY package.json .
COPY package-lock.json .
COPY yarn.lock .

RUN yarn install
