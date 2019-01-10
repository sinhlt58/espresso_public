const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const getLabel = function (callingModule) {
    let parts = callingModule.filename.split('/');
    return parts[parts.length - 2] + '/' + parts.pop();
};

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}${info.meta? JSON.stringify(info.meta) : ''}`;
});

module.exports = function (callingModule) {
    return createLogger({
        level: 'info',
        format: combine(
            label({ label: getLabel(callingModule) }),
            timestamp(),
            format.splat(),
            myFormat
        ),
        transports: [new transports.Console()]
    });
};