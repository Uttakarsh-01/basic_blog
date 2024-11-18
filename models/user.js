const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default/default.jpeg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt = salt;
  user.password = hashedPassword;

  next();
});

const user = model("user", userSchema);

module.exports = user;

userSchema.static("matchPassword",function(email,password){
   const user = this.findOne({email});
   if(!user) throw new ERROR('user not found!');


   const salt = user.salt;
   const hashedPassword = user.password;

   const userProvidedHash = createHmac("sha256", salt)
   .update(password)
   .digest("hex");
  
   return {...user,password:undefined,salt:undefined}; 

      if(hashedPassword !== userProvidedHash) throw new ERROR('incorrect password!');
});


// const { createHmac,randomBytes} = require('crypto');
// const {Schema,model} = require('mongoose');

// const userSchema = new Schema({
//      fullName:{
//         type:String,
//         required:true,
//      },
//      email:{
//         type:String,
//         required:true,
//         unique:true,
//      },
//      salt:{
//         type:String,
//      },
//      password:{
//         type:String,
//         required:true,
//         unique:true,
//      },
//      profileImageURL:{
//         type:String,
//         default: "/images/default/default.jpeg",
//      },
//      role:{
//         type:String,
//         enum: ["USER","ADMIN"],
//         default: "USER",
//      },
// },{timestamps:true});

// userSchema.pre("save",function(next){
//     const user = this;

//     if(!user.isModified("password")) return;

//     const salt = randomBytes(16).toString();
//     const hashedPassword = createHmac("sha256",salt)
//     .update(user.password)
//     .digest("hex");

//     this.salt = salt;
//     this.password = hashedPassword;

//     next()

// });



// const user = model("user",userSchema);

// module.exports   = user;