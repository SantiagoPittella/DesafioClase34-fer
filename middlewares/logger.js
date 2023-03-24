import winston from "winston"
const misLevels = {
    levels:{
        error:0,
        warning:1,
        info: 2
    }
}
export const logger = winston.createLogger({
    levels: misLevels.levels,
    transports: [
        new winston.transports.Console({

        }),
        new winston.transports.File({
            filename: "./warn.log",
            level: "warning"
        }),
        new winston.transports.File({
            filename: "./error.log",
            level: "error"
        })
    ]
})
// export const addLogger = (req,res,next) =>{
//     req.logger = logger;
//     req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
//     next();
// }