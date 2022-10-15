require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('express-async-errors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const moment = require('moment');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { EventEmitter } = require('events');

const authRouter = require('./modules/auth/auth.router');
const shopRouter = require('./modules/shop_account/shop_account.router');
const productRouter = require('./modules/product/product.router');
const commentRouter = require('./modules/comment/comment.router');
const handleError = require('./common/handleError');
const cartRouter = require('./modules/cart/cart.router');
const conversationRouter = require('./modules/conversation/conversation.router');
const messagenRouter = require('./modules/messages/message.router');
const socketServer = require('./socket/socket');

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});

const eventIo = new EventEmitter();

io.on('connection', (socket) => {
  socketServer(socket, eventIo);
  console.log(`connected is ${socket.id}`);
});

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  req.eventIo = eventIo;
  next();
});

const myLogger = (req, res, next) => {
  console.log(`using API ${req.url} in ${moment().format('DD-MM-YYYY, h:mm:ss a')}`);
  next();
};
// app.use(myLogger);

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  servers: [
    {
      url: 'http://localhost:8080'
    },
  ],
  apis: ['./modules/auth/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api/auth', authRouter);
app.use('/api/shop', shopRouter);
app.use('/api/product', productRouter);
app.use('/api/comment', commentRouter);
app.use('/api/cart', cartRouter);
app.use('/api/conversations', conversationRouter);
app.use('/api/message', messagenRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(handleError);

httpServer.listen(process.env.PORT, () => {
  console.log(`server connected in port ${process.env.PORT}`);
});
