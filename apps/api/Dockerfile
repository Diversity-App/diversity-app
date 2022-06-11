FROM node:16-alpine

COPY . .

WORKDIR /app

RUN npm install

CMD ["node", "../../dist/apps/api/app.js"]
