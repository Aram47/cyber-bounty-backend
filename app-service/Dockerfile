FROM node:23

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx prisma init

COPY . .

EXPOSE 1488

CMD ["sh", "-c", "npx prisma migrate dev && npm run start"]