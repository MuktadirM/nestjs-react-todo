FROM node:alpine as development
LABEL maintainer="muktadir.789@gmail.com" environment="development" 

WORKDIR /usr/src/app
RUN npm install -g nodemon
RUN npm install react-scripts@3.4.3 -g
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE ${FRONTEND_PORT}

CMD ["/bin/sh", "./docker/frontend_watcher.sh"]