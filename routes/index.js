const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controller')

function restrictToAgent(req, res, next) {
    if (req.session.user && req.session.user.role === 'agent') {
        next();
    } else {
        res.send('This page is accesible to admins only!');
    }
}

router.get('/', Controller.home)
router.get('/schedules', Controller.findSchedule)
router.get('/login',Controller.login )
router.get('/schedules/buy/:id', Controller.buyTicket)
router.post('/schedules/buy/:id', Controller.generateBook)
router.post('/login',Controller.getLogin )
router.post('/logout', Controller.logout);
router.get('/signup', Controller.getNewUser)
router.post('/signup', Controller.createUser)
router.get('/itinerary', Controller.buyTicket)
router.get('/schedules/add', restrictToAgent, Controller.addTravel)
router.post('/schedules/add', Controller.getNewTravel)

router.get('/schedules/delete/:id', Controller.delete)




module.exports = router;
