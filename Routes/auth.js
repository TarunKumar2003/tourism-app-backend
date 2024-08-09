import express from 'express';
const router=express.Router();
import {register,login} from "../Controller/authController.js";
//create user
router.post('/register',register);
//login
router.post('/login',login);
export default router;