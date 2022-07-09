require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    const { DB_USERNAME, DB_PASSWORD } = process.env;
    const dbUrl = process.env.DB_URL.replace('username', DB_USERNAME).replace(
      'password',
      DB_PASSWORD
    );
    await mongoose.connect(dbUrl);

    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (error) {
    console.log(error.message);
  }
};

start();
