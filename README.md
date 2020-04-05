# NestJS Serverless App

This is a proof-of-concept app which utilizes the following projects/technologies.

- [NestJS](https://github.com/nestjs/nest) - NodeJS Framework.
- [Serverless](https://github.com/serverless/serverless) - Build applications with serverless architectures using AWS Lambda.
    - [Provisioned Lambda](https://aws.amazon.com/about-aws/whats-new/2019/12/aws-lambda-announces-provisioned-concurrency/) - We would like to use provisioned lambda this time.
- [DynamoDB](https://aws.amazon.com/dynamodb/) - Fast and flexible NoSQL database service for any scale.
    - Possible use of [DynamoDB DataMapper](https://github.com/awslabs/dynamodb-data-mapper-js)

### Progress

| Technology  | Progress |
| ------------- | ------------- |
| NestJS  | WIP  |
| Serverless  | WIP  |
| DynamoDB  | WIP  |

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

