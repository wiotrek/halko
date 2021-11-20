# Stage 1
FROM node:14.18.1 as build-step

WORKDIR /app

COPY package.json /app

RUN npm install

COPY ./ /app/

ARG configuration=production

RUN npm run build -- --output-path=./dist/out --configuration $configuration

# Stage 2

FROM nginx:alpine

COPY --from=build-step /app/dist/out/ /usr/share/nginx/html

EXPOSE 80