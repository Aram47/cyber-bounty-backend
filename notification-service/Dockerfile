FROM node:23

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

# Install Redis
RUN apt-get update && apt-get install -y redis-server

# Configure Redis (optional, can be changed)
RUN echo "daemonize no" >> /etc/redis/redis.conf

# Expose ports
EXPOSE 6969 6379  

# Start Redis and your application
CMD ["sh", "-c", "redis-server --daemonize no & npm run start"]
