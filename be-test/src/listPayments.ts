import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { buildResponse } from './lib/apigateway';
import {listPayments, listPaymentsByCurrency} from './lib/payments';

export const handler = async (event:APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if(event.queryStringParameters?.currency){
        const payments = await listPaymentsByCurrency(event.queryStringParameters?.currency);
        const requestId = event.requestContext.requestId;
        return buildResponse(200, {payments, requestId});
    }
    const payments = await listPayments();
    const requestId = event.requestContext.requestId;
    return buildResponse(200, {payments, requestId});
};
