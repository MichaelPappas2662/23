import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { buildResponse, parseInput } from './lib/apigateway';
import { createPayment, Payment } from './lib/payments';

export const handler = async (event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const payment = parseInput(event.body || '{}') as Payment
    await createPayment(payment)
    if (!payment.id || !payment.amount || !payment.currency) {
        return buildResponse(422, {message: 'Invalid payment'})
    }
    return buildResponse(201, {result:payment.id});
};

