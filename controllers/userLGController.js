const UserLG = require('../models/userLGmodel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
  }

// login user
const loginUserLG = async (req, res) => {
    const {email, password} = req.body

    try {
        const userLG = await UserLG.login(email, password)
        userLG.isActive = true // Mark user as active
        await userLG.save() // Save the updated user status
    
        // create a token
        const token = createToken(userLG._id)
    
        res.status(200).json({email, token, role: userLG.role})
      } catch (error) {
        res.status(400).json({error: error.message})
      }
}

// signup user
const signupUserLG = async (req, res) => {
  const {name, email, password, role} = req.body

  try {
    const userLG = await UserLG.signup(name, email, password, role)
    userLG.isActive = true // Mark user as active
    await userLG.save() // Save the updated user status

    // create a token
    const token = createToken(userLG._id)

    res.status(200).json({name, email, token, role})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// logout user
const logoutUserLG = async (req, res) => {
  try {
   // Update active status to false
   req.userLG.isActive = false;
   await req.userLG.save();

   res.status(200).json({ message: 'Logged out successfully' });
} catch (error) {
   res.status(500).json({ error: error.message });
}
}

module.exports = { signupUserLG, loginUserLG, logoutUserLG }