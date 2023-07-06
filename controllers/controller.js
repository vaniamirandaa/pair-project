const { User, Profile, TravelAgent, Itinerary, Schedule } = require('../models')

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
                email: users[0].email
            };
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

    
    static findSchedule(req, res){ // masih bingung nampilin firstName profile pas login
        Schedule.findAll({
            include: [TravelAgent, Profile]
        })

        .then((schedules, profiles) => {
            // res.send(schedules)
            res.render('home', { schedules, profiles });

        })
        .catch((err)=>{
            res.send(err)
        })
    }



}
module.exports = Controller