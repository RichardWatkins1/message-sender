'use strict';
import { SQSEvent } from 'aws-lambda'
import AWS from 'aws-sdk'

AWS.config.update({ region: 'eu-west-1' })

const BATCH_SIZE = 1

const sendMessage = async (event: SQSEvent) => {
  if (event.Records.length != BATCH_SIZE) {
    console.log('invalid event', event)
    throw new Error(`lambda has been configured for a single batch size, received ${event.Records.length}`)
  }

  const { messageId, body } = event.Records[0]
  console.log("received messageId:", messageId)

  const MessageBody = JSON.parse(body)
  console.log("MessageBody", MessageBody)

  const params = {
    Message: MessageBody.message,
    PhoneNumber: MessageBody.phone_number
  };

  try {
    const response = await new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise()
    console.log({ response })

    return {
      statusCode: 200,
      body: {
        status: 'success',
        snsResponse: response,
      },
    }

  } catch (error) {
    const errorMsg = `Error when trying to publish to SNS for ${messageId}`
    console.log(errorMsg, error)
    throw new Error(error)
  }
}

export default sendMessage

