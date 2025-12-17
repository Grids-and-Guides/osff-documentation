---
sidebar_position: 3
---

# Folder Structure 

```
├── bin
│   ├── app-config.ts   // All functions and resource configuration
│   └── lambda-cdk.ts
├── dist                // build output
├── environment
│   ├── .dev.env
│   └── .local.env
├── node_modules
├── src
│   └── apis
        └── hello
            ├── get-hello.ts
            ├── get-hello.dto.ts // Define and validate API request data using Zod schemas.
            └── hello.config.ts // Use this file to register all functions of the module.

│   ├── schema      // Use this folder to define database schemas and collection models.
│   ├── services
│   ├── shared
│   └── config.ts
├── .gitignore
├── builder.ts
├── cdk.json
├── package-lock.json
├── package.json
├── server.ts
└── tsconfig.json
```
#### Note:
- Do not create functions in `index.ts`.
- Use `Zod schemas` for request validation.