---
sidebar_position: 4
---

# Add New Function
This guide walks you through the steps to add a new serverless function to your project. For demonstration, we’ll build a simple `getUser` API.

### Manual Addition

#### step 1
Create Required Files and Folders

Create the following folder structure inside the `src` directory:

```
├── src
│   └── apis
        └── user    // module name
            ├── get-user.ts     // lambda handler
            └── user.config.ts // Use this file to register all functions
    └── services 
        └── user
            └── list-user-service.ts // Business logic with types
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
// src/apis/user/get-user

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
// src/apis/user/user.config.ts

import { FunctionConfig, Trigger } from 'osff-dsl';
import path from 'path';

const getUserTrigger = new Trigger(
    type: "http",             // trigger type http ot websocket 
    endpoint: "getUser",          // api endpoint
    method: "GET",              // API method
    responseType: "application/json", // response content type
    apiGatewayName: "my-serverless-app-${self.stage}",  // API gateway name
    authorizer: "none"
  );
  
export const getUserFunction = new FunctionConfig(
    name: "getUser-${self.stage}",    // function name
    runtime: "lambda.Runtime.NODEJS_22_X",   // runtime
    handler: "index.handler",    // lambda handler
    srcFile: path.resolve(process.cwd(),"src/apis/user/getUser.ts"),   // source file
    output: path.resolve(process.cwd(), "dist/apis/user/getUser.js"), // compile file
    memory: 256,    // memory
    concurrency: 10,     // concurrency
    timeout: 30,     // timeout
    environmentVariable: {       // environment variables 
      "MONGODB_URI": "localhost:db",
      "frontendUrl": "${env.frontendUrl}",
      "functionName": "${currentFunction.name}",
      "cors": "${env.cors}"
    },
    triggers: [getUserTrigger]    // triggers. you can add multiple triggers like http, S3, Cloud watch event
  );
```

#### step 5
Register the Function in App Configuration

Include the new function in your application stack:

``` ts
// bin/app-config.ts

...
import { getUserFunction } from "../src/apis/user/user.config";

export const appStack = new AppStack(
    ...
    functions: [..., getUserFunction]
  );
```

#### step 6
You can now start the application locally:
```
npm run start --stage local --port 3000
```

### Using plop
You can also add a new function using Plop, which generates the same structure automatically.

#### Step 1: Run Plop
```
npx plop
```

#### Step 2: Provide Inputs
```
? Function name (ex: course): user
? Trigger type (HTTP | WebSocket): HTTP
? API endpoint (ex: course): user
? HTTP Method (GET | POST | PUT | DELETE): GET
```

#### Step 3: Generated Structure
```
├── src
│   └── apis
│       └── user
│           ├── user.ts
│           └── user.config.ts
```

In addition, Plop will **automatically register the function** by updating:

`bin/app-config.ts`
This includes:
- Importing the generated function
- Adding it to the `functions` array

> No manual registration is required when using Plop.

#### Step 4: Run the Application
You can now start the application locally:
```
npm run start --stage local --port 3000
```