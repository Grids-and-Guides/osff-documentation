---
sidebar_position: 4
---

# Add New Function
This guide walks you through the steps to add a new serverless function to your project. For demonstration, we’ll build a simple `getUser` API.

#### step 1
Create Required Files and Folders

Create the following folder structure inside the `src` directory:

```
├── src
│   └── lambda-handler
        └── http
            └── user    // module name
                ├── get-user.ts     // lambda handler
                └── user.config.ts // Use this file to register all functions
    └── services 
        └── user
            ├── list-user-service.ts // Business logic
            └── user-types.ts   // Type definitions
```

#### step 2
Implement the Service Logic

Create the service file to handle your business logic. In this example, we’re returning a mock list of users:

``` ts
// src/services/user/list-user-service.ts

export function userList(){
    return [
        { name: "user 1", email: "user1@mail.com" },
        { name: "user 2", email: "user2@mail.com" }
    ];
}
```
#### step 3
Create a handler that invokes the service and returns the result:

``` ts
// src/lambda-handler/http/user-get

import { Handler } from 'aws-lambda';
import { userList } from '../../../services/user/list-user-service';


export const handler: Handler = async (event, context) => {
    const list = userList();
    return { statusCode: 200, body: list};
};

```

#### step 4
Define configuration settings like trigger type, runtime, environment variables, and more in user.config.ts:

``` ts
// src/lambda-handler/http/user.config.ts

import { FunctionConfig, Trigger } from 'osff-dsl';
import path from 'path';

const getUserTrigger = new Trigger(
    "http",             // trigger type http ot websocket 
    "getUser",          // api endpoint
    "GET",              // API method
    "application/json", // response content type
    "my-serverless-app-${self.stage}",  // API gateway name
  );
  
export const getUserFunction = new FunctionConfig(
    "getUser-${self.stage}",    // function name
    "lambda.Runtime.NODEJS_22_X",   // runtime
    "index.handler",    // lambda handler
    path.resolve(process.cwd(),"src/lambda-handler/http/getUser/getUser.ts"),   // source file
    path.resolve(process.cwd(), "dist/lambda-handler/http/getUser/getUser.js"), // compile file
    256,    // memory
    10,     // concurrency
    30,     // timeout
    {       // environment variables 
      "MONGODB_URI": "localhost:db",
      "frontendUrl": "${env.frontendUrl}",
      "functionName": "${currentFunction.name}",
      "cors": "${env.cors}"
    },
    [getUserTrigger]    // triggers. you can add multiple triggers like http, S3, Cloud watch event
  );
```

#### step 5
Register the Function in App Configuration

Include the new function in your application stack:

``` ts
// bin/app-config.ts

...
import { getUserFunction } from "../src/lambda-handler/http/user/user.config";

export const appStack = new AppStack(
    ...
    [..., getUserFunction]
  );
```

#### step 6
You can now start the application locally:
```
npm run start --stage local --port 3000
```