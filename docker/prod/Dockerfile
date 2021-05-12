# 参考 https://qiita.com/ragnar1904/items/e49aa82756dfbf7cf2f5
FROM node:15.14-alpine AS build


WORKDIR /build

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN NODE_ENV=production yarn build



FROM node:15.14-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /build/package.json /build/yarn.lock ./
RUN yarn add next

COPY --from=build /build/.next ./.next
COPY --from=build /build/next.config.js ./next.config.js
COPY --from=build /build/public ./public


EXPOSE 3000
CMD ["yarn", "start"]