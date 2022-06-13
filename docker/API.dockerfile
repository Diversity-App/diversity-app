FROM node:lts-alpine as base

RUN apk add --update --no-cache python3 make g++ openssl libc6-compat openssl-dev

WORKDIR /app

COPY package*.json .
COPY apps/api/package.json apps/api/package.json

RUN npm install -w apps/api

FROM base as build

WORKDIR /app

COPY apps/api ./apps/api/
COPY shared shared

RUN npm run build --workspace apps/api


FROM base as run

WORKDIR /app

COPY --from=build /app/dist .
#COPY --from=build /app/package*.json .
#COPY --from=build /app/.env .

COPY ./apps/api/prisma ./apps/api/prisma

COPY apps/api/package*.json apps/api/
COPY shared shared

RUN npm install --workspace apps/api

RUN npx prisma generate --schema=./apps/api/prisma/schema.prisma

CMD ["node", "apps/api/index.js"]
