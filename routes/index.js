const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller')

router.get('/schedules', Controller.findSchedule)
router.get('/login',Controller.login )
router.post('/login',Controller.getLogin )
router.post('/logout', Controller.logout);
router.get('/signup', Controller.getNewUser)
router.post('/signup', Controller.createUser)
router.get('/itinerary', Controller.buyTicket)
router.get('/schedules/add', Controller.addTravel)
router.post('/schedules/add', Controller.getNewTravel)

router.get('/delete/:id', Controller.delete)




module.exports = router;
