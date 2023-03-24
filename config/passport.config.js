import passport from "passport";
import local from 'passport-local';
import { userService } from "../daos/index.js";
import { validatePassword } from "../utils.js";
import GithubStrategy from 'passport-github2';
import config from "./config.js";
const LocalStrategy = local.Strategy;
const initializeStrategy = () => {
    //passport-local
    passport.use('login', new LocalStrategy({usernameField: "email"}, async(email, password, done) => {
    if (!email || !password) return done(null, false, {message: "Hay campos incompletos!"})
    const user = await userService.getBy({email})
    if (!user) return done(null, false, {message: "El usuario no es valido"})
    const isValidPassword = await validatePassword(password, user.password)
    if(!isValidPassword) return done(null, false, {message: "Contraseña invalida"})
    return done(null, user)
    }))
    //passport-github
    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.1ea700175e8e84ac',
        clientSecret: config.github.secret,
        callBackURL: 'http://localhost:8080/login/githubcallback'
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            const {email, name} = profile._json;
            const user = await userService.getBy({email: email})
            if(!user){
                const newUser = {
                    nombre: name,
                    email: email,
                    password: '123'
                }
                const result = await userService.save(newUser);
                return done(null, result);
            }
            done(null,user)
        } catch (error) {
            done(error)
        }
    }))
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        const result = await userService.getBy({ _id: id })
        done(null, result);
    })
}
export default initializeStrategy;