const { User, Profile, TravelAgent, Itinerary, Schedule } = require('../models')

class Controller {
    static findSchedule(req, res){
        Schedule.findAll({
            include: TravelAgent
        })

        .then((schedules) => {
            res.send(schedules)

        })
        .catch((err)=>{
            res.send(err)
        })
    }
}
module.exports = Controller