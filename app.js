const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');


const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(cookieParser());

require('./db/conn');
const Register = require('./models/registers');
const root = require('./router/route');
app.use(root);

app.listen(port, ()=>{
    console.log(`connected at ${port}`);
});