const User=require('../models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {generateAccessToken,generateRefreshToken}=require('../utils/generateTokens')

exports.signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const user=await User.create({name,email,password});
        const accessToken=generateAccessToken(user);
        const refreshToken=generateRefreshToken(user);
        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge:15*60*60*1000
        })
        res.status(201).json({accessToken,user:{id:user._id,name:user.name,email:user.email}});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
    }        
}
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ msg: 'User not found' });
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ msg: 'Invalid password' });
  
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      res.status(200).json({ accessToken, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };

exports.refreshTokenApi = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(500).json({ msg: "No refresh token found" });

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(500).json({ msg: err.message });
        const accessToken = generateAccessToken({ _id: user.id });
        res.status(200).json({ accessToken });
    });
};

exports.logout = (req, res) => {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });
    res.status(200).json({ msg: 'Logout successful' });
  };
  
exports.getCurrentUserDetails=async(req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.status(200).json(user);
        } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
}
