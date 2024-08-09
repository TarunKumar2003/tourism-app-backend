import express from 'express';
const router = express.Router();
import {updateUser,deleteUser,getUser,getAllUser} from "../Controller/UserController.js";
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

// update user
router.put('/:id', verifyUser,updateUser);
// delete user
router.delete('/:id', verifyUser,deleteUser);
// get single user
router.get('/:id',verifyUser, getUser);
// get all user
router.get('/',verifyAdmin, getAllUser);




export default router;