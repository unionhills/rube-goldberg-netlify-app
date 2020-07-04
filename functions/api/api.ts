// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
//import * as serverless from 'serverless-http';

import serverless from 'serverless-http';
import { ApiServer } from './server';
require('dotenv').config();

console.log(`DB_HOST=${process.env.DB_HOST}`);
console.log(`DB_NAME=${process.env.DB_NAME}`);
console.log(`DB_USER=${process.env.DB_USER}`);
console.log(`DB_PASS=${process.env.DB_PASS}`);

const apiServer = new ApiServer();

export const handler = serverless(apiServer.expressApp);
