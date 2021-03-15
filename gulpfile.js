const gulp = require('gulp');
const fs = require('fs');
const environments = require('./environments.json');
const env = (process.env.NODE_ENV || '').trim();
const tenant = (process.env.TENANT || 'DEFAULT').trim().toUpperCase();

const local = {
  enableProductionMode: false,
  showLogs: true,
  production: false,
  apiBaseUrl: 'https://dashboardapi-local.boltqa.com/',
  favIcon: 'assets/icons/{tenant}/favicon.ico',
  gooleApiKey: 'AIzaSyD90IeK2kAT9jtZ5CMVfPb2YmLZvGIVrp0',
  gtmId: '',
};

console.log(`Starting gulp for tenant: [${tenant}] and environment[${env}].`);
let favIcon;

console.log(`Executing gulp for tenant: [${tenant}] and environment[${env}].`);

gulp.task('default', function (done) {
  if (!fs.existsSync('src/environments')) {
    fs.mkdirSync('src/environments');
  }

  let templeEnv = fs.readFileSync('./env.txt').toString('utf8');

  let isProd = 'true';

  if (env === 'local') {
    isProd = 'false';
    for (const key in local) {
      templeEnv = templeEnv.replace('{{dynamicdashboard:' + key + '}}', local[key]);
    }
    console.log(templeEnv);
  }
  //for main ts since we cant inject service
  fs.writeFileSync(
    'src/environments/environment.ts',
    'export const environment = ' + templeEnv + ';'
  );
  fs.writeFileSync('src/environment.json', templeEnv);
  done();
});

console.log('End running gulp file.');
