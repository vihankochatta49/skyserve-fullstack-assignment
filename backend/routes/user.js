
const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    required: true,
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);
      },
      message: "Please Enter a valid email address",
    },
  },

  password: {
    type: String,
    required: true,
  },
 
  dob: {
    type: Date,
    default: Date.now(),
  },

  phone: {
    type: String,
    default: "",
  },

  grade: {
    type: String,
    default: "",
  },

  pool: {
    type: String,
    default: "",
  },

  gender: {
    type: String,
    default: "",
  },

  schoolName: {
    type: String,
    default: "",
  },

  schoolCity: {
    type: String,
    default: "",
  },

  schoolAddress: {
    type: String,
    default: "",
  },

  parentName: {
    type: String,
    default: "",
  },
  ispayment:{
    type:Boolean,
    default:false
  },
  isupdateprofile:{
    type : Boolean ,default : false  
  },
  token:{
    type: String,
    default: ''
  }

});

const User = mongoose.model("User", userSchema);
module.exports = User;
