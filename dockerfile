# Etapa de construção
FROM node:18-alpine AS builder

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o arquivo package.json e o package-lock.json para instalar as dependências
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todo o código fonte para o diretório de trabalho
COPY . .

# Rodar o build da aplicação
RUN npm run build

# Etapa de produção
FROM nginx:alpine

# Copiar os arquivos de build da etapa anterior para o diretório público do NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor a porta 80 para o tráfego HTTP
EXPOSE 80

# Comando para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]
