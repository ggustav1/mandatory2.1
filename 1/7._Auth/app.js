const express = require('express');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const session = require('express-session');
// Setting up session
app.use(session({
    secret: require('./config/mysqlCredentials.js').sessionSecret,
    resave: false,
    saveUninitialized: true
}));

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 8 // limit each IP to 100 requests per windowMs
});
app.use("/login", limiter);
app.use("/signup", limiter);

/* Setup Objection + Knex */
const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js');

const knex = Knex(knexFile.development);
Model.knex(knex);

app.use((req, res, next) => {
    next();
});

/* Add routes */
const authRoute = require('./routes/auth.js');
const usersRoute = require('./routes/users.js');
const mailRoute = require('./routes/mail.js');

app.use(authRoute);
app.use(usersRoute);
app.use(mailRoute);



app.get('/', (req, res) => {
   return res.sendFile(__dirname + '/public/index.html');
});

/* Start server */
const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", PORT);
});
