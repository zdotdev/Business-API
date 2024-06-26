import express from 'express'
import {
  getAllUsers,
  getById,
  signUp,
  login,
  updateStatus
} from '../Controllers/User.js'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getById)
router.post('/signup', signUp)
router.post('/login', login)
router.put('/:id', updateStatus)

export default router
