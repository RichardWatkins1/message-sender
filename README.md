### Message Sender

Send a post request to `https://awvmj0z5d9.execute-api.eu-west-1.amazonaws.com/production/sns` with the body;

```json
{
  "phone_number": "+447123456789", 
  "message": "hello"
}
```

`phone_number` must be in E.164 format (+44 for UK)

## Running Specs

```
yarn build
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

