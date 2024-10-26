# Use uma imagem Node.js como base
FROM node:16

# Definir o diretório de trabalho no container
WORKDIR /usr/src/app

# Copiar o package.json e o package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Executar o build (compilação do TypeScript para JavaScript no diretório dist)
RUN npm run build

# O comando para iniciar a aplicação
CMD ["npm", "run", "start"]
