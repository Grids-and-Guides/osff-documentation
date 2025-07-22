---
sidebar_position: 1
title: Overview
---
# Overview

Dual Serve is a minimalistic, developer-friendly TypeScript framework designed to simplify the creation, testing, and deployment of AWS Lambda functions.

Key Features

- Local Development & Runtime

Dual Serve includes a built-in run mode, allowing you to test Lambda functions locally without any Docker dependency.
- Multi-Stage Support

Easily manage multiple environments such as local, dev, and production with clear and simple configuration.
- Powered by AWS CDK

Leverages the official AWS Cloud Development Kit (CDK) under the hood, while providing a streamlined and minimal configuration layer on top of it.
- Lightning Fast Build

All Lambda functions are compiled, minified, and bundled into a single file output at build time. This significantly reduces the deployment size—typically just a few hundred KBs—leading to faster cold starts.
- 100% TypeScript Support

From infrastructure to application code, everything is written and managed in TypeScript, enabling better type safety and developer experience.

## Dual Serve vs AWS SAM


| Feature                        | **Dual Serve**                             | **AWS SAM**                                      |
|-------------------------------|---------------------------------------------|--------------------------------------------------|
| **Language Support**          | Full TypeScript (infra + code)              | YAML for infra, runtime support for various langs |
| **Build System**              | Bundled + minified single output            | Docker-based builds for some runtimes            |
| **Docker Dependency**         | Not required                                | Required for local testing/build               |
| **Cold Start Optimization**   | Single small file per function (~KBs)       | Often larger artifacts                         |
| **Infrastructure as Code**    | Simplified CDK abstraction (TS-based)       | SAM template in YAML                             |
| **Local Development**         | Built-in `run` command (no Docker)          | Uses Docker to emulate AWS Lambda                |
| **Multi-Stage Deployment**    | Native support (`local`, `dev`, `prod`)     | Manual or CI/CD-based stage handling             |
| **Learning Curve**            | Easy for TypeScript/Node.js developers      | Requires learning SAM CLI and YAML format        |
| **Deployment Speed**          | Fast (minimal CDK wrapper)                  | Slower due to Docker and large templates       |