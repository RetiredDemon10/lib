const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")



function initialize(passport, getUserByEmail, getUserById){
    //funtion to authenticate users
    const authenticateUsers = async (email, password, done) => {
        //get users by email
        const user = getUserByEmail(email)
        if (user == null){
            return done(null, false, {message: "User Not Found"})
        }
        try{
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else{
                return done (null, false, {message: "Password Incorrect"})
            }
        } catch (e) {
            console.log(e)
            return done(e)
        }
    }

    passport.use(new localStrategy({usernameField: 'email'}, authenticateUsers))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done (null, getUserById(id))
    })
}

module.exports = initialize