# CORS Configuration
This section explains how to configure CORS (Cross-Origin Resource Sharing) using environment variables only.

Avoid hardcoding CORS values inside functions or configuration files.

```json
{
  "allowOrigins": [],
  "allowMethods": []
}
```

#### Step 1: Define CORS in Environment Files
Add CORS as a JSON string in your `environment` files.
```env
CORS={"allowOrigins":["localhost","example.com"],"allowMethods":["GET","POST","PUT","DELETE","OPTIONS"]}
```

#### Step 2: Pass CORS via Function Config
Always inject CORS from `environment` into the function configuration.
```ts
environmentVariable: {
"cors": "${env.CORS}"
}
```

#### Step 3: Use CORS in Handler
Parse the CORS config from `process.env` and apply it to response headers.
```ts
const cors = JSON.parse(process.env.cors as string);

headers: {
    "Access-Control-Allow-Origin": cors.allowOrigins.join(','),
    "Access-Control-Allow-Methods": cors.allowMethods.join(','),
}
```