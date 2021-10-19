# Stage 1
FROM node:14.18.1 as build-step

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

RUN npm run build --prod

# Stage 2

FROM nginx:alpine

COPY --from=build-step /app/dist/* /usr/share/nginx/html

EXPOSE 80