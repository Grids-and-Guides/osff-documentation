---
sidebar_position: 6
---

# Add New Function
This guide walks you through the steps to add an authorizer in your serverless function to your project. For demonstration, we’ll build a simple `custom-auth` and attach this into our `getUser` API.

#### step 1
Create Required Files and Folders

Create the following folder structure inside the `src` directory:

```
├── src
│   └── lambda-handler
        └── http
            └── authorizer.ts
```

#### step 2
Implement the Authorizer logic in `authorizer.ts`

Following a custom authorizer is doing simple API key validation. but you can modifiy the logic as per your requiremnt.

``` ts
// src/lambda-handler/http/authorizer.ts

import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent, AuthResponse, PolicyDocument } from 'aws-lambda';

// generatePolicy creates a policy document to allow this user on this API:
function generatePolicy (effect: string, resource: string): PolicyDocument {
  const policyDocument = {} as PolicyDocument
  if (effect && resource) {
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    const statementOne: any = {}
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
  }
  return policyDocument
}

export const handler = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
    // Extract the bearer authorization token from the event
    const authHeader = event.authorizationToken;
    if(!authHeader){
        throw new Error('authorization token not found');
    }
    const token = authHeader.split(' ')[1]!;

    try {
        if(token !== '1234'){
            throw new Error("Invaild Token")
        }
    } catch (err) {
        console.error('Error verifying token', err);
        // Return an authorization response indicating the request is not authorized
        const policyDoc = generatePolicy('Deny', '*')
        return {
            principalId: 'user',   // decoded.sub
            policyDocument: policyDoc
        } as AuthResponse;
    }

    // return an authorization response indicating the request is authorized
    const policyDoc = generatePolicy('Allow', '*')
        return {
            principalId: 'user',   // decoded.sub
            policyDocument: policyDoc
        } as AuthResponse;
};
```
#### step 3
Register the Authorizer function in `app-config.ts` file

``` ts
// bin/app-config.ts

const authFunction = new FunctionConfig(
    "auth-${self.stage}",
    "lambda.Runtime.NODEJS_22_X",
    "index.handler",
    path.resolve(process.cwd(),"src/lambda-handler/http/authorizer.ts"),
    path.resolve(process.cwd(), "dist/lambda-handler/http/authorizer/index.js"),
    256,
    10,
    30,
    {
      "MONGODB_URI": "localhost:db",
      "frontendUrl": "${env.frontendUrl}",
      "functionName": "${currentFunction.name}",
      "cors": "${env.cors}"
    }
  );

export const appStack = new AppStack(
    ...
}

```

#### step 4
Now we can Attach wherever we want to add the authentication  

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
    "none"
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
You can now start the application locally:
```
npm run start --stage local --port 3000
```