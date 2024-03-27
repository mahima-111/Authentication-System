import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
},{
    timestamps:true
});

userSchema.pre('save',async function(next){
    //if password is not modified then move to next
    if(!this.isModified('password')){
        next();
    }

    //if modified then hash the password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(this.password,salt);
    this.password=hashedPassword;
    next();
})

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

const User=mongoose.model('User',userSchema);
export default User;