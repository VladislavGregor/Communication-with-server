import { createServer } from 'http';

import OrdersSocket from './websocket/orders.socket';



require('dotenv').config()
import 'reflect-metadata';

import {
   createExpressServer,
   RoutingControllersOptions
} from 'routing-controllers'

const port = process.env.APP_PORT || 3000;

const routingControllerOptions: RoutingControllersOptions = {
   routePrefix: 'v1',
   controllers: [`${__dirname}/modules/http/*.controller.*`],
   validation: true,
   classTransformer: true,
   cors: true,
   defaultErrorHandler: true
}

const app = createExpressServer(routingControllerOptions);

const httpServer = createServer(app);

const io = Websocket.getInstance(httpServer);

io.initializeHandlers([
   { path: '/orders', handler: new OrdersSocket() }
]);


httpServer.listen(port, () => {
   console.log(`This is working in port ${port}`);
});



import Websocket from './websocket/websocket';