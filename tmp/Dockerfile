FROM node:23

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 6969

CMD ["sh", "-c", "npm run start"]