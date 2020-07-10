# NestJS Serverless App

This is a proof-of-concept app which utilizes the following projects/technologies.

### Primary Tasks for PoC

- [NestJS](https://github.com/nestjs/nest) - NodeJS Framework.
- [Serverless](https://github.com/serverless/serverless) - Build applications with serverless architectures using AWS Lambda.

### Progress

| Technology    | Sub-task               | Progress    |
| ------------- | ---------------------- | ----------- |
| NestJS        | -                      | In-Progress |
|               | Initial Setup          | Done        |
|               | JWT Auth guard         | Done        |
|               | Env Config service     | Done        |
|               | All exceptions filter  | Done        |
|               | Req/Res interceptor    | Done        |
|               | Logger service         | Done        |
|               | Auto-generated Swagger | In-Progress |
|               | Request ID middleware  | Done        |
| Serverless    | -                      | Done        |
|               | Lambda Handler         | Done        |
|               | Lambda deployment      | Done        |
| CI/CD support | -                      | Done        |
|               | CircleCI               | Done        |
| Database      | -                      | Not Started |
|               | RDS                    | Not Started |
|               | TypeORM                | Not Started |
| Logger        | -                      | Done        |
|               | Winston                | Done        |

### Remaining Tasks for PoC

- `docker-compose` - It would be good to have it for local development.

  - This would be a good alternative since `serverless offline` does not support hot-reload (at least the way it's implemented right now in this repo). This should consider the use of `offline DynamoDB`.

- `Stages` - Configure various deployment stages like `dev`, `stg`, `prd`.
- `TypeORM` - Sample implementation covering TypeORM which uses some database.

## Development Guideline

### Project Layout (Brief Explanation)

```
.
├── .env (Make sure to create this file locally and fill the env vars)
├── src
│   ├── main.ts (This entry point is used for local server)
│   ├── lambda-main.ts (This entry point is used for lambda server)
│   ├── auth (module)
│   │   ├── guards
│   │   └── strategies (Implementation of JWT token check)
│   ├── users (module)
│   │   ├── users.controller.ts (Controllers call their services)
│   │   ├── users.service.ts (Services can call other services and their own repository)
│   │   └── user.repository.ts (Repository should be called only by its parent service)
│   └── shared (module with shared business logic)
├── test (Contains the end-to-end (e2e) tests)
└── serverless.yml (Serverless framework config file for infrastructure deployment)
```

As mentioned briefly in the project layout for `users`, to keep layout clean, we follow this convention:

1. **Controllers**: HTTP routes map to handler functions in controllers.
1. **Services**: Controllers call their service function.  
   A) A `user controller` must call only a `user service`, and not any other service if it can be avoided.  
   B) A `user service` can call other services like `cats service`, etc.  
   C) A `user service` must call only a `user repository`, and not any other repository if it can be avoided. If a `user service` wants to modify data in `cats repository`, it must call corresponding `cats service` function to do it.
1. **Repositories**: Repositories have data layer implementation, ex: `Firestore` in this project. They must be called only by their direct parent service, ex: A `user repository` is called by a `user service`.

## Installation

```bash
$ npm install
```

### Running the Application on Local

Make sure you add the env vars in `.env` file. Just copy the `.env.template` file.

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Demo

- API: http://localhost:3000
- Swagger UI: http://localhost:3000/swagger

## Running the app in serverless offline mode

```bash
$ npm run sls-offline
```

### Deployment

```sh
# deploy to DEV environment
npm run deploy:dev
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
- [Daisuke Hirata](https://github.com/DaisukeHirata)
