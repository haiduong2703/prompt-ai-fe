## Build stage ##
FROM node:18.18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

## Run stage ##
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
