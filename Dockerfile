# Build step 1(installing node modules and preparing compiled build)
FROM node:20-alpine as build
#RUN echo "https://mirror.arvancloud.ir/alpine/v3.19/main" > /etc/apk/repositories
#RUN echo https://mirror.arvancloud.ir/alpine/v3.19/community >> /etc/apk/repositories
RUN apk update && apk upgrade --available
RUN apk add --no-cache bash
RUN apk add g++ make py3-pip gcompat
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY .npmrc ./

RUN --mount=type=cache,target=/usr/local/share/.cache/yarn,sharing=locked yarn install --verbose
COPY . ./

#RUN npm install vite -g
#RUN npm install -D babel-loader @babel/core @babel/preset-env webpack
RUN NODE_OPTIONS="--max-old-space-size=2048" yarn run build

# Build step 2(Deploying build on NGINX)
FROM nginx:1.13 as production
RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 5858
ENTRYPOINT ["nginx", "-g", "daemon off;"]