---
sidebar_position: 6
---

# Authorizer
This guide will walk you through the process of integrating a custom authorizer into your serverless function. For demonstration purposes, we’ll create a simple custom-auth authorizer and attach it to the getUser API endpoint.

#### step 1
Create Required Files and Folders

Begin by setting up the necessary folder structure inside your src directory:

```
├── src
│   └── apis
        └── authorizer.ts
```
This structure helps organize your authorizer logic and keep your project maintainable.

#### step 2
Implement the Authorizer Logic in authorizer.ts

Next, implement the logic for your custom authorizer. In this example, the authorizer performs a basic API key validation. However, you can modify this logic to fit your specific authentication requirements.

``` ts
// src/apis/authorizer.ts

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
Register the Authorizer in `app-config.ts`

Finally, register the custom authorizer function within your app-config.ts file. This step makes the authorizer available for use in your API routes.

``` ts
// bin/app-config.ts

const authFunction = new FunctionConfig(
    name: "auth-${self.stage}",
    runtime: "lambda.Runtime.NODEJS_22_X",
    handler: "index.handler",
    srcFile: path.resolve(process.cwd(),"src/apis/authorizer.ts"),
    output: path.resolve(process.cwd(), "dist/apis/authorizer/index.js"),
    memory: 256,
    concurrency: 10,
    timeout: 30,
    environmentVariable: {
      MONGODB_URI: "localhost:db",
      frontendUrl: "${env.frontendUrl}",
      functionName: "${currentFunction.name}",
      cors: "${env.cors}"
    }
  );

export const appStack = new AppStack(
    ...
    authorizer: [new Authorizer({name: "my-auth-func", type: "restApi", authFunction: authFunction})], // here you can register the auth function with any name.
    ...
)

```

#### step 4
Attach the Authorizer to Your API Route

With the custom authorizer in place, you can now attach it to any API route where authentication is required.

``` ts
// src/apis/user/user.config.ts

import { FunctionConfig, Trigger } from 'osff-dsl';
import path from 'path';

const getUserTrigger = new Trigger(
    type: "http",             
    endpoint: "getUser",          
    method: "GET",              
    responseType: "application/json", 
    apiGatewayName: "my-serverless-app-${self.stage}",  
    authorizer: "my-auth-func"  // here you can pass your auth function name
  );
  
export const getUserFunction = new FunctionConfig(
    name: "getUser-${self.stage}",    // function name
    runtime: "lambda.Runtime.NODEJS_22_X",   // runtime
    handler: "index.handler",    // lambda handler
   ...
    triggers: [getUserTrigger]    
  );
```



#### step 5
You can now start the application locally:
```
npm run start --stage local --port 3000
```