const { User, Profile, TravelAgent, Itinerary, Schedule } = require('../models')

class Controller {
    static findSchedule(req, res){
        Schedule.findAll({
            include: TravelAgent, Itinerary
        })

        .then((schedules) => {
            // res.send(schedules)
            res.render('home', {schedules})

        })
        .catch((err)=>{
            res.send(err)
        })
    }
}
module.exports = Controller