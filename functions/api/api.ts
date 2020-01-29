// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
import * as serverless from 'serverless-http';
import { ApiServer } from './server';

const apiServer = new ApiServer();

export const handler = serverless(apiServer.expressApp);
