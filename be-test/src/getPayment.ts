import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getPayment } from './lib/payments';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const paymentId = event.pathParameters?.paymentId;
    if (!paymentId) {
        return {
        statusCode: 400,
        body: 'Missing paymentId',
        };
    }

    const payment = await getPayment(paymentId);
    if (!payment) {
        return {
        statusCode: 404,
        body: 'Payment not found',
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(payment),
    };
}