import { Router } from "express";
import * as u from './requestHandler.js'
import Auth from './middleware/Auth.js'
const router=Router();

router.route("/signin").post(u.signIn);
router.route("/signup").post(u.signUp);

export default router;