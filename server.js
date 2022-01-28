const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const groupRouter = require('./routes/group');
const expenseRouter = require('./routes/expense');

// connect to DB
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@kharcha-paani-db.73dmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(err.message);
});

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Listen
app.listen(port, () => console.log(`Listening on Port ${port}`));

app.use('/api/group', groupRouter);
app.use('/api/expense', expenseRouter);

// Get Route
app.get('/api', (req, res) => {
  res.send('Server connected to client');
});
