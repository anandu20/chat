import { Router } from "express";
import * as u from './requestHandler.js'
import Auth from './middleware/Auth.js'
const router=Router();

router.route("/signin").post(u.signIn);
router.route("/signup").post(u.signUp);
router.route("/profile").get(Auth,u.profile);
router.route("/verify").post(u.verifyMail);
router.route("/reset").post(u.resetPassword);
router.route("/getallcontacts").get(Auth,u.getAllContacts);
router.route("/getmembers").get(Auth,u.getMembers);
router.route("/sendmsg").post(Auth,u.sendMessage);
router.route("/messages/:id").get(Auth,u.getMessages);
router.route("/getuser").get(Auth,u.getUser);
router.route("/getuserp/:id").get(Auth,u.getUserP);
router.route("/updateuser").put(Auth,u.updateUser);
router.route("/deletemsg/:mid").delete(Auth,u.deleteMessage);



export default router;