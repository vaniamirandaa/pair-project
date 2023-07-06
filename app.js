const express = require('express');
const session = require('express-session');
const router = require('./routes/index');
const app = express();
const port = 3000;
const easyinvoice = require('easyinvoice');
const bcrypt = require('bcrypt');
const saltRounds = 10
const password = "Admin@123"



app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'rahasia',
  resave: false,
  saveUninitialized: false
}));

app.use(router);


bcrypt
.hash(password, saltRounds)
.then(hash => {
  userHash = hash 
  console.log('Hash ', hash)
  validateUser(hash)
})
.catch(err => console.error(err.message))

function validateUser(hash) {
  bcrypt
  .compare(password, hash)
  .then(res => {
    console.log(res)
  })
  .catch(err => console.error(err.message))        
}

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
