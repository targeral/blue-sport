const path = require('path');
const devConfig = require('./webpack/dev.config');
const checkIsLocal = env => env === 'local';
module.exports = env => {
    console.log('NODE_ENV: ', env.NODE_ENV); // 'local'
    console.log('dev', env.dev);
    console.log('Production: ', env.prod); // true
    const isDev = !!env.dev;
    const isProduction = !!env.prod
    const isLocat = checkIsLocal(env.NODE_ENV);

    if (isDev) {
        return devConfig;
    }
}