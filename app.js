const express = require('express');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const webPush = require('web-push');
const mongoose = require('mongoose');
const path = require('path');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const app = express();


app.use(passport.initialize());
app.use(passport.session());
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Public
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");

});

app.get("/main", (req, res) => { //links main website with PWA's public folder
  res.render("main.ejs");
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('./routes/index.js'));

app.use('/users', require('./routes/users.js'));



mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected 🎉 '))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));

