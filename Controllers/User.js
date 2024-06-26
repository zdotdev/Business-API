import User from '../Schema/User.js'
import bcrypt from 'bcryptjs'

export const getAllUsers = async (req, res) => {
  let users
  try {
    users = await User.find()
  } catch (err) {
    console.log(err)
  }
  if (!users) {
    return res.status(404).json({ message: 'No users found' })
  }
  return res.status(200).json(users)
}

export const getById = async (req, res) => {
  let user
  try {
    user = await User.findById(req.params.id)
  } catch (err) {
    console.log(err)
  }
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  return res.status(200).json(user)
}

export const signUp = async (req, res) => {
  const { name, email, username, password, role, status } = req.body
  let existingUser

  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    console.log(err)
  }
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' })
  }

  const hashedPassword = bcrypt.hashSync(password)

  const user = new User({
    name,
    email,
    username,
    password: hashedPassword,
    role,
    status
  })
  try {
    await user.save()
  } catch (err) {
    console.log(err)
  }
  return res.status(201).json({ message: 'User created' })
}
export const login = async (req, res) => {
  const { email, password } = req.body
  let existingUser
  try {
    existingUser = await User.findOne({ email })
  } catch (err) {
    console.log(err)
  }
  if (!existingUser) {
    return res.status(404).json({ message: 'User not found' })
  }
  const passwordMatch = bcrypt.compareSync(password, existingUser.password)
  if (!passwordMatch) {
    return res.status(400).json({ message: 'Incorrect password' })
  }
  return res.status(200).json({ message: 'Login successful' })
}

export const updateStatus = async (req, res) => {
  const { status } = req.body
  let user
  try {
    user = await User.findById(req.params.id)
  } catch (err) {
    console.log(err)
  }
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  user.status = status
  try {
    await user.save()
  } catch (err) {
    console.log(err)
  }
  return res.status(200).json({ message: 'Status updated' })
}
