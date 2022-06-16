require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./auth/auth.router');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('mongodb connected');

  const app = express();
  app.use(express.json());
  app.use('/api/v1/auth', authRouter);

  app.listen(process.env.PORT, () => {
    console.log(`server connected in port ${process.env.PORT}`);
  });
}

main();
