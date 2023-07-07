const { User, Profile, TravelAgent, Itinerary, Schedule } = require('../models');
const { Op } = require('sequelize');
const {formatPrice, formatDate} = require('../helpers/formatter')



class Controller {

    static home(req, res) {
        res.render('LandingPage');
      }

    static login(req, res) {
        res.render('login', { message: req.session.message });
      }

    static getLogin(req, res) {
        
    const { email, password } = req.body;
    if (email && password) {
        User.findAll({ where: { email } })
        .then((users) => {
            if (users.length > 0 && users[0].password === password) {
            req.session.user = {
                id: users[0].id,
                email: users[0].email,
                role: users[0].role
            };
            req.session.isLoggedIn = true;
            res.redirect('/schedules');
            } else {
            req.session.message = 'Username or password is incorrect';
            res.redirect('/login');
            }
        })
        .catch((err) => {
            req.session.message = 'An error occurred';
            res.redirect('/login');
        });
    } else {
        req.session.message = 'Username or password is incorrect';
        res.redirect('/login');
    }
}

    static logout(req, res) {
        req.session.isLoggedIn = false;
        req.session.destroy(() => {
            res.redirect('/login');
        });
}
    static createUser(req, res){
        const { email, password, firstName, lastName, dateOfBirth, phoneNumber, address } = req.body
        User.create({email, password, role: 'customer'})
        .then((user) => {
            Profile.create({email, password, firstName, lastName, dateOfBirth, phoneNumber, address, UserId: user.id})
        })
        .then(()=>{
            res.redirect('/login')
        })
        .catch((err)=>{
            // if(err.name === 'SequelizeValidationError'){
            //  return res.send(err.errors[0].message)
            // }
            res.send(err)
         })

    }

    static getNewUser(req, res){
        res.render('SignUp')
    }

    
    static findSchedule(req, res) {

        let where = {
          };        
          
          if (req.query.origin) {
            where.origin = { [Op.iLike]: `%${req.query.origin}%` };
        }
        if (req.query.destination) {
            where.destination = { [Op.iLike]: `%${req.query.destination}%` };
        }


        Schedule.findAll({
            where,
            include: TravelAgent,
            order: [['price', 'DESC']]
        })
            .then((schedules) => {
                let userRole;
                if (req.session.isLoggedIn) {
                    userRole = req.session.user.role;
                }
                res.render('Schedule', { schedules, isLoggedIn: req.session.isLoggedIn, userRole, formatDate, formatPrice });
            })
            .catch((err) => {
                res.send(err);
            });
    }
    
    
      static buyTicket(req, res) {
        if (!req.session.user) {
            res.redirect('/login');
            return;
        }
        Schedule.findByPk(req.params.id)
        .then((schedule) => {
            if(!schedule) {
                throw ("Travel not found!")
            }
            return schedule.decrement('seatNumber')
        })
        // .then(() => {
        //     res.redirect('/schedules')
        // })
    
          .catch((err)=>{
            res.redirect(`/schedules?error=${err}`)
        })
    }

    static generateBook(req, res) {
        res.render('viewBooks')
    }

static addTravel(req, res){
    TravelAgent.findAll({
        include: Schedule
    })
    .then((travelagents)=>{
        res.render('AddTravel', {travelagents})
    })
    .catch((err)=>{
        console.log(err)
        res.send(err)
    })
}

static getNewTravel(req, res){
    Schedule.create(req.body)
    .then(()=>{
        res.redirect('/schedules')
    })
    .catch((err)=>{
        if(err.name === 'SequelizeValidationError'){
            return res.send(err.errors[0].message)
        }
        res.send(err)
    })
}
  
  static itinerary(req, res) {
    // const userId = req.session.userId;
    Itinerary.findAll({
    //   where: { UserId: userId },
      include: [Schedule, User]
    })
      .then((itineraries) => {
        if (itineraries.length > 0) {
          res.render('itinerary', { itineraries });
        } else {
          res.status(404).send('No itineraries found for the specified user');
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }
  
  static addItinerary(req, res) {
    Schedule.findAll({})
      .then((schedules) => {
        res.render('AddItinerary', { schedules, getStatus: Itinerary.getStatus() });
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }
  
  static getItinerary(req, res) {
    Itinerary.create({
      departure: req.body.departure,
      status: req.body.status,
      ScheduleId: req.body.scheduleId,
      UserId: req.session.userId
    })
      .then(() => {
        res.redirect('/itineraries');
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') {
          return res.send(err.errors[0].message);
        }
        res.send(err);
      });
  }
  
    static delete(req, res) {
        const id = req.params.id;
        Schedule.findByPk(id)
            .then(schedule => {
                if (!schedule) {
                    return;
                }
                const currentDate = new Date();
                if (currentDate > schedule.departure) {
                    return Schedule.destroy({
                        where: {
                            id: id
                        }
                    });
                } else {
                }
            })
            .then(() => {
                res.redirect('/schedules');
            })
            .catch(err => {
                res.send(err);
                console.log(err);
            });
        
    }
    
      


}
module.exports = Controller