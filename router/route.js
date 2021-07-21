const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Register = require('../models/registers');
const Cregister = require('../models/cregisters');
const Product = require('../models/products');
router.use(cors());
const authenticate = require('../middle/auth');
const authenticatec = require('../middle/cauth');
router.use(cookieParser());

router.post('/Osignup', async (req, res) => {
    try {
        const owner = new Register(req.body);
        const createowner = await owner.save();
        res.status(201).send(createowner);
    }catch(e) {
        res.status(400).send(e);
    }
});

router.get('/Odata', async (req, res) => {

   try {
        const Odata = await Register.find();
        res.status(201).send(Odata);
   }catch(e) {
        res.status(400).send(e);
   }

});

router.post('/login', async (req, res) => {
    try{
		
		const {email, password} = req.body;

        const username = await Register.findOne({email:email});
		
        const isMatch = await bcrypt.compare(password, username.password);
		
		 const token = await username.generateAuthToken();
		 
		 res.cookie('jwtoken', token, {
             expires: new Date(Date.now() + 25892000000),
             maxAge: 900000,
			 httpOnly:true
		 });

            if(isMatch){
                res.status(201).send('valid credentails');
            }else{
                res.send('invalid credentials');
            }
    }catch(err){
        res.status(400).send('invalid');
    }
});

router.post('/product', authenticate,async(req,res) => {
    try {
        if(!req.rootUser) {
            res.status(400).send('Please Login')
        }else {
            const prod = new Product(req.body);
            const resprod = await prod.save();
            res.status(200).send(resprod);
        }
    } catch(e) {
        res.status(400).send(e);
    }
});

router.get('/product',authenticate, async (req, res) => {
    try {
        if(!req.rootUser) {
            res.status(400).send('Please Login');
        }else {
            const prod = await Product.find();
            res.status(201).send(prod);
        }
    }catch(e) {
        res.status(400).send('Error');
    }
});
 // Cust Register

 router.post('/Csignup', async (req, res) => {
    try {
        const Cust = new Cregister(req.body);
        const createCust = await Cust.save();
        res.status(201).send(createCust);
    }catch(e) {
        res.status(400).send(e);
    }
});

router.get('/Cdata', async (req, res) => {

   try {
        const Cdata = await Cregister.find();
        res.status(201).send(Cdata);
   }catch(e) {
        res.status(400).send(e);
   }

});

router.post('/clogin', async (req, res) => {
    try{
		
		const {email, password} = req.body;

        const username = await Cregister.findOne({email:email});
		
        const isMatch = await bcrypt.compare(password, username.password);
		
		 const token = await username.generateAuthToken();
		 
		 res.cookie('jwtokenc', token, {
             expires: new Date(Date.now() + 25892000000),
             maxAge: 900000,
			 httpOnly:true
		 });

            if(isMatch){
                res.status(201).send('valid credentails');
            }else{
                res.send('invalid credentials');
            }
    }catch(err){
        res.status(400).send('invalid');
    }
});

router.get('/browse',authenticatec, async (req,res) => {
        try {
            if(!req.rootCust) {
                res.status(400).send('Please Login');
            }else {
                const bprod = await Product.find();
                res.status(200).send(bprod);
            }
        }catch(e) {
            res.status(400).send(e);
        }
});

router.post('/order',authenticatec,async(req,res) => {
    try {
        if(!req.rootCust) {
            res.status(400).send('Please Login');
        }else {
             const {pname} = req.body;
             const orders = await Product.findOne({pname:pname});
            const n = [orders];
            const m = [];
            n.map(val => {
                m.push(val);
            });
            m.push(req.rootCust);
            console.log(m)
              res.status(200).send(m);
        }
    }catch(e) {
        res.status(400).send(e);
    }
});

router.get('/logout', async (req, res) => {
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send('logout successfull');
    console.log('logged out');
});

router.get('/Clogout', async (req, res) => {
    res.clearCookie('jwtokenc', {path:'/'});
    res.status(200).send('logout successfull');
    console.log('logged out');
});

module.exports = router;