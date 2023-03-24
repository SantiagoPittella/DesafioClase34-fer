import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})
export default {
    app:{
        session: process.env.sessionSecret
    },
    mongo:{
        URL: process.env.mongoURL
    },
    github:{
        secret: process.env.githubSecret
    }
}