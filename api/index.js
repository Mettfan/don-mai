//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const http = require('./src/app.js');
const { conn } = require('./src/db.js');
// const preloader = require('./src/preloader');
// const serverIo = require('./src/Socket/ServerIo');
// const socket = require('./src/Socket/ServerIo');
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  http.listen(process.env.PORT, () => {
    // preloader();
    
    console.log(`app is running on port ${process.env.PORT}`); // eslint-disable-line no-console
  });
});

// socket(http)