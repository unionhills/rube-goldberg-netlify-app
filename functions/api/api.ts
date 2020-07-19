// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
//import * as serverless from 'serverless-http';

import serverless from 'serverless-http';
import dotenv from 'dotenv';
import { ApiServer } from './server';
import { MongooseConnector } from './mongoose.connector';

dotenv.config();

MongooseConnector.connect();
const apiServer = new ApiServer();

export const handler = serverless(apiServer.expressApp);
