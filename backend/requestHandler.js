
import loginSchema from './models/user.model.js'
import chatSchema from './models/chat.model.js';
import memberSchema from './models/member.model.js';

import bcrypt from "bcrypt";
import pkg from "jsonwebtoken";
import nodemailer from "nodemailer";
const { sign } = pkg;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ananduramachandran411@gmail.com",
      pass: "yttm rmjj dhok bchu",
    },
  });

  export async function signUp(req, res) {
    try {
      const { email, username, password, cpassword,profile} = req.body;
      if (!(email && username && password && cpassword && profile))
        return res.status(404).send({ msg: "Fields are empty" });
      if (password != cpassword)
        return res.status(404).send({ msg: "Password mismatching" });
      bcrypt.hash(password, 10).then((hashedPassword) => {
        console.log(hashedPassword);
        loginSchema
          .create({ email, username, password: hashedPassword,profile})
          .then(async () => {
            console.log("Success");
            return res.status(201).send({ msg: "Suceess" });
          })
          .catch((error) => {
            console.log(error);
            return res.status(404).send({ msg: "Not registered" });
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  export async function signIn(req, res) {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      
      const user = await loginSchema.findOne({ email });
   
      if (!(email && password))
        return res.status(404).send({ msg: "Fields are empty" });
      if (user === null) return res.status(404).send({ msg: "User not found" });
      const success = await bcrypt.compare(password, user.password);
      console.log(success);
      if (success != true)
        return res.status(404).send({ msg: "Email or Password mismatch" });
      const token = await sign({ userId: user._id }, process.env.JWT_KEY,{expiresIn: "24h"});
      console.log(token);
      return res.status(201).send({ msg: "successfully logged in",token});
    } catch (error) {
      return res.status(404).send({ msg: "Error" });
    }
  }

  export async function profile(req,res) {
    try {
         const id = req.user.userId;
        const data = await loginSchema.findOne({_id:id})
        return res.status(201).send({data})
    } catch (error) {
        return res.status(404).send({msg:error}); 

    }
    
}

export async function getAllContacts(req,res) {
  try {
        const id = req.user.userId;
        const data = await loginSchema.find({ _id: { $ne: id } });
        return res.status(201).send(data)
  } catch (error) {
    return res.status(404).send({msg:error}); 
  }
  
}
export async function getMembers(req, res) {
  try {
    const _id = req.user.userId;
    const receivers=await memberSchema.find({$or:[{senderId:_id},{recieverId:_id}]});
        const chatMemberPromises = receivers.map(async (receiver) => {
            if(receiver.senderId==_id)
                return await loginSchema.findOne({ _id: receiver.recieverId },{username:1,profile:1});
            if(receiver.recieverId==_id)
                return await loginSchema.findOne({ _id: receiver.senderId },{username:1,profile:1});
        });
        const chatMembers = await Promise.all(chatMemberPromises);  
        console.log(chatMembers);
        
    return res.status(201).send({chatMembers}); 
  } catch (error) {
    return res.status(404).send({ msg: error });
  }
}
