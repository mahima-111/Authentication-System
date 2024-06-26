import express from 'express';
import { registerUser, authUser, logoutUser, getUser, updateUser, updatePassword } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router=express.Router();

router.post('/',registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser);
router.get('/profile',protect,getUser);
router.put('/profile',protect,updateUser);
router.put('/password',protect,updatePassword);

export default router;