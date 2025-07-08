const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
 
    fullName:{
        type:String,
        required:[true,'fullname is required'],
        minlength:[3,'fullname must be at least 3 characters'],
        maxlength:[50,'fullname must be at most 50 characters'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'email is required'],
        trim:true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minlength:[6,'password must be at least 6 characters']
    }
    
},
{timestamps:true}
);
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
const User=mongoose.model('User',userSchema);
module.exports=User;