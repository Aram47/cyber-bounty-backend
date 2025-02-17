FROM node:23

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 6969

CMD ["sh", "-c", "npm run start"]