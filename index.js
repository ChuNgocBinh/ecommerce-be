require('dotenv').config();
const express = require('express');
require('express-async-errors');
const authRouter = require('./auth/auth.router');
const handleError = require('./common/handleError');

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

app.use(handleError);

app.listen(process.env.PORT, () => {
  console.log(`server connected in port ${process.env.PORT}`);
});
