### Message Sender

Send a post request to `https://awvmj0z5d9.execute-api.eu-west-1.amazonaws.com/production/send-message` with the body and you'll receive a text message;

```json
{
  "phone_number": "+447123456789", 
  "message": "hello"
}
```

`phone_number` must be in E.164 format (+44 for UK)

## Running Specs

```
yarn test
```

## Deploy

```
yarn build
yarn sls deploy
```

## Enhancements

1. Add a E.164 format converter so any phone number can be sent.
2. Add a structured JSON logger e.g Pino.
3. Add a JSON schema to API gateway so invalid requests aren't placed onto SNS.
4. Add CI/CD to build, lint, test and deploy code.
5. Use serverless-domain-manager for custom domain names.
6. Use serverless-jetpack for faster packaging.
7. Add serverless-sqs-alarms-plugin and serverless-plugin-aws-alerts for raising cloudwatch alarms based on function errors or SQS queue lengths.
8. Optimise the cost of the lambda by reducing memory.
9.  Use serverless-bundle to package lambda functions.
