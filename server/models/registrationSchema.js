const mongoose = require('mongoose');

const UserRegistration = mongoose.Schema({
  firstName:{
    type: String,
  },
  middleName:{
    type: String,
  },
  lastName:{
    type: String,
  },
  email:{
    type: String,
  },
  sex:{
    type: String,
  },
  telephoneNum:{
    type: String, 
  },
  phoneNumber:{
    type: String, 
  },
  address:{
    type: String,
  },
});

module.exports = mongoose.model('UserRegistration', UserRegistration);
