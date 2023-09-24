const {Router} = require('express')
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const router = Router()


router.get('/signup',authController.getsignup)
router.post('/signup',authController.signup)
router.get('/signin',authController.getsignin)
router.post('/signin',authController.signin)
router.get('/protected', authMiddleware.authenticateToken ,authController.protected);




module.exports = router