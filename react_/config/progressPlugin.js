const webpack = require('webpack');
const chalk = require('chalk');
const envJson = require('./env.json');
const log = new webpack.ProgressPlugin((percentage) => {
  if (percentage * 100 < 100) return;

  const env = process.env;
  const logstr = chalk.bgWhite.cyan('\u73af\u5883\u53d8\u91cf\x3a\n\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193\u2193');

  console.log(logstr);
  const envkes = Object.keys(env);

  for (let i = 0; i < envkes.length; i++) {
    const key = envkes[i];
    const haveKey = key.includes('\x52\x45\x41\x43\x54\x5f\x41\x50\x50');

    if (!haveKey) continue;

    const haveValue = envJson[key];

    const logstr = chalk.bgWhite.cyan(haveValue ?? key, ' = ', env[key]);

    console.log(logstr);
  }

  const logstr2 = chalk.bgWhite.cyan('\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191\u2191');

  console.log(logstr2);
});

module.exports = log;
