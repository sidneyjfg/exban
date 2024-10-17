# Use uma imagem Node.js estável
FROM node:16

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie apenas os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install --only=production

# Copie o restante do código da aplicação
COPY . .

# Compile o TypeScript para JavaScript
RUN npm run build

# Exponha a porta que o aplicativo vai usar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start"]
