# Todo Application 
 Backend with nestjs and Frontend with React and PostgresSQL
 
# This Application has been configured for Docker Container

Ensure also that [Docker is installed](https://docs.docker.com/engine/install) on your work station

## Running the app using node server (the normal way) for both frontend and backend

```bash
# Installing node modules
$ npm install

# development
$ npm run start:dev

# Debug/watch
$ npm run start:debug

# production
$ npm run build:prod
$ npm start
```

## Using Docker Compose
```sh
# Build the docker image
$ docker-compose build

# To start the container
$ docker-compose up -d
```
