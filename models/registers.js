const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const eowner = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
	password: {
		type: String,
		required: true
	},
    tokens: [
        {
            token: {
                type: String,
                required: true          
            }
        }
    ]
});


eowner.pre('save', async function(next){
    if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10);
    }
   next();
});

eowner.methods.generateAuthToken = async function () {
    try{
        let token = jwt.sign({_id:this._id}, '43#suijo$#$mkdj6783j7s89nkjs8793hs3#47%Djr5#');
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
        
    }catch(e){
        console.log(e);
    }
}

const Register = new mongoose.model('Register', eowner);

module.exports = Register;