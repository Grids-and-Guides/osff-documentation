---
sidebar_position: 4
---

# Deployment
To deploy your application, ensure that the **AWS CDK** and **AWS CLI** are properly configured in your environment.

#### step 1
Build the Project

Compile your TypeScript code into JavaScript:

```
npm run build
```

#### step 2
Synthesize the CDK Stack

Generate the CloudFormation template using the AWS CDK:

```
cdk synth
```
#### step 3
Deploy to AWS

Deploy the synthesized stack to your AWS environment:

```
cdk deploy
```

> Make sure your AWS credentials and default region are set before running the above commands.