```dockerfile
# Etapa de build: compilează SCSS în CSS
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
# Instalează Sass CLI și compilează SCSS -> dist/css
RUN npm install -g sass \
    && sass scss/:dist/css/ --no-source-map

# Etapa finală: servește site-ul cu NGINX
FROM nginx:alpine
COPY --from=build /app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---