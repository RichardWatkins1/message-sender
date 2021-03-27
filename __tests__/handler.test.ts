import sendMessage from "../handler"
import AWS from 'aws-sdk'
import mockedAws from 'aws-sdk-mock'
import { SQSEvent } from 'aws-lambda'

mockedAws.mock('SNS', 'publish', 'test success')

const resetAwsMocks = () => {
  mockedAws.remock('Config', 'update', 'test success')
  mockedAws.remock('SNS', 'publish', 'test success')
}

const Records = [
  {
    messageId: '19dd0b57-b21e-4ac1-bd88-01bbb068cb78',
    receiptHandle: 'MessageReceiptHandle',
    body: JSON.stringify({
      message: 'hello',
      phone_number: '07123456789'
    }),
    attributes: {
      ApproximateReceiveCount: '1',
      SentTimestamp: '1523232000000',
      SenderId: '123456789012',
      ApproximateFirstReceiveTimestamp: '1523232000001'
    },
    messageAttributes: {},
    md5OfBody: '{{{md5_of_body}}}',
    eventSource: 'aws:sqs',
    eventSourceARN: 'arn:aws:sqs:eu-west-1:123456789012:MyQueue',
    awsRegion: 'eu-west-1'
  }
]

const buildEvent = (records = Records): SQSEvent => {
  return {
    Records: records
  }
}

describe('sendMessage', () => {
  describe('with a valid payload', () => {
    afterEach(() => {
      resetAwsMocks()
    })

    it("should call SNS and return a successful response", async () => {
      mockedAws.setSDKInstance(AWS)
      mockedAws.mock('Config', 'update', 'test success')
      const snsSpyFn = jest.fn((_obj, func) => func(null, { messageId: '123', ResponseMetadata: { RequestId: '123' } }))
      mockedAws.remock('SNS', 'publish', snsSpyFn)

      const expectedResponseBody = {
        status: 'success',
        snsResponse: {
          messageId: '123',
          ResponseMetadata: {
            RequestId: '123'
          }
        },
      }

      const response = await sendMessage(buildEvent())

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(expectedResponseBody)
      expect(snsSpyFn).toHaveBeenCalledTimes(1)
    })

    it("raises an error when publishing to SNS fails", async () => {
      mockedAws.setSDKInstance(AWS)
      mockedAws.mock('Config', 'update', 'test success')
      const snsSpyFn = jest.fn((_obj, _func) => { throw new Error('Failed to publish to SNS') })
      mockedAws.remock('SNS', 'publish', snsSpyFn)

      await expect(sendMessage(buildEvent())).rejects.toThrowError('Error: Failed to publish to SNS')
    })
  })

  describe('with an invalid batch size', () => {
    it('should raise an error', async () => {
      const mutipleRecords = Records.concat(Records)

      const sqsEvent = buildEvent(mutipleRecords)

      await expect(sendMessage(sqsEvent)).rejects.toThrowError('lambda has been configured for a single batch size, received 2')
    })
  })
})
