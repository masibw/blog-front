# 参考 https://qiita.com/ragnar1904/items/e49aa82756dfbf7cf2f5
FROM node:15.6-alpine AS build


WORKDIR /build
COPY . .
RUN yarn install
RUN NODE_ENV=production yarn build


FROM node:15.6-alpine AS production
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /build/package.json /build/yarn.lock ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public

RUN yarn add next

EXPOSE 3000
CMD ["yarn", "start"]