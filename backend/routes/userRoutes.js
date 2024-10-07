const express = require('express');
const { registerUser, loginUser, modifyUser, delUser, getAllUsers, getMe } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/modify/:id', authenticate, modifyUser);
router.post('/delete/:id', authenticate, delUser);
router.get('/me', authenticate, getMe)
router.get('/allusers', authenticate, getAllUsers); // Admin only

module.exports = router;