const User = require("../models/authSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "fnrlslcdjkbrevfdnvfccdscvdfv";
module.exports.getsignup = (req, res) => {
  res.render("signup");
};

module.exports.signup = async (req, res) => {
  const { username, email, pass, confirmepass } = req.body;
  if (!username || !email || !pass || !confirmepass) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const exist = await User.findOne({ email: email });
  if (exist) {
    return res.status(404).json({ message: "email deja cree" });
  }
  try {
    salt = 10;
    // Assuming you've defined a User model, you should create a new user instance and save it
    const hashedpass = await bcrypt.hash(pass, salt);
    const newUser = new User({
      username,
      email,
      pass: hashedpass,
      confirmepass: hashedpass,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getsignin = (req, res) => {
  res.render("signin");
};

module.exports.signin = async (req, res) => {
  const { email, pass } = req.body;
  if (!email || !pass) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const data = await User.findOne({ email: email });
    const valid = await bcrypt.compare(pass, data.pass);
    if (valid) {
      // u can test in console [atob('encode') for decoding] [btoa('decode') for encoding]
      const token = jwt.sign({ id: data._id, email: data.email }, SECRET_KEY);

      // httpOnly : true that protect from xss and it means (accesible from http-server just)
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({ success: 'user successfully signed in', token: token });

    } else {
      res.status(404).json({ success: " user not successfully signed in" });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// Example of using the middleware for a protected route
module.exports.protected = (req, res) => {
  res.json({ message: 'You have access to this protected resource' });
}
