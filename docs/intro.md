---
sidebar_position: 1
---

# OSFF - Open Serverless Function Framework

# Getting Started

Welcome to **OSFF (Open Serverless Function Framework)** – a lightweight, modular framework for building, organizing, and deploying AWS Lambda functions using TypeScript and CDK.

### Prerequisites

- Node.js v20+
- AWS CLI configured
- AWS CDK v2 installed

### Installation
#### step 1
clone the repository and npm install

```bash
git clone <repo-url>
npm install
```
#### step 2
Create "environment" folder. and create folllowing files and add your environment variables
``` js
// environment/.local.env 

cors={allowOrigins: ['localhost'],allowMethods: ['GET','POST', 'PUT','DELETE', 'OPTION']}
env=local
API_KEY=1234
frontendUrl=localfrontend
```
#### step 3
Run the application.
```
npm run start -- --stage local --port 3001
```
#### step 4
You check the application by call the following get method
```
GET localhost:<port>/hello
```