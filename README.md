# NestJS Serverless App

This is a proof-of-concept app which utilizes the following projects/technologies.

### Primary Tasks for PoC

- [NestJS](https://github.com/nestjs/nest) - NodeJS Framework.
- [Serverless](https://github.com/serverless/serverless) - Build applications with serverless architectures using AWS Lambda.
    - [Provisioned Lambda](https://aws.amazon.com/about-aws/whats-new/2019/12/aws-lambda-announces-provisioned-concurrency/) - We would like to use provisioned lambda this time.
- [DynamoDB](https://aws.amazon.com/dynamodb/) - Fast and flexible NoSQL database service for any scale.
    - Possible use of [DynamoDB DataMapper](https://github.com/awslabs/dynamodb-data-mapper-js)
- ~~[AWS Cognito](https://aws.amazon.com/cognito/) - User management?~~
    - Currently considering `passwordless authentication` via SMS (`Twilio`).

### Progress

| Technology | Sub-task | Progress |
| ------------- | ------------- | - |
| NestJS | - | In-Progress  |
|  | Initial Setup | Done  |
|  | Lambda Handler | Done  |
|  | Auth JWT Generator | Done  |
|  | SMS Integration | In-Progress  |
| Serverless | - | Done  |
|  | Lambda deployment | Done  |
|  | Provisioned Lambda | Done  |
| DynamoDB  | - | Not Started  |
| ~~AWS Cognito?~~  | - | Not Started?  |
| CI/CD support | - | Done |
|  | CircleCI | Done |

### Secondary Tasks for PoC
- `docker-compose` - It would be good to have it for local development.
    - This would be a good alternative since `serverless offline` does not support hot-reload (at least the way it's implemented right now in this repo). This should consider the use of `offline DynamoDB`.
- `DynamoDB` - Add support in `serverless` YAML file.
- `Swagger/openapi` - Investigate how to auto-generate it with decorators, etc. (We should not think about maintaining it manually).
- `Stages` - Configure various deployment stages like `dev`, `stg`, `prd`.
- `APIGateway` - Configure domain routing, etc. via `serverless` resources (we do not need `terraform` if we can do all config via `serverless` YAML.)
- `DynamoDB trigger -> GCP BigQuery (or AWS redshift) for Data Analysis`
- ~~`SMS auth (encrypt phone number if possible)` - Please investigate only the encryption part, auth will be taken care of by Primary Tasks.~~

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
