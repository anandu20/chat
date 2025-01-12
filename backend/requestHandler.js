
import loginSchema from './models/user.model.js'
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
      console.log(req.body);
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
      const user = await loginSchema.findOne({ email });
      console.log(user);
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