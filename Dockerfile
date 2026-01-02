# Stage 1: Build de l'app React
FROM node:18 AS build

WORKDIR /app

# Déclarer les arguments
ARG REACT_APP_API_KEY

# Les transformer en variables d'env pour le processus de build
ENV REACT_APP_API_KEY=$REACT_APP_API_KEY

COPY package.json package-lock.json ./

RUN npm install

COPY . .

WORKDIR /app

RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

# On supprime la config par défaut
RUN rm /etc/nginx/conf.d/default.conf

# On copie notre config personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80