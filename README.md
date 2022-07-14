# has-to-be-cc

![Tests & Docker](https://github.com/lmachegger/has-to-be-cc/actions/workflows/workflow.yml/badge.svg)

## Description

This project is built using the [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

**has-to-be-cc** is an API with an endpoint for calculating the price to a particular chargin process.  
A generated API Documentation using Swagger is accessible at `/swagger`.  
Endpoint for applying rates to cdr is accessible at `/rate`.

## Docker

```bash
# To run the latest Docker image use:
$ docker run -p <my-port>:3000 docker.io/m4chei/has-to-be-cc:latest

```

After starting the container, open `localhost:<my-port>/swagger` to view the API Documentation

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
