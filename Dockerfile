FROM node:23

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx prisma init

COPY . .

EXPOSE 1488

CMD ["npm", "run", "start"]