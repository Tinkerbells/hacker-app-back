import express from 'express'
import controller from '../controllers/UserController'
import { Schemas, ValidateJoi } from '../middleware/ValidateSchema'

const router = express.Router()

router.post('/register', ValidateJoi(Schemas.user.create), controller.createUser)
router.post('/verify-email', controller.verifyUser)
router.post('/login', ValidateJoi(Schemas.user.login), controller.loginUser)
router.get('/get/:userId', controller.getUser)
router.get('/get', controller.getUserList)
router.put('/update/:userId', ValidateJoi(Schemas.user.update), controller.updateUser)
router.delete('/delete/:userId', controller.deleteUser)

export = router
