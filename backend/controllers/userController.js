const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userStr = await User.findOne({username});
        const emailStr = await User.findOne({email});
        if(userStr || emailStr) return res.json({exist: true});
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ success: false, message: 'User not exists!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(404).json({ success: false, message: 'Password Incorrect!' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET,{expiresIn: '1h'});
        
        // return res.json({ success: true, token});
        return res.json({token,user});
    } catch (error) {
        return res.status(500).json({ message: 'Server logging causes ErrorS!' });
    }
};

const verifyToken = async(req,res) => {
        const token = req.body.token;
        if(!token) return res.status(403).json({success:false,  message:'Token required'});
        const secretKey = process.env.jwt || "your-secret-key";
        jwt.verify(token, secretKey, async (err, decoded)=>{
            if(err){
                console.log(err);
                return res.status(401).json({success:false, message:'Invalid or expired token'});
            } 
            else{
                const user = await User.findById(decoded.id);
                return res.json({success:true, user});
            }
        });
}

// Modify User Information
const modifyUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (data.email) user.email = data.email;
        if (data.password) user.password = await bcrypt.hash(data.password, 10);

        await user.save();
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

const delUser = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(400).json({ message: 'User not found' });
        return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error Deleting user' });
    }
};


// Admin CRUD Operations
const getAllUsers = async (req, res) => {
    try {
        const user = req.user;

        if (user.role !== "admin") {
            return res.status(403).json({message: 'Not allowed'});
        }
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

const getMe = async (req, res) => {
    try {
        const user = req.user;
        if (user) return res.status(200).json(user);
        else return res.status(401).json({message: "Unauthorized user"});
    } catch (err) {
        return res.status(500).json({message: 'Server Error'});
    }
}

// Exporting controllers
module.exports = {
    registerUser,
    loginUser,
    verifyToken,
    modifyUser,
    delUser,
    getAllUsers,
    getMe
};