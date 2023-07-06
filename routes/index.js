const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller')

router.get('/', Controller.findSchedule)
router.get('/login',Controller.login )
router.post('/login',Controller.getLogin )
router.post('/logout', Controller.logout);



module.exports = router;
