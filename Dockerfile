FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Este comando garante que o TypeScript compila o código
RUN npm run build  

# Executar migrations
RUN npm run migrate

CMD ["npm", "run", "start"]
