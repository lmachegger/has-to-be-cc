## Description

has-to-be-cc is an API with an endpoint for calculating the price to a particular chargin process.  
A generated API Documentation using Swagger is accessible at `localhost:3000/swagger`.

## Docker

```bash
# For running the latest docker image use
# Use port forwarding (-p flag) to expose port 3000 from the container
$ docker run -p <my-port>:3000 docker.io/m4chei/has-to-be-cc:latest
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```



## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
