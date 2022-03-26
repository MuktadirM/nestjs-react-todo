FROM node:alpine as development
LABEL maintainer="muktadir.789@gmail.com" environment="development" 

WORKDIR /usr/src/app
RUN npm install -g nodemon
COPY ./package*.json ./
RUN npm install 
COPY . .
EXPOSE ${BACKEND_PORT}

CMD ["/bin/sh", "./docker/backend_watcher.sh"]