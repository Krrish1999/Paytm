const mongoose = require('mongoose');
 const {schema} = mongoose

mongoose.connect('mongodb+srv://kunal051999:7hm48acN0gRXEVbR@cluster0.mqvgsqr.mongodb.net/paytm' )

const userSchema =  new mongoose.Schema({
    username:String,
    firstName:String,
    lastName:String,
    password: String
})
const accountSchema =  new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User =  mongoose.model('User',userSchema);

module.exports={
    User,
    Account
}
