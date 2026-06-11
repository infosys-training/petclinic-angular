FROM node:20-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.25-alpine AS runtime

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx config for SPA with /petclinic base path
RUN echo 'server { \
    listen 8080; \
    root /usr/share/nginx/html; \
    index index.html; \
    location /petclinic/ { \
        alias /usr/share/nginx/html/; \
        try_files $uri $uri/ /index.html; \
    } \
    location / { \
        return 301 /petclinic/; \
    } \
}' > /etc/nginx/conf.d/default.conf

RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx

EXPOSE 8080

USER nginx

HEALTHCHECK CMD ["wget", "-q", "--spider", "http://localhost:8080/petclinic/"]
