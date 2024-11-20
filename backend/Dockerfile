FROM node:18.20.2-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["node", "src/index.js"]
EXPOSE 5000