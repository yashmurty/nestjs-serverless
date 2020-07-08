# NestJS Serverless App

This is a proof-of-concept app which utilizes the following projects/technologies.

### Primary Tasks for PoC

- [NestJS](https://github.com/nestjs/nest) - NodeJS Framework.
- [Serverless](https://github.com/serverless/serverless) - Build applications with serverless architectures using AWS Lambda.

### Progress

| Technology    | Sub-task          | Progress    |
| ------------- | ----------------- | ----------- |
| NestJS        | -                 | In-Progress |
|               | Initial Setup     | Done        |
|               | Lambda Handler    | Done        |
|               | Auth JWT          | Done        |
| Serverless    | -                 | Done        |
|               | Lambda deployment | Done        |
| CI/CD support | CircleCI          | Done        |
| Database      | -                 | Not Started |
|               | RDS               | Not Started |
|               | TypeORM           | Not Started |
| Logger        | -                 | Done        |
|               | Winston           | Done        |
|               | ResponseTime      | Done        |
| Swagger       | -                 | In-Progress |

### Secondary Tasks for PoC

- `docker-compose` - It would be good to have it for local development.

  - This would be a good alternative since `serverless offline` does not support hot-reload (at least the way it's implemented right now in this repo). This should consider the use of `offline DynamoDB`.

- `Stages` - Configure various deployment stages like `dev`, `stg`, `prd`.
- `APIGateway` - Configure domain routing, etc. via `serverless` resources (we do not need `terraform` if we can do all config via `serverless` YAML.)

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

## Running the app in serverless offline mode

```bash
$ npm run sls-offline
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

## Contributors

- [Yash Murty](https://github.com/yashmurty)
- [Shogo Mitomo](https://github.com/shogo-mitomo)
