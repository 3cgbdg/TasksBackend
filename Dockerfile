FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


RUN npx prisma generate
RUN npx ts-node prisma/seed.ts

EXPOSE 5200
CMD ["npm", "run", "start:dev"]

