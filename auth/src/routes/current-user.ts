import express from 'express'
import { currentuser } from '../middlewares/current-user'

const router = express.Router()

router.get('/api/users/currentuser', currentuser, (req, res) => {
  res.send({ currentUser: req.currentuser || null })
})

export { router as currentUserRouter }
