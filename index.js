require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('express-async-errors');
const authRouter = require('./modules/auth/auth.router');
const shopRouter = require('./modules/shop_account/shop_account.router');
const productRouter = require('./modules/product/product.router');
const commentRouter = require('./modules/comment/comment.router');
const handleError = require('./common/handleError');
const cartRouter = require('./modules/cart/cart.router');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/shop', shopRouter);
app.use('/api/product', productRouter);
app.use('/api/comment', commentRouter);
app.use('/api/cart', cartRouter);

app.use(handleError);

// test cicd heroku
// helo heroku
// helo heroku
// helo heroku

app.listen(process.env.PORT, () => {
  console.log(`server connected in port ${process.env.PORT}`);
});
