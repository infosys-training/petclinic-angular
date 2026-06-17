ARG DOCKER_HUB="docker.io"
ARG NGINX_VERSION="1.25"
ARG NODE_VERSION="20-alpine"

# Stage 1: Build
FROM $DOCKER_HUB/library/node:$NODE_VERSION AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve
FROM $DOCKER_HUB/library/nginx:$NGINX_VERSION AS runtime

# SPA fallback config
RUN printf 'server {\n\
    listen 8080;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    location /petclinic/ {\n\
        alias /usr/share/nginx/html/;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
\n\
    location / {\n\
        return 301 /petclinic/;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/ /usr/share/nginx/html/

RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx && \
    sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

EXPOSE 8080

USER nginx

HEALTHCHECK CMD ["service", "nginx", "status"]
