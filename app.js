const express = require('express');
const session = require('express-session');
const router = require('./routes/indexx');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'rahasia',
  resave: false,
  saveUninitialized: false
}));

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
