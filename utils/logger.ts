import winston from "winston";

const timestampFormat = {
    format: 'YYYY-MMM-DD hh:mm:ss A',
};

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const today = new Date();
const dateInFileName = [today.getFullYear(), months[today.getMonth()], today.getDate()].join("-");


const loggerOptions = {
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.cli(),
                winston.format.colorize(),
            ),
        }),
        new winston.transports.File({
            filename: `logs/general-logs_${dateInFileName}.log`,
            level: process.env.LOG_LEVEL || 'info',
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.timestamp(timestampFormat),
                winston.format.printf((info) => `[${info.timestamp}] ${info.level.toUpperCase()} : ${info.message}`),
                winston.format.uncolorize(),
                winston.format.align(),
            ),
        }),
        new winston.transports.File({
            filename: `logs/errors-and-warnings_${dateInFileName}.log`,
            level: 'warn',
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.timestamp(timestampFormat),
                winston.format.printf((info) => `[${info.timestamp}] ${info.level.toUpperCase()} : ${info.message}`),
                winston.format.uncolorize(),
            ),
        }),
        new winston.transports.File({
            filename: `logs/debug-logs_${dateInFileName}.log`,
            level: 'debug',
            format: winston.format.combine(
                winston.format.simple(),
                winston.format.timestamp(timestampFormat),
                winston.format.printf((info) => `[${info.timestamp}] ${info.level.toUpperCase()} : ${info.message}`),
                winston.format.uncolorize(),
            ),
        }),
    ]
};

export const LOGGER = winston.createLogger(loggerOptions);
