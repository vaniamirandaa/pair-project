const { User, Profile, TravelAgent, Itinerary, Schedule } = require('../models');
const itinerary = require('../models/itinerary');

class Controller {
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
                email: users[0].email,
                role: users[0].role
            };
            req.session.isLoggedIn = true;
            res.redirect('/');
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
            res.send(err)
        })
    }

    static getNewUser(req, res){
        res.render('SignUp')
    }

    
    static findSchedule(req, res) {
        Schedule.findAll({
          include: TravelAgent
        })
          .then((schedules) => {
            let userRole;
            if (req.session.isLoggedIn) {
              userRole = req.session.user.role;
            }
            res.render('home', { schedules, isLoggedIn: req.session.isLoggedIn, userRole });
          })
          .catch((err) => {
            res.send(err);
          });
      }
    
    
      static buyTicket(req, res) {
        if (!req.session.isLoggedIn) {
            res.redirect('/login');
            return;
        }
    
        // const id = req.params.id;
        // const userId = req.session.userId;
    
        // Schedule.findByPk(id)
        //     .then((schedule) => {
        //         if (!schedule) {
        //             res.status(404).send('Schedule not found');
        //             return;
        //         }
    
        //         Itinerary.create({
        //             origin: schedule.origin,
        //             destination: schedule.destination,
        //             departure: schedule.departure,
        //             userId: userId
        //         })
        //             .then(() => {
        //                 res.redirect('/itinerary');
        //             });
        //     })
        //     .catch((err) => {
        //         res.send(err);
        //         console.log(err);

        //     });
        Itinerary.findAll({
            include: Schedule
        })
        .then((itineraries) =>{
            res.render('itinerary', { itineraries})
        })
        .catch(() =>{
            res.send(err)
        })
    }

    static delete(req, res) {

    
        const id = req.params.id;
    
        Schedule.destroy({
            where: {
                id: id
            }
        })
            .then(() => {
                res.redirect('/');
            })
            .catch((err) => {
                res.send(err);
                console.log(err);
            });
    }
    



}
module.exports = Controller