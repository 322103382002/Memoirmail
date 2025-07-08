
const {sendResetEmail} = require('../utils/emailService');
const User=require('../models/userModel');
const jwt=require('jsonwebtoken');
exports.register=async(req,res)=>{
    const {fullName,email,password}=req.body;
    try{
      if(!fullName||!email||!password){
        return res.status(400).json({
            success:false,
            message:'Please fill all the fields'
        });
      }
      const userExists=await User.findOne({email});
      if(userExists)
      {
        res.status(400).json({
            success:false,
            message:'User already exists'
        });
      }
      const user=await User.create({
        fullName,
        email,
        password
      });
      res.status(201).json({
        success:true,
        message:'User created successfully',

      });
       
    }catch(err){
      console.log(err);
        res.status(400).json({
            success:false,
            error:err.message
        });
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all the fields' });
      }
      const user = await User.findOne({ email });
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        }
    );
    res.status(201).json({ token, user: { id: user._id, fullName: user.fullName, email: user.email } });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.forgotPassword = async(req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const resetToken = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h",
        }
    );
    await sendResetEmail(email, resetToken);
    res.json({ message: "Password reset email sent (simulation)", resetToken });
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        console.log("Resetting password with token:", token);
        console.log("New password:", newPassword);
        if (!token) {
            res.status(400).json({ success: false, message: "Token is required" });
        }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            res.status(400).json({success:false, message:"Invalid or expired token"});
        }
        console.log("Decoded token:", decoded);

        const user = await User.findOne({ _id: decoded.id });
        console.log(user)
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        user.password = newPassword;
        await user.save();
        console.log("Password updated successfully for user:", user.username);
        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.log("Error resetting password:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};