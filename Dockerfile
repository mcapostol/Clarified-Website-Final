# Folosim direct NGINX pentru a servi site-ul static
FROM nginx:alpine

# Setăm directorul de lucru în container
WORKDIR /usr/share/nginx/html

# Copiem tot conținutul proiectului în NGINX html folder
COPY . .

# Expunem portul 80
EXPOSE 80

# Pornim NGINX în prim-plan
CMD ["nginx", "-g", "daemon off;"]