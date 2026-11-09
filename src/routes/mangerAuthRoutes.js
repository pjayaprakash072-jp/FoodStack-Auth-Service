const router = require('express').Router();
const {
    createManagerAuth,
    loginManager,
    getManagerAuth
} = require('../controllers/managerAuthController')

router.post('/create',createManagerAuth);
router.post('/login',loginManager);
router.get('/get',getManagerAuth);
module.exports = router;