const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

var userReg = require('./routes/registration');

app.use(cors());
app.use(express.json());

const { DB_URI } = process.env;
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
});

mongoose.connection.once('open', () => {
  console.log('Mongodb connecton established successfully');
});

app.use('/users', userReg);

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
