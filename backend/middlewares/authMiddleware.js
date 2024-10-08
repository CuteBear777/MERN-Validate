const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ success: false, message: 'Forbidden because of not having token.' });

    try {
        const secretKey = process.env.jwt || "your-secret-key";
        const decoded = jwt.verify(token, secretKey);
        req.user = await User.findById(decoded.id);
        if (!req.user) return res.status(404).json({ message: 'User not found' });
        next();

        // jwt.verify(token, secretKey, async (err, decoded)=>{
        //     if(err){
        //         console.log(err);
        //         return res.status(401).json({success:false, message:'Invalid or expired token'});
        //     } 
        //     else{
        //         const user = await User.findById(decoded.id);
        //         console.log(user);
        //         if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        //         else req.user = user;
        //         return res.json({success:true, user});
        //     }
        // });




    } catch (error) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

module.exports = { authenticate };