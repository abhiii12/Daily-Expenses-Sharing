const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
   const { name, email, mobile, password } = req.body;

   // Validate inputs
   if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: 'All fields are required' });
   }

   // Hash the password
   const hashedPassword = await bcrypt.hash(password, 10);

   try {
      const newUser = await User.create({ name, email, mobile, password: hashedPassword });
      res.status(201).json(newUser);
   } catch (error) {
      res.status(500).json({ message: 'User creation failed', error });
   }
};

exports.getUser = async (req, res) => {
   const userId = req.params.id;
   
   try {
      const user = await User.findById(userId);
      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
   } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve user', error });
   }
};
