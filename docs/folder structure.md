---
sidebar_position: 2
---

# Folder Structure 
```
.
├── bin
│   ├── app-config.ts   // All functions and resource configuration
│   └── lambda-cdk.ts
├── dist                // build output
├── environment
│   ├── .dev.env
│   └── .local.env
├── node_modules
├── src
│   └── lambda-handler
        └── http       
            ├── get-hello.ts
            └── hello.config.ts // Use this file to register all functions of the module.

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
